// // app/api/rewrite/route.js
// export async function POST(request) {
//     try {
//         const { text, model, tone } = await request.json();

//         if (!text || !model || !tone) {
//             return Response.json({ error: 'Missing required fields' }, { status: 400 });
//         }

//         // Get OpenRouter API key from environment variable
//         const apiKey = process.env.OPENROUTER_API_KEY;

//         if (!apiKey) {
//             return Response.json(
//                 { error: 'OpenRouter API key not configured' },
//                 { status: 500 }
//             );
//         }

//         // Create the prompt for rewriting
//         const prompt = createRewritePrompt(text, tone);

//         // Call OpenRouter API
//         const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${apiKey}`,
//                 'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
//                 'X-Title': 'AI Tools Hub'
//             },
//             body: JSON.stringify({
//                 model: model,
//                 messages: [
//                     {
//                         role: 'system',
//                         content: `You are an expert writer that specializes in rewriting paragraphs while maintaining the original meaning. The tone should be ${tone}.`
//                     },
//                     {
//                         role: 'user',
//                         content: prompt
//                     }
//                 ],
//                 temperature: 0.7,
//                 max_tokens: 1024
//             })
//         });

//         if (!response.ok) {
//             const errorData = await response.json();
//             console.error('OpenRouter API error:', errorData);
//             return Response.json(
//                 { error: 'Failed to get response from AI service' },
//                 { status: response.status }
//             );
//         }

//         const data = await response.json();
//         const rewrittenText = data.choices[0].message.content;

//         return Response.json({ rewrittenText });

//     } catch (error) {
//         console.error('API route error:', error);
//         return Response.json(
//             { error: 'Internal server error' },
//             { status: 500 }
//         );
//     }
// }

// function createRewritePrompt(text, tone) {
//     const toneInstructions = {
//         professional: 'Use formal language, industry-specific terminology, and maintain a confident, authoritative voice.',
//         casual: 'Use conversational language, contractions, and a friendly, relaxed tone.',
//         academic: 'Use scholarly language, formal structure, precise terminology, and cite evidence when possible.',
//         creative: 'Use vivid descriptions, metaphors, and engaging narrative elements.',
//         persuasive: 'Use compelling arguments, emotional appeals, and persuasive language to convince the reader.'
//     };

//     return `
//       Rewrite the following paragraph in a ${tone} tone. 
//       ${toneInstructions[tone] || ''}
//       Maintain the original meaning and key points, but improve clarity, flow, and impact.

//       Original paragraph:
//       "${text}"

//       Please provide only the rewritten paragraph without any additional explanations.
//     `;
// }



// app/api/rewrite/route.js
export async function POST(request) {
    try {
        const {
            text,
            model,
            tone,
            style,
            creativity,
            preserveLength,
            targetLength,
            customInstructions
        } = await request.json();

        // Validate required fields
        if (!text || !model || !tone) {
            return Response.json({
                error: 'Missing required fields',
                message: 'Text, model, and tone are required'
            }, { status: 400 });
        }

        // Validate text length (prevent abuse)
        if (text.length > 10000) {
            return Response.json({
                error: 'Text too long',
                message: 'Maximum 10,000 characters allowed'
            }, { status: 400 });
        }

        // Get OpenRouter API key from environment variable
        const apiKey = process.env.OPENROUTER_API_KEY;
        if (!apiKey) {
            return Response.json(
                { error: 'OpenRouter API key not configured' },
                { status: 500 }
            );
        }

        // Create enhanced prompt with all parameters
        const prompt = createAdvancedRewritePrompt({
            text,
            tone,
            style,
            preserveLength,
            targetLength,
            customInstructions
        });

        // Determine temperature based on creativity level
        const temperature = creativity ? Math.max(0.1, Math.min(1.0, creativity)) : 0.7;

        // Calculate max tokens based on input length and target
        const maxTokens = calculateMaxTokens(text, targetLength, preserveLength);

        // Call OpenRouter API with enhanced parameters
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
                'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
                'X-Title': 'AI Tools Hub'
            },
            body: JSON.stringify({
                model: model,
                messages: [
                    {
                        role: 'system',
                        content: createSystemPrompt(tone, style)
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: temperature,
                max_tokens: maxTokens,
                top_p: 0.9,
                frequency_penalty: 0.1,
                presence_penalty: 0.1
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('OpenRouter API error:', errorData);

            // Handle specific error cases
            if (response.status === 429) {
                return Response.json(
                    { error: 'Rate limit exceeded', message: 'Please try again in a few minutes' },
                    { status: 429 }
                );
            }

            if (response.status === 401) {
                return Response.json(
                    { error: 'Authentication failed', message: 'Invalid API key' },
                    { status: 401 }
                );
            }

            return Response.json(
                {
                    error: 'AI service error',
                    message: errorData.error?.message || 'Failed to get response from AI service'
                },
                { status: response.status }
            );
        }

        const data = await response.json();

        // Validate response structure
        if (!data.choices || !data.choices[0] || !data.choices[0].message) {
            throw new Error('Invalid response structure from AI service');
        }

        const rewrittenText = data.choices[0].message.content.trim();

        // Post-process the rewritten text
        const processedText = postProcessText(rewrittenText, style);

        // Calculate metrics for response
        const originalWordCount = text.trim().split(/\s+/).length;
        const rewrittenWordCount = processedText.trim().split(/\s+/).length;

        return Response.json({
            rewrittenText: processedText,
            metrics: {
                originalWordCount,
                rewrittenWordCount,
                lengthChange: ((rewrittenWordCount - originalWordCount) / originalWordCount * 100).toFixed(1)
            },
            usage: data.usage
        });

    } catch (error) {
        console.error('API route error:', error);
        return Response.json(
            {
                error: 'Internal server error',
                message: 'An unexpected error occurred'
            },
            { status: 500 }
        );
    }
}

function createSystemPrompt(tone, style) {
    const roleDefinitions = {
        improve: 'You are an expert editor who enhances text clarity, flow, and impact while preserving the original meaning.',
        simplify: 'You are a communication expert who specializes in making complex text clear and accessible.',
        expand: 'You are a content developer who adds depth, detail, and context to text.',
        summarize: 'You are a summarization expert who distills text to its essential points.',
        rephrase: 'You are a linguistic expert who excels at expressing the same ideas in different ways.',
        formalize: 'You are a professional writing consultant who transforms casual text into formal, polished content.',
        modernize: 'You are a contemporary writing specialist who updates outdated language and style.'
    };

    const toneGuidelines = {
        professional: 'Use formal language, industry-appropriate terminology, and maintain an authoritative, confident voice.',
        casual: 'Use conversational language, contractions, and a friendly, approachable tone.',
        academic: 'Use scholarly language, formal structure, precise terminology, and evidence-based reasoning.',
        creative: 'Use vivid imagery, metaphors, varied sentence structures, and engaging narrative elements.',
        persuasive: 'Use compelling arguments, emotional appeals, strong evidence, and persuasive techniques.',
        technical: 'Use precise terminology, logical structure, and clear explanations of complex concepts.',
        humorous: 'Incorporate wit, light humor, and engaging language while maintaining appropriateness.',
        empathetic: 'Use understanding, compassionate language that acknowledges emotions and perspectives.'
    };

    return `${roleDefinitions[style] || roleDefinitions.improve}

Tone Guidelines: ${toneGuidelines[tone] || toneGuidelines.professional}

Key Principles:
- Maintain the original meaning and key message
- Ensure natural flow and readability
- Use appropriate vocabulary for the target audience
- Avoid unnecessary jargon unless specifically required
- Maintain consistency in voice and style throughout`;
}

function createAdvancedRewritePrompt({ text, tone, style, preserveLength, targetLength, customInstructions }) {
    let prompt = `Please rewrite the following text with these specifications:

Style: ${getStyleDescription(style)}
Tone: ${tone}`;

    // Add length instructions
    if (preserveLength) {
        prompt += `\nLength: Maintain approximately the same length as the original text.`;
    } else if (targetLength) {
        prompt += `\nTarget Length: Aim for approximately ${targetLength} words.`;
    }

    // Add custom instructions if provided
    if (customInstructions && customInstructions.trim()) {
        prompt += `\n\nAdditional Instructions: ${customInstructions.trim()}`;
    }

    prompt += `\n\nOriginal text:
"${text}"

Requirements:
- Preserve the core meaning and key points
- Ensure natural flow and readability
- Use appropriate vocabulary for the intended audience
- Maintain consistency in voice and style

Please provide only the rewritten text without any additional explanations or comments.`;

    return prompt;
}

function getStyleDescription(style) {
    const descriptions = {
        improve: 'Enhance clarity, flow, and impact while maintaining the original structure and meaning',
        simplify: 'Make the text easier to understand using simpler words and shorter sentences',
        expand: 'Add more detail, context, and examples to make the content more comprehensive',
        summarize: 'Condense the text to its essential points while maintaining key information',
        rephrase: 'Express the same ideas using different words and sentence structures',
        formalize: 'Transform the text into a more formal, professional style',
        modernize: 'Update the language and style to be more contemporary and current'
    };
    return descriptions[style] || descriptions.improve;
}

function calculateMaxTokens(text, targetLength, preserveLength) {
    const baseTokens = Math.ceil(text.length / 4); // Rough estimate: 4 chars per token

    if (preserveLength) {
        return Math.max(500, Math.min(2000, baseTokens * 1.2));
    }

    if (targetLength) {
        const targetTokens = Math.ceil(targetLength * 1.3); // Words to tokens estimate
        return Math.max(500, Math.min(2000, targetTokens * 1.2));
    }

    return Math.max(500, Math.min(2000, baseTokens * 1.5));
}

function postProcessText(text, style) {
    // Remove any unwanted prefixes or suffixes that AI might add
    let processed = text
        .replace(/^(Here's the rewritten text:|Rewritten text:|Here is the rewritten version:)/i, '')
        .replace(/^["']|["']$/g, '') // Remove quotes at start/end
        .trim();

    // Ensure proper sentence structure
    if (processed && !processed.match(/[.!?]$/)) {
        // Add period if text doesn't end with punctuation (unless it's a fragment)
        if (processed.length > 10 && !processed.includes('\n')) {
            processed += '.';
        }
    }

    // Style-specific post-processing
    switch (style) {
        case 'academic':
            // Ensure formal academic tone
            processed = processed.replace(/\b(don't|won't|can't|isn't|aren't)\b/g, match => {
                const expansions = {
                    "don't": "do not",
                    "won't": "will not",
                    "can't": "cannot",
                    "isn't": "is not",
                    "aren't": "are not"
                };
                return expansions[match.toLowerCase()] || match;
            });
            break;

        case 'casual':
            // Ensure conversational flow
            break;

        default:
            break;
    }

    return processed;
}

// Health check endpoint
export async function GET() {
    return Response.json({
        status: 'OK',
        service: 'AI Rewriter API',
        timestamp: new Date().toISOString()
    });
}
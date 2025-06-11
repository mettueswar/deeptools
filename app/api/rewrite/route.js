// app/api/rewrite/route.js
export async function POST(request) {
    try {
        const { text, model, tone } = await request.json();

        if (!text || !model || !tone) {
            return Response.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Get OpenRouter API key from environment variable
        const apiKey = process.env.OPENROUTER_API_KEY;

        if (!apiKey) {
            return Response.json(
                { error: 'OpenRouter API key not configured' },
                { status: 500 }
            );
        }

        // Create the prompt for rewriting
        const prompt = createRewritePrompt(text, tone);

        // Call OpenRouter API
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
                        content: `You are an expert writer that specializes in rewriting paragraphs while maintaining the original meaning. The tone should be ${tone}.`
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.7,
                max_tokens: 1024
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('OpenRouter API error:', errorData);
            return Response.json(
                { error: 'Failed to get response from AI service' },
                { status: response.status }
            );
        }

        const data = await response.json();
        const rewrittenText = data.choices[0].message.content;

        return Response.json({ rewrittenText });

    } catch (error) {
        console.error('API route error:', error);
        return Response.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

function createRewritePrompt(text, tone) {
    const toneInstructions = {
        professional: 'Use formal language, industry-specific terminology, and maintain a confident, authoritative voice.',
        casual: 'Use conversational language, contractions, and a friendly, relaxed tone.',
        academic: 'Use scholarly language, formal structure, precise terminology, and cite evidence when possible.',
        creative: 'Use vivid descriptions, metaphors, and engaging narrative elements.',
        persuasive: 'Use compelling arguments, emotional appeals, and persuasive language to convince the reader.'
    };

    return `
      Rewrite the following paragraph in a ${tone} tone. 
      ${toneInstructions[tone] || ''}
      Maintain the original meaning and key points, but improve clarity, flow, and impact.
      
      Original paragraph:
      "${text}"
      
      Please provide only the rewritten paragraph without any additional explanations.
    `;
}
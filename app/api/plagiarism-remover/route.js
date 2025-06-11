// app/api/remove-plagiarism/route.js

export async function POST(request) {
    try {
        const { text, model, transformationLevel, uniquenessScore, preserveMeaning } = await request.json();

        if (!text || !model || !transformationLevel) {
            return new Response(
                JSON.stringify({ error: 'Missing required fields' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Get API key from environment variable
        const apiKey = process.env.OPENROUTER_API_KEY;
        if (!apiKey) {
            return new Response(
                JSON.stringify({ error: 'API key not configured' }),
                { status: 500, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Create a prompt based on the transformation parameters
        let systemPrompt = `You are an expert at removing plagiarism from text while maintaining the original meaning and improving the content.
        
Your task is to transform the provided text to make it unique and pass plagiarism detection systems.`;

        // Add transformation level instructions
        switch (transformationLevel) {
            case 'light':
                systemPrompt += `
Apply LIGHT transformation:
- Maintain most of the original structure and flow
- Replace key phrases with synonyms
- Make minimal sentence restructuring
- Keep paragraphs in similar order`;
                break;
            case 'moderate':
                systemPrompt += `
Apply MODERATE transformation:
- Restructure sentences while preserving core meaning
- Replace phrases with alternative expressions
- Adjust paragraph order where appropriate
- Use different examples or illustrations if present`;
                break;
            case 'heavy':
                systemPrompt += `
Apply HEAVY transformation:
- Completely rewrite the text in a different style
- Use entirely different sentence structures
- Reorganize paragraphs in a new logical flow
- Express the same ideas in a fundamentally different way`;
                break;
        }

        // Add uniqueness score instructions
        systemPrompt += `
Target a uniqueness score of ${uniquenessScore}%, where 100% means completely different wording from the original while maintaining the same meaning.`;

        // Add meaning preservation instructions
        if (preserveMeaning) {
            systemPrompt += `
It is CRITICAL that you preserve the complete meaning, key points, arguments, and facts from the original text. Do not add new information or remove important details.`;
        } else {
            systemPrompt += `
Focus more on creating unique text than preserving exact meaning. You may add supporting details or examples to enhance the text.`;
        }

        // Make the API call to the LLM
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
                'HTTP-Referer': process.env.APP_URL || 'http://localhost:3000', // Replace with your app's URL in production
                'X-Title': 'Plagiarism Remover App'
            },
            body: JSON.stringify({
                model: model,
                messages: [
                    { role: 'system', content: systemPrompt },
                    {
                        role: 'user',
                        content: `Please transform the following text to remove plagiarism while maintaining the original meaning with a uniqueness score of ${uniquenessScore}%:

${text}

Provide only the transformed text without any explanations, disclaimers, or additional comments.`
                    }
                ],
                temperature: transformationLevel === 'light' ? 0.3 : transformationLevel === 'moderate' ? 0.6 : 0.8,
                max_tokens: 2000
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('API error:', errorData);
            return new Response(
                JSON.stringify({ error: 'Failed to transform text' }),
                { status: 500, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const data = await response.json();
        const transformedText = data.choices[0].message.content.trim();

        return new Response(
            JSON.stringify({ transformedText }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );

    } catch (error) {
        console.error('Error processing request:', error);
        return new Response(
            JSON.stringify({ error: 'Internal server error' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
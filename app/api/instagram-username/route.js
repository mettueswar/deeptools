
// app/api/instagram-username/route.js
export async function POST(request) {
    try {
        const { name, keywords, niche, model, style } = await request.json();

        if (!name && !keywords) {
            return Response.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const apiKey = process.env.OPENROUTER_API_KEY;

        if (!apiKey) {
            return Response.json(
                { error: 'OpenRouter API key not configured' },
                { status: 500 }
            );
        }

        const prompt = createUsernamePrompt(name, keywords, niche, style);

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
                        content: `You are an expert at creating Instagram usernames that are memorable, available, and represent personal brands well. The style should be ${style}. Create usernames that are likely to be available.`
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.9,
                max_tokens: 512
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
        const generatedText = data.choices[0].message.content;

        // Extract usernames from the response
        const usernames = generatedText
            .split('\n')
            .map(line => line.replace(/^\d+\.\s*@?/, '').trim())
            .filter(username => username.length > 0 && username.length <= 30)
            .slice(0, 10); // Limit to 10 usernames

        return Response.json({ usernames });

    } catch (error) {
        console.error('API route error:', error);
        return Response.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

function createUsernamePrompt(name, keywords, niche, style) {
    const styleInstructions = {
        professional: 'Create clean, professional usernames suitable for business or career-focused accounts.',
        creative: 'Use creative wordplay, unique combinations, and artistic elements.',
        business: 'Focus on brand-friendly, commercial, and marketing-oriented usernames.',
        personal: 'Create usernames that work well for personal branding and individual identity.',
        aesthetic: 'Design visually appealing, trendy usernames that look good and sound modern.',
        minimalist: 'Keep it simple, clean, and uncluttered with minimal characters.',
        trendy: 'Use current trends, popular culture references, and modern language.',
        unique: 'Create one-of-a-kind, distinctive usernames that stand out from the crowd.'
    };

    return `
        Create 10 Instagram usernames in a ${style} style using these details:
        
        Name/Brand: ${name || 'Not specified'}
        Keywords: ${keywords || 'Not specified'}
        Niche: ${niche || 'Not specified'}
        
        Requirements:
        - Each username must be 3-30 characters long
        - Use only letters, numbers, dots, and underscores
        - Make them memorable and easy to type
        - ${styleInstructions[style] || ''}
        - Avoid common words that are likely taken
        - Each username should be on a new line
        - Don't use @ symbol in the output
        
        Provide only the usernames, no additional text or explanations.
    `;
}
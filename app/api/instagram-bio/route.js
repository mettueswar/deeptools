// app/api/instagram-bio/route.js
export async function POST(request) {
    try {
        const { keywords, profession, interests, model, style } = await request.json();

        if (!keywords && !profession) {
            return Response.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const apiKey = process.env.OPENROUTER_API_KEY;

        if (!apiKey) {
            return Response.json(
                { error: 'OpenRouter API key not configured' },
                { status: 500 }
            );
        }

        const prompt = createBioPrompt(keywords, profession, interests, style);

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
                        content: `You are an expert Instagram bio writer that creates engaging, concise bios that attract followers. The style should be ${style}. Always stay within 150 characters and include relevant emojis.`
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.8,
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

        // Split the response into multiple bios
        const bios = generatedText
            .split('\n')
            .filter(bio => bio.trim().length > 0)
            .map(bio => bio.replace(/^\d+\.\s*/, '').trim())
            .slice(0, 5); // Limit to 5 bios

        return Response.json({ bios });

    } catch (error) {
        console.error('API route error:', error);
        return Response.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

function createBioPrompt(keywords, profession, interests, style) {
    const styleInstructions = {
        professional: 'Use professional language, clear value proposition, and industry credibility.',
        casual: 'Use friendly, conversational tone with fun emojis and relatable language.',
        creative: 'Use creative wordplay, unique descriptions, and artistic expressions.',
        entrepreneur: 'Focus on business achievements, leadership, and value creation.',
        influencer: 'Emphasize personal brand, lifestyle, and follower engagement.',
        artist: 'Highlight creativity, artistic vision, and creative processes.',
        fitness: 'Focus on health, motivation, and fitness journey.',
        travel: 'Emphasize wanderlust, adventure, and travel experiences.'
    };

    return `
        Create 5 different Instagram bios in a ${style} style using these details:
        
        Keywords: ${keywords}
        Profession: ${profession || 'Not specified'}
        Interests: ${interests || 'Not specified'}
        
        Requirements:
        - Each bio must be under 150 characters
        - Include relevant emojis
        - Make them engaging and followable
        - ${styleInstructions[style] || ''}
        - Focus on what makes this person/brand unique
        - Each bio should be on a new line
        
        Provide only the bios, no additional text or explanations.
    `;
}
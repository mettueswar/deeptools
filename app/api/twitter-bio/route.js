
// app/api/twitter-bio/route.js
export async function POST(request) {
    try {
        const { profession, expertise, personality, location, model, style } = await request.json();

        if (!profession && !expertise) {
            return Response.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const apiKey = process.env.OPENROUTER_API_KEY;

        if (!apiKey) {
            return Response.json(
                { error: 'OpenRouter API key not configured' },
                { status: 500 }
            );
        }

        const prompt = createTwitterBioPrompt(profession, expertise, personality, location, style);

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
                        content: `You are an expert at creating engaging Twitter bios that attract followers and build personal brands. The style should be ${style}. Always stay within 160 characters and make each bio unique and compelling.`
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
            .filter(bio => bio.length <= 160)
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

function createTwitterBioPrompt(profession, expertise, personality, location, style) {
    const styleInstructions = {
        professional: 'Use professional language, clear value proposition, and industry credibility.',
        witty: 'Use humor, clever wordplay, and entertaining language that makes people smile.',
        'thought-leader': 'Position as an expert, use authority language, and highlight unique insights.',
        entrepreneur: 'Focus on innovation, leadership, building, and business achievement.',
        creative: 'Use creative language, artistic expressions, and imaginative descriptions.',
        tech: 'Use tech terminology, focus on innovation, and highlight technical expertise.',
        personal: 'Be authentic, relatable, and show personal interests alongside professional life.',
        minimalist: 'Keep it simple, clean, and direct with no unnecessary words.'
    };

    return `
        Create 5 different Twitter bios in a ${style} style using these details:
        
        Profession: ${profession || 'Not specified'}
        Expertise: ${expertise || 'Not specified'}
        Personality: ${personality || 'Not specified'}
        Location: ${location || 'Not specified'}
        
        Requirements:
        - Each bio must be under 160 characters
        - Include relevant emojis when appropriate
        - Make them engaging and followable
        - ${styleInstructions[style] || ''}
        - Show clear value proposition
        - Each bio should be on a new line
        - Make each bio unique and compelling
        
        Provide only the bios, no additional text or explanations.
    `;
}
// app/api/facebook-bio/route.js
export async function POST(request) {
    try {
        const { name, occupation, interests, location, model, style } = await request.json();

        if (!name) {
            return Response.json({ error: 'Name is required' }, { status: 400 });
        }

        const apiKey = process.env.OPENROUTER_API_KEY;

        if (!apiKey) {
            return Response.json(
                { error: 'OpenRouter API key not configured' },
                { status: 500 }
            );
        }

        const prompt = createFacebookBioPrompt(name, occupation, interests, location, style);

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
                        content: `You are an expert at creating engaging Facebook bios that help people connect with friends, family, and build meaningful relationships. The style should be ${style}. Create authentic, relatable bios that show personality and make people want to connect.`
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
            .filter(bio => bio.length > 10 && bio.length <= 200) // Facebook bios can be longer than Twitter
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

function createFacebookBioPrompt(name, occupation, interests, location, style) {
    const styleInstructions = {
        personal: 'Create warm, authentic personal bios that show personality and make people want to be friends. Use friendly language and show what makes them unique.',
        family: 'Focus on family relationships, parenting, and family values. Show love for family and what family means to them. Use heartwarming language.',
        professional: 'Balance professionalism with approachability. Show career achievements while remaining personable and relatable for networking.',
        business: 'Create clear, compelling business bios that explain what the business does and why customers should choose them. Include value proposition.',
        inspirational: 'Use motivational language, positive quotes, and uplifting messages. Focus on growth, dreams, and inspiring others.',
        casual: 'Use fun, relaxed language with humor and personality. Make it feel like talking to a close friend. Include fun facts or quirky details.',
        creative: 'Use artistic, imaginative language that shows creativity and uniqueness. Appeal to other creative minds and showcase artistic personality.',
        community: 'Focus on community involvement, leadership, and bringing people together. Show commitment to making a positive local impact.'
    };

    return `
        Create 5 different Facebook bios in a ${style} style using these details:
        
        Name: ${name}
        Occupation: ${occupation || 'Not specified'}
        Interests: ${interests || 'Not specified'}
        Location: ${location || 'Not specified'}
        
        Requirements:
        - Each bio should be 50-150 characters (Facebook bios are shorter than posts)
        - Include relevant emojis when appropriate
        - Make them authentic and relatable
        - ${styleInstructions[style] || ''}
        - Show personality and what makes them unique
        - Each bio should be on a new line
        - Make each bio distinct and engaging
        - Focus on connection and relationships
        - Use warm, friendly tone appropriate for Facebook
        
        Examples of good Facebook bio styles:
        - "${name} | ${occupation || 'Living life to the fullest'} 🌟 ${location ? `📍 ${location}` : ''} | ${interests || 'Making memories'} ✨"
        - "✨ ${name} ✨\n${occupation ? `${occupation} by day, ` : ''}dreamer by night 🌙\n💝 Love: ${interests || 'family, friends, adventures'}"
        - "${name} 👋 ${occupation ? `| ${occupation}` : ''} ${location ? `| ${location}` : ''}\n❤️ Passionate about ${interests || 'life, love & laughter'}"
        
        Provide only the bios, no additional text or explanations.
    `;
}
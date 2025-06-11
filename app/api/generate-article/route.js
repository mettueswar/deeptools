// api/generate-article.js (Next.js API route)
// or use this as an Express.js route handler

import fetch from 'node-fetch'; // For Node.js < 18, or use built-in fetch for Node 18+

// OpenRouter configuration
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1/chat/completions';

// Free models available on OpenRouter
const FREE_MODELS = {
  'gpt-3.5-turbo': 'openai/gpt-3.5-turbo',
  'claude-3-haiku': 'anthropic/claude-3-haiku',
  'llama-3.1-8b': 'meta-llama/llama-3.1-8b-instruct:free',
  'mixtral-8x7b': 'mistralai/mixtral-8x7b-instruct:free',
  'gemma-7b': 'google/gemma-7b-it:free'
};

// Language prompts for different languages
const LANGUAGE_PROMPTS = {
  english: 'Write in clear, professional English.',
  hindi: 'Write primarily in Hindi (Devanagari script) with occasional English terms where appropriate.',
  spanish: 'Write in clear, professional Spanish.',
  french: 'Write in clear, professional French.',
  german: 'Write in clear, professional German.',
  chinese: 'Write in clear, professional Chinese (Simplified).',
  japanese: 'Write in clear, professional Japanese.',
  portuguese: 'Write in clear, professional Portuguese.',
  russian: 'Write in clear, professional Russian.',
  arabic: 'Write in clear, professional Arabic.'
};

// Tone descriptions
const TONE_DESCRIPTIONS = {
  professional: 'formal, business-like, and authoritative',
  casual: 'relaxed, conversational, and approachable',
  friendly: 'warm, welcoming, and personable',
  authoritative: 'expert, confident, and commanding',
  conversational: 'natural, engaging, and dialogue-like',
  formal: 'structured, official, and academic',
  enthusiastic: 'excited, energetic, and passionate',
  persuasive: 'convincing, compelling, and influential'
};

// Style descriptions
const STYLE_DESCRIPTIONS = {
  informative: 'educational and fact-based',
  narrative: 'story-telling and descriptive',
  analytical: 'data-driven and logical',
  creative: 'imaginative and artistic',
  technical: 'detailed and specification-focused',
  opinion: 'personal viewpoint and commentary',
  review: 'evaluative and comparative',
  tutorial: 'step-by-step and instructional'
};

// Length specifications
const LENGTH_SPECS = {
  short: '300-500 words',
  medium: '500-1000 words',
  long: '1000-2000 words',
  extended: '2000+ words'
};

// Audience specifications
const AUDIENCE_SPECS = {
  general: 'general public with no specialized knowledge',
  professionals: 'industry professionals and experts',
  students: 'students and learners',
  experts: 'subject matter experts and academics',
  beginners: 'complete beginners new to the topic'
};

function buildPrompt(topic, options) {
  const {
    language = 'english',
    tone = 'professional',
    style = 'informative',
    length = 'medium',
    audience = 'general',
    purpose = 'inform',
    includeIntro = true,
    includeConclusion = true,
    includeFAQ = false,
    includeOutline = false,
    includeExamples = true,
    includeStatistics = false,
    includeQuotes = false,
    includeCallToAction = false,
    creativity = 0.7
  } = options;

  let prompt = `You are a professional content writer. Write a comprehensive article about "${topic}".

REQUIREMENTS:
- ${LANGUAGE_PROMPTS[language] || LANGUAGE_PROMPTS.english}
- Length: ${LENGTH_SPECS[length]}
- Tone: ${TONE_DESCRIPTIONS[tone] || 'professional'}
- Style: ${STYLE_DESCRIPTIONS[style] || 'informative'}
- Target audience: ${AUDIENCE_SPECS[audience] || 'general public'}
- Purpose: ${purpose}

STRUCTURE:`;

  if (includeOutline) {
    prompt += '\n- Start with a brief outline of the article';
  }

  if (includeIntro) {
    prompt += '\n- Include an engaging introduction that hooks the reader';
  }

  prompt += '\n- Use clear headings and subheadings (use ## for main sections, ### for subsections)';
  prompt += '\n- Write in well-structured paragraphs with smooth transitions';

  if (includeExamples) {
    prompt += '\n- Include relevant examples and case studies';
  }

  if (includeStatistics) {
    prompt += '\n- Incorporate relevant statistics and data where appropriate';
  }

  if (includeQuotes) {
    prompt += '\n- Include relevant quotes from experts or authorities';
  }

  if (includeConclusion) {
    prompt += '\n- End with a strong conclusion that summarizes key points';
  }

  if (includeFAQ) {
    prompt += '\n- Include a FAQ section with 3-5 common questions and answers';
  }

  if (includeCallToAction) {
    prompt += '\n- Include a call-to-action at the end';
  }

  prompt += `

FORMATTING:
- Use Markdown formatting
- Make headings clear and descriptive
- Use bullet points or numbered lists where appropriate
- Ensure proper paragraph spacing
- Make the content scannable and easy to read

CONTENT QUALITY:
- Ensure accuracy and factual information
- Make it engaging and valuable to the reader
- Use active voice where possible
- Vary sentence length and structure
- Include relevant keywords naturally

Write the complete article now:`;

  return prompt;
}

async function generateWithOpenRouter(prompt, model, temperature = 0.7) {
  const modelName = FREE_MODELS[model] || FREE_MODELS['llama-3.1-8b'];

  try {
    const response = await fetch(OPENROUTER_BASE_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.SITE_URL || 'http://localhost:3000',
        'X-Title': 'AI Article Writer Pro'
      },
      body: JSON.stringify({
        model: modelName,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: temperature,
        max_tokens: 4000,
        top_p: 0.9,
        frequency_penalty: 0.1,
        presence_penalty: 0.1
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`OpenRouter API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Invalid response format from OpenRouter API');
    }

    return data.choices[0].message.content;
  } catch (error) {
    console.error('OpenRouter API Error:', error);
    throw error;
  }
}

// Next.js API Route Handler
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  // Check for API key
  if (!OPENROUTER_API_KEY) {
    return res.status(500).json({
      error: 'OpenRouter API key not configured. Please set OPENROUTER_API_KEY in environment variables.'
    });
  }

  try {
    const { topic, options = {} } = req.body;

    // Validate input
    if (!topic || typeof topic !== 'string' || topic.trim().length === 0) {
      return res.status(400).json({
        error: 'Topic is required and must be a non-empty string.'
      });
    }

    if (topic.length > 500) {
      return res.status(400).json({
        error: 'Topic is too long. Please keep it under 500 characters.'
      });
    }

    // Build the prompt
    const prompt = buildPrompt(topic.trim(), options);

    // Determine model and temperature
    const model = options.model || 'llama-3.1-8b';
    const temperature = Math.max(0.1, Math.min(1.0, parseFloat(options.creativity) || 0.7));

    // Generate the article
    const content = await generateWithOpenRouter(prompt, model, temperature);

    // Return the generated content
    res.status(200).json({
      success: true,
      content: content.trim(),
      model: FREE_MODELS[model] || FREE_MODELS['llama-3.1-8b'],
      wordCount: content.trim().split(/\s+/).length,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Article generation error:', error);

    // Return appropriate error response
    if (error.message.includes('OpenRouter API error')) {
      res.status(502).json({
        error: 'AI service temporarily unavailable. Please try again in a moment.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    } else if (error.message.includes('rate limit') || error.message.includes('quota')) {
      res.status(429).json({
        error: 'Rate limit exceeded. Please try again in a few minutes.'
      });
    } else {
      res.status(500).json({
        error: 'Failed to generate article. Please try again.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
}

// Alternative Express.js route handler
export function expressHandler(req, res) {
  return handler(req, res);
}

// Rate limiting utility (optional)
const rateLimitMap = new Map();

export function checkRateLimit(identifier, maxRequests = 10, windowMs = 60000) {
  const now = Date.now();
  const windowStart = now - windowMs;

  if (!rateLimitMap.has(identifier)) {
    rateLimitMap.set(identifier, []);
  }

  const requests = rateLimitMap.get(identifier);

  // Remove old requests outside the window
  const recentRequests = requests.filter(time => time > windowStart);

  if (recentRequests.length >= maxRequests) {
    return false; // Rate limit exceeded
  }

  // Add current request
  recentRequests.push(now);
  rateLimitMap.set(identifier, recentRequests);

  return true; // Request allowed
}

// Usage with rate limiting (modify the handler above):
/*
export default async function handler(req, res) {
  // Rate limiting check
  const clientId = req.ip || req.connection.remoteAddress || 'unknown';
  if (!checkRateLimit(clientId, 5, 60000)) { // 5 requests per minute
    return res.status(429).json({ 
      error: 'Too many requests. Please wait a minute before trying again.' 
    });
  }
  
  // ... rest of the handler code
}
*/
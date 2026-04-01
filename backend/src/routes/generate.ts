import { Router, Request, Response } from 'express';
import Groq from 'groq-sdk';
import { GenerateRequestBody, GenerateResponse, ErrorResponse, toneMap } from '../types/index';

const router = Router();

router.post(
  '/',
  async (
    req: Request<{}, GenerateResponse | { variants: GenerateResponse[] } | ErrorResponse, GenerateRequestBody & { variants?: boolean }>,
    res: Response<GenerateResponse | { variants: GenerateResponse[] } | ErrorResponse>
  ) => {
    const { productName, productDetails, tone, keywords, variants } = req.body;

    if (!productName || !productDetails) {
      res.status(400).json({ error: 'Product name and details are required.' });
      return;
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    const toneDescription = toneMap[tone] ?? toneMap['professional'];
    const keywordLine = keywords ? `Naturally incorporate these SEO keywords: ${keywords}.` : '';

    const singlePrompt = `You are an expert e-commerce copywriter and SEO specialist.

Write a compelling product description for the following product:

Product Name: ${productName}
Product Details: ${productDetails}
Tone: ${toneDescription}
${keywordLine}

Your response must be a valid JSON object with exactly this structure:
{
  "description": "A 150-200 word SEO-optimized product description written in the specified tone",
  "seoTitle": "An SEO-optimized product title under 60 characters",
  "metaDescription": "A meta description under 160 characters",
  "suggestedKeywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"]
}

Return only the JSON object, no extra text.`;

    const variantsPrompt = `You are an expert e-commerce copywriter and SEO specialist.

Generate 3 distinct product description variants for:

Product Name: ${productName}
Product Details: ${productDetails}
Tone: ${toneDescription}
${keywordLine}

Each variant should have a unique angle or emphasis. Return ONLY a valid JSON object:
{
  "variants": [
    {
      "description": "150-200 word SEO-optimized product description",
      "seoTitle": "SEO-optimized title under 60 characters",
      "metaDescription": "Meta description under 160 characters",
      "suggestedKeywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"]
    },
    {
      "description": "...",
      "seoTitle": "...",
      "metaDescription": "...",
      "suggestedKeywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"]
    },
    {
      "description": "...",
      "seoTitle": "...",
      "metaDescription": "...",
      "suggestedKeywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"]
    }
  ]
}

Return only the JSON object, no extra text.`;

    try {
      const completion = await groq.chat.completions.create({
        model: 'llama-3.1-8b-instant',
        messages: [{ role: 'user', content: variants ? variantsPrompt : singlePrompt }],
        temperature: 0.7,
        max_tokens: variants ? 2048 : 1024
      });

      const raw = completion.choices[0].message.content?.trim() ?? '';
      const jsonStart = raw.indexOf('{');
      const jsonEnd = raw.lastIndexOf('}') + 1;
      const jsonStr = raw.slice(jsonStart, jsonEnd);
      const result = JSON.parse(jsonStr);

      res.json(result);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      console.error('Full error:', err);
      res.status(500).json({ error: message });
    }
  }
);

export default router;
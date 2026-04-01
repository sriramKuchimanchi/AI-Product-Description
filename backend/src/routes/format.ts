import { Router, Request, Response } from 'express';
import Groq from 'groq-sdk';
import { ErrorResponse } from '../types/index';

const router = Router();

const platformInstructions: Record<string, string> = {
  Amazon: 'Format for Amazon: start with a punchy title line, then 5 bullet points starting with • covering key features, benefits, and specs. End with a short "About this item" paragraph.',
  Shopify: 'Format for Shopify: short engaging headline, 2-3 paragraph storytelling description that speaks to lifestyle and emotion, followed by a Features section with 4-5 short bullet points.',
  Etsy: 'Format for Etsy: warm, personal, handcrafted tone. Start with a story sentence, then describe materials and process, then explain why someone would love or gift it. Keep it intimate and human.'
};

interface FormatRequestBody {
  productName: string;
  description: string;
  platform: string;
}

interface FormatResponse {
  formatted: string;
}

router.post(
  '/',
  async (
    req: Request<{}, FormatResponse | ErrorResponse, FormatRequestBody>,
    res: Response<FormatResponse | ErrorResponse>
  ) => {
    const { productName, description, platform } = req.body;

    if (!productName || !description || !platform) {
      res.status(400).json({ error: 'Product name, description, and platform are required.' });
      return;
    }

    const instruction = platformInstructions[platform];
    if (!instruction) {
      res.status(400).json({ error: 'Invalid platform.' });
      return;
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const prompt = `You are a professional product copywriter. Reformat the following product description specifically for ${platform}.

${instruction}

Product: ${productName}
Original Description: ${description}

Return only the reformatted text, no extra commentary or JSON.`;

    try {
      const completion = await groq.chat.completions.create({
        model: 'llama-3.1-8b-instant',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.6,
        max_tokens: 1024
      });

      const formatted = completion.choices[0].message.content?.trim() ?? '';
      res.json({ formatted });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      console.error('Full error:', err);
      res.status(500).json({ error: message });
    }
  }
);

export default router;
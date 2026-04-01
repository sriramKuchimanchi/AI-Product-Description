export interface GenerateRequestBody {
  productName: string;
  productDetails: string;
  tone: ToneKey;
  keywords?: string;
}

export type ToneKey = 'professional' | 'casual' | 'luxury' | 'playful' | 'minimalist';

export interface GenerateResponse {
  description: string;
  seoTitle: string;
  metaDescription: string;
  suggestedKeywords: string[];
}

export interface ErrorResponse {
  error: string;
}

export const toneMap: Record<ToneKey, string> = {
  professional: 'formal, authoritative, and trustworthy',
  casual: 'friendly, conversational, and approachable',
  luxury: 'elegant, sophisticated, and premium',
  playful: 'fun, energetic, and exciting',
  minimalist: 'clean, concise, and straightforward'
};
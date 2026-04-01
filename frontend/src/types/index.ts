export type ToneKey = 'professional' | 'casual' | 'luxury' | 'playful' | 'minimalist'
export type PlatformKey = 'Amazon' | 'Shopify' | 'Etsy'

export interface GenerateResponse {
  description: string
  seoTitle: string
  metaDescription: string
  suggestedKeywords: string[]
}

export interface VariantsResponse {
  variants: GenerateResponse[]
}

export interface HistoryEntry extends GenerateResponse {
  id: string
  productName: string
  tone: ToneKey
  createdAt: string
}
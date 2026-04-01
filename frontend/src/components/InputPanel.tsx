import type { ToneKey } from '../types'

const TONES: ToneKey[] = ['professional', 'casual', 'luxury', 'playful', 'minimalist']

interface InputPanelProps {
  productName: string
  productDetails: string
  keywords: string
  tone: ToneKey
  loading: boolean
  error: string
  onProductNameChange: (val: string) => void
  onProductDetailsChange: (val: string) => void
  onKeywordsChange: (val: string) => void
  onToneChange: (tone: ToneKey) => void
  onGenerate: () => void
}

export default function InputPanel({
  productName,
  productDetails,
  keywords,
  tone,
  loading,
  error,
  onProductNameChange,
  onProductDetailsChange,
  onKeywordsChange,
  onToneChange,
  onGenerate
}: InputPanelProps) {
  const wordCount = productDetails.trim() ? productDetails.trim().split(/\s+/).length : 0
  const charCount = productDetails.length

  return (
    <>
      <div className="flex-1 overflow-y-auto px-8 py-7 flex flex-col gap-6 bg-gray-50">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
            Product Name *
          </label>
          <input
            className="w-full bg-white border border-gray-200 rounded-xl text-gray-900 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50 placeholder-gray-300 transition-all"
            placeholder="e.g. Wireless Noise-Cancelling Headphones"
            value={productName}
            onChange={e => onProductNameChange(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
            Product Details *
          </label>
          <textarea
            className="w-full bg-white border border-gray-200 rounded-xl text-gray-900 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50 placeholder-gray-300 transition-all resize-none"
            rows={5}
            placeholder="Describe features, materials, use cases, what makes it special..."
            value={productDetails}
            onChange={e => onProductDetailsChange(e.target.value)}
          />
          <p className="text-gray-300 text-xs text-right">
            {charCount} chars · {wordCount} words
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
            SEO Keywords{' '}
            <span className="normal-case text-gray-300 font-normal">(optional)</span>
          </label>
          <input
            className="w-full bg-white border border-gray-200 rounded-xl text-gray-900 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50 placeholder-gray-300 transition-all"
            placeholder="e.g. wireless headphones, noise cancelling..."
            value={keywords}
            onChange={e => onKeywordsChange(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
            Tone Style
          </label>
          <div className="grid grid-cols-3 gap-2">
            {TONES.map(t => (
              <button
                key={t}
                onClick={() => onToneChange(t)}
                className={`py-2.5 px-3 rounded-lg text-xs font-medium border transition-all cursor-pointer
                  ${tone === t
                    ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                    : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl text-red-600 px-4 py-3 text-sm">
            {error}
          </div>
        )}
      </div>

      <div className="px-8 py-5 border-t border-gray-200 bg-white">
        <button
          onClick={onGenerate}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm py-3.5 rounded-xl cursor-pointer transition-all active:scale-[0.99] shadow-sm"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block"></span>
              Generating 3 Variants…
            </span>
          ) : (
            '✦ Generate 3 Variants'
          )}
        </button>
      </div>
    </>
  )
}
import type { GenerateResponse, HistoryEntry } from '../types'
import ResultCard from './ResultCard'
import VariantCard from './VariantCard'
import PlatformFormatter from './PlatformFormatter'
import { formatDate } from '../utils/storage'

interface ResultsPanelProps {
  variants: GenerateResponse[] | null
  selectedVariant: number
  starredVariant: number | null
  result: HistoryEntry | null
  copied: string | null
  productName: string
  tone: string
  onCopy: (text: string, label: string) => void
  onExport: () => void
  onSelectVariant: (index: number) => void
  onStarVariant: (index: number) => void
}

export default function ResultsPanel({
  variants,
  selectedVariant,
  starredVariant,
  result,
  copied,
  productName,
  tone,
  onCopy,
  onExport,
  onSelectVariant,
  onStarVariant
}: ResultsPanelProps) {
  if (!variants || variants.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-16 bg-gray-50">
        <div className="w-16 h-16 rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-3xl mb-2 shadow-sm">
          ✦
        </div>
        <h2 className="text-gray-400 text-xl font-semibold">Results will appear here</h2>
        <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
          Fill in your product details on the left and click Generate to get 3 unique variants.
        </p>
      </div>
    )
  }

  const activeVariant = variants[selectedVariant]

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      <div className="px-10 py-6 border-b border-gray-200 bg-white flex items-center justify-between">
        <div>
          <h2 className="text-gray-900 font-semibold text-base">{productName}</h2>
          <p className="text-gray-400 text-xs mt-0.5">
            3 variants · <span className="capitalize">{tone}</span> tone
            {result && <> · {formatDate(result.createdAt)}</>}
            {starredVariant !== null && <> · Variant {starredVariant + 1} starred ⭐</>}
          </p>
        </div>
        <button
          onClick={onExport}
          className="flex items-center gap-2 bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 rounded-lg px-4 py-2 text-xs text-gray-500 hover:text-gray-800 transition-all cursor-pointer"
        >
          <span>↓</span> Export .txt
        </button>
      </div>

      <div className="px-10 py-8 flex flex-col gap-5">
        {variants.map((v, i) => (
          <VariantCard
            key={i}
            variant={v}
            index={i}
            selected={selectedVariant === i}
            starred={starredVariant === i}
            onSelect={onSelectVariant}
            onStar={onStarVariant}
            copied={copied}
            onCopy={onCopy}
          />
        ))}

        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
              Suggested Keywords — Variant {selectedVariant + 1}
            </span>
            <button
              onClick={() => onCopy(activeVariant.suggestedKeywords.join(', '), 'keywords')}
              className="text-xs text-gray-400 hover:text-gray-700 border border-gray-200 hover:border-gray-300 rounded-lg px-3 py-1 transition-all cursor-pointer"
            >
              {copied === 'keywords' ? '✓ Copied' : 'Copy all'}
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {activeVariant.suggestedKeywords.map(kw => (
              <span
                key={kw}
                className="bg-blue-50 border border-blue-200 text-blue-700 text-xs px-3 py-1.5 rounded-full"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <ResultCard
            label="SEO Title"
            content={activeVariant.seoTitle}
            onCopy={() => onCopy(activeVariant.seoTitle, 'seoTitle')}
            copied={copied === 'seoTitle'}
          />
          <ResultCard
            label="Meta Description"
            content={activeVariant.metaDescription}
            onCopy={() => onCopy(activeVariant.metaDescription, 'metaDescription')}
            copied={copied === 'metaDescription'}
          />
        </div>

        <PlatformFormatter
          description={activeVariant.description}
          productName={productName}
        />
      </div>
    </div>
  )
}
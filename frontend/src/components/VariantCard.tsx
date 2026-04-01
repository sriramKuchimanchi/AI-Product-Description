import { useState } from 'react'
import type { GenerateResponse } from '../types'

interface VariantCardProps {
  variant: GenerateResponse
  index: number
  selected: boolean
  starred: boolean
  onSelect: (index: number) => void
  onStar: (index: number) => void
  copied: string | null
  onCopy: (text: string, label: string) => void
}

export default function VariantCard({
  variant,
  index,
  selected,
  starred,
  onSelect,
  onStar,
  copied,
  onCopy
}: VariantCardProps) {
  return (
    <div
      onClick={() => onSelect(index)}
      className={`rounded-xl p-5 cursor-pointer transition-all border ${
        selected
          ? 'bg-blue-50 border-blue-300 shadow-sm'
          : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className={`text-xs font-semibold uppercase tracking-widest ${selected ? 'text-blue-600' : 'text-gray-400'}`}>
          Variant {index + 1}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={e => { e.stopPropagation(); onStar(index) }}
            className={`text-base transition-colors ${starred ? 'text-yellow-400' : 'text-gray-200 hover:text-gray-400'}`}
          >
            ★
          </button>
          <button
            onClick={e => { e.stopPropagation(); onCopy(variant.description, `desc-${index}`) }}
            className="text-xs text-gray-400 hover:text-gray-700 border border-gray-200 hover:border-gray-300 rounded-lg px-3 py-1 transition-all"
          >
            {copied === `desc-${index}` ? '✓ Copied' : 'Copy'}
          </button>
        </div>
      </div>

      <p className="text-gray-700 text-sm leading-relaxed">{variant.description}</p>

      {selected && (
        <div className="mt-4 pt-4 border-t border-blue-200 grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1.5">SEO Title</p>
            <p className="text-gray-600 text-xs leading-relaxed">{variant.seoTitle}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1.5">Meta Description</p>
            <p className="text-gray-600 text-xs leading-relaxed">{variant.metaDescription}</p>
          </div>
        </div>
      )}
    </div>
  )
}
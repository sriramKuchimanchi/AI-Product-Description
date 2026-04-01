import { useState } from 'react'
import type { PlatformKey } from '../types'

const PLATFORMS: PlatformKey[] = ['Amazon', 'Shopify', 'Etsy']
const API_URL = 'http://localhost:3000/api/format'

interface PlatformFormatterProps {
  description: string
  productName: string
}

export default function PlatformFormatter({ description, productName }: PlatformFormatterProps) {
  const [platform, setPlatform] = useState<PlatformKey>('Amazon')
  const [formatted, setFormatted] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  async function handleFormat() {
    setLoading(true)
    setError('')
    setFormatted('')
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productName, description, platform })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Something went wrong.')
      setFormatted(data.formatted)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.')
    } finally {
      setLoading(false)
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(formatted).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-4">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
        Platform Formatter
      </p>

      <div className="flex items-center gap-2 flex-wrap">
        {PLATFORMS.map(p => (
          <button
            key={p}
            onClick={() => setPlatform(p)}
            className={`px-4 py-2 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
              platform === p
                ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700'
            }`}
          >
            {p}
          </button>
        ))}
        <button
          onClick={handleFormat}
          disabled={loading}
          className="ml-auto flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-semibold px-4 py-2 rounded-lg transition-all cursor-pointer shadow-sm"
        >
          {loading ? (
            <>
              <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" />
              Formatting…
            </>
          ) : (
            `Format for ${platform}`
          )}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg text-red-600 px-3 py-2 text-xs">
          {error}
        </div>
      )}

      {formatted && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 relative">
          <button
            onClick={handleCopy}
            className="absolute top-3 right-3 text-xs text-gray-400 hover:text-gray-700 border border-gray-200 hover:border-gray-300 rounded-lg px-3 py-1 transition-all cursor-pointer bg-white"
          >
            {copied ? '✓ Copied' : 'Copy'}
          </button>
          <pre className="text-gray-700 text-xs leading-relaxed whitespace-pre-wrap font-sans pr-16">
            {formatted}
          </pre>
        </div>
      )}
    </div>
  )
}
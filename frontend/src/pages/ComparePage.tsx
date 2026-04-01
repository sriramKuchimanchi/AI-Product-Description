import { useState } from 'react'
import Navbar from '../components/Navbar'
import type { ToneKey, GenerateResponse } from '../types'

const TONES: ToneKey[] = ['professional', 'casual', 'luxury', 'playful', 'minimalist']
const GENERATE_URL = 'http://localhost:3000/api/generate'
const ANALYZE_URL = 'http://localhost:3000/api/analyze'

interface ProductInput {
  name: string
  details: string
  tone: ToneKey
}

interface AnalysisResult {
  productAStrengths: string[]
  productAWeaknesses: string[]
  productBStrengths: string[]
  productBWeaknesses: string[]
  winner: 'A' | 'B'
  winnerReason: string
  actionableTip: string
}

interface ProductInputFormProps {
  product: ProductInput
  onChange: (p: ProductInput) => void
  label: string
}

function ProductInputForm({ product, onChange, label }: ProductInputFormProps) {
  return (
    <div className="flex-1 min-w-64 bg-white border border-gray-200 rounded-xl p-6">
      <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">{label}</p>
      <div className="flex flex-col gap-4">
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest block mb-1.5">Product Name *</label>
          <input
            className="w-full bg-gray-50 border border-gray-200 rounded-lg text-gray-900 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50 placeholder-gray-300 transition-all"
            placeholder="e.g. Running Shoes Pro"
            value={product.name}
            onChange={e => onChange({ ...product, name: e.target.value })}
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest block mb-1.5">Product Details *</label>
          <textarea
            className="w-full bg-gray-50 border border-gray-200 rounded-lg text-gray-900 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50 placeholder-gray-300 transition-all resize-none"
            rows={4}
            placeholder="Features, materials, use cases..."
            value={product.details}
            onChange={e => onChange({ ...product, details: e.target.value })}
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest block mb-1.5">Tone</label>
          <div className="flex flex-wrap gap-2">
            {TONES.map(t => (
              <button
                key={t}
                onClick={() => onChange({ ...product, tone: t })}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                  product.tone === t
                    ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                    : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

interface ResultColProps {
  result: GenerateResponse
  label: string
  isWinner: boolean
  strengths: string[]
  weaknesses: string[]
}

function ResultCol({ result, label, isWinner, strengths, weaknesses }: ResultColProps) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(result.description).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className={`flex-1 min-w-64 rounded-xl p-5 border flex flex-col gap-4 transition-all ${
      isWinner ? 'bg-green-50 border-green-300' : 'bg-white border-gray-200'
    }`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-widest text-gray-500">{label}</span>
        {isWinner && (
          <span className="text-xs bg-green-100 border border-green-300 text-green-700 rounded-full px-2.5 py-0.5 font-semibold">
            🏆 Stronger Copy
          </span>
        )}
      </div>

      <div>
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1.5">Description</p>
        <p className="text-gray-700 text-xs leading-relaxed">{result.description}</p>
      </div>
      <div>
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1.5">SEO Title</p>
        <p className="text-gray-600 text-xs">{result.seoTitle}</p>
      </div>
      <div>
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Keywords</p>
        <div className="flex flex-wrap gap-1.5">
          {result.suggestedKeywords.map(kw => (
            <span key={kw} className="bg-blue-50 border border-blue-200 text-blue-700 text-xs px-2 py-0.5 rounded-full">
              {kw}
            </span>
          ))}
        </div>
      </div>

      {strengths.length > 0 && (
        <div>
          <p className="text-xs text-green-600 uppercase tracking-widest mb-2 font-semibold">What works well</p>
          <ul className="flex flex-col gap-1.5">
            {strengths.map((s, i) => (
              <li key={i} className="text-xs text-gray-600 leading-relaxed flex gap-2">
                <span className="text-green-500 mt-0.5 shrink-0">✓</span>{s}
              </li>
            ))}
          </ul>
        </div>
      )}

      {weaknesses.length > 0 && (
        <div>
          <p className="text-xs text-red-500 uppercase tracking-widest mb-2 font-semibold">What's missing</p>
          <ul className="flex flex-col gap-1.5">
            {weaknesses.map((w, i) => (
              <li key={i} className="text-xs text-gray-600 leading-relaxed flex gap-2">
                <span className="text-red-400 mt-0.5 shrink-0">✗</span>{w}
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={handleCopy}
        className="mt-auto text-xs text-gray-400 hover:text-gray-700 border border-gray-200 hover:border-gray-300 bg-white rounded-lg py-2 transition-all cursor-pointer"
      >
        {copied ? '✓ Copied' : 'Copy Description'}
      </button>
    </div>
  )
}

function AnalysisPanel({ analysis, productAName, productBName }: { analysis: AnalysisResult; productAName: string; productBName: string }) {
  const winnerName = analysis.winner === 'A' ? productAName : productBName
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <span className="text-xl">🏆</span>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-0.5">Intelligence Report</p>
          <p className="text-gray-900 font-semibold text-sm">
            <span className="text-green-600">{winnerName}</span> has the stronger copy
          </p>
        </div>
      </div>
      <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1.5">Why it wins</p>
        <p className="text-gray-600 text-xs leading-relaxed">{analysis.winnerReason}</p>
      </div>
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-3 flex gap-3">
        <span className="text-yellow-500 text-sm shrink-0 mt-0.5">💡</span>
        <div>
          <p className="text-xs text-yellow-600 uppercase tracking-widest mb-1.5 font-semibold">Actionable tip</p>
          <p className="text-gray-600 text-xs leading-relaxed">{analysis.actionableTip}</p>
        </div>
      </div>
    </div>
  )
}

export default function ComparePage() {
  const [productA, setProductA] = useState<ProductInput>({ name: '', details: '', tone: 'professional' })
  const [productB, setProductB] = useState<ProductInput>({ name: '', details: '', tone: 'professional' })
  const [results, setResults] = useState<{ a: GenerateResponse; b: GenerateResponse } | null>(null)
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [loadingGenerate, setLoadingGenerate] = useState(false)
  const [loadingAnalysis, setLoadingAnalysis] = useState(false)
  const [error, setError] = useState('')

  async function handleCompare() {
    if (!productA.name || !productA.details || !productB.name || !productB.details) {
      setError('Please fill in all fields for both products.')
      return
    }
    setError('')
    setLoadingGenerate(true)
    setResults(null)
    setAnalysis(null)

    try {
      const [resA, resB] = await Promise.all([
        fetch(GENERATE_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productName: productA.name, productDetails: productA.details, tone: productA.tone, keywords: '' })
        }).then(r => r.json()),
        fetch(GENERATE_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productName: productB.name, productDetails: productB.details, tone: productB.tone, keywords: '' })
        }).then(r => r.json())
      ])
      if (resA.error) throw new Error(resA.error)
      if (resB.error) throw new Error(resB.error)

      setResults({ a: resA, b: resB })
      setLoadingGenerate(false)
      setLoadingAnalysis(true)

      const analysisRes = await fetch(ANALYZE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productAName: productA.name,
          productADescription: resA.description,
          productBName: productB.name,
          productBDescription: resB.description
        })
      })
      const analysisData: AnalysisResult = await analysisRes.json()
      if (!analysisRes.ok) throw new Error((analysisData as unknown as { error: string }).error ?? 'Analysis failed.')
      setAnalysis(analysisData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.')
    } finally {
      setLoadingGenerate(false)
      setLoadingAnalysis(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 font-['DM_Sans',sans-serif]">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');`}</style>
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 pt-24 pb-16">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Competitive Copy Analysis</h1>
          <p className="text-gray-400 text-sm mt-1">Generate copy for two products and get an AI breakdown of what works and what doesn't</p>
        </div>

        <div className="flex gap-4 mb-5 flex-wrap">
          <ProductInputForm product={productA} onChange={setProductA} label="Your Product" />
          <ProductInputForm product={productB} onChange={setProductB} label="Competitor Product" />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl text-red-600 px-4 py-3 text-sm mb-4">
            {error}
          </div>
        )}

        <button
          onClick={handleCompare}
          disabled={loadingGenerate || loadingAnalysis}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm py-3.5 rounded-xl cursor-pointer transition-all mb-8 shadow-sm"
        >
          {loadingGenerate ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" />
              Generating copy…
            </span>
          ) : loadingAnalysis ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" />
              Analysing copy…
            </span>
          ) : (
            '⚡ Analyse & Compare'
          )}
        </button>

        {results && (
          <div className="flex flex-col gap-5">
            <div className="flex gap-4 flex-wrap">
              <ResultCol
                result={results.a}
                label="Your Product"
                isWinner={analysis?.winner === 'A'}
                strengths={analysis?.productAStrengths ?? []}
                weaknesses={analysis?.productAWeaknesses ?? []}
              />
              <ResultCol
                result={results.b}
                label="Competitor"
                isWinner={analysis?.winner === 'B'}
                strengths={analysis?.productBStrengths ?? []}
                weaknesses={analysis?.productBWeaknesses ?? []}
              />
            </div>

            {loadingAnalysis && !analysis && (
              <div className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-3">
                <span className="w-4 h-4 border-2 border-gray-200 border-t-blue-500 rounded-full animate-spin inline-block shrink-0" />
                <p className="text-gray-400 text-sm">Running competitive analysis…</p>
              </div>
            )}

            {analysis && (
              <AnalysisPanel
                analysis={analysis}
                productAName={productA.name}
                productBName={productB.name}
              />
            )}
          </div>
        )}
      </div>
    </div>
  )
}
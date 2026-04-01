import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import type { ToneKey, GenerateResponse, VariantsResponse, HistoryEntry } from '../types'
import { loadHistory, saveHistory } from '../utils/storage'
import type { TemplateState } from './TemplatesPage'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import InputPanel from '../components/InputPanel'
import ResultsPanel from '../components/ResultsPanel'

const API_URL = 'http://localhost:3000/api/generate'

export default function AppPage() {
  const location = useLocation()
  const state = location.state as (TemplateState & { prefillResult?: HistoryEntry }) | null
  const prefill = state?.prefillResult ?? null

  const [productName, setProductName] = useState(state?.productName ?? '')
  const [productDetails, setProductDetails] = useState(state?.productDetails ?? '')
  const [keywords, setKeywords] = useState(state?.keywords ?? '')
  const [tone, setTone] = useState<ToneKey>(state?.tone ?? 'professional')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [variants, setVariants] = useState<GenerateResponse[] | null>(
    prefill
      ? [{ description: prefill.description, seoTitle: prefill.seoTitle, metaDescription: prefill.metaDescription, suggestedKeywords: prefill.suggestedKeywords }]
      : null
  )
  const [selectedVariant, setSelectedVariant] = useState(0)
  const [starredVariant, setStarredVariant] = useState<number | null>(null)
  const [result, setResult] = useState<HistoryEntry | null>(prefill ?? null)
  const [copied, setCopied] = useState<string | null>(null)
  const [history, setHistory] = useState<HistoryEntry[]>(loadHistory)

  useEffect(() => {
    saveHistory(history)
  }, [history])

  async function handleGenerate() {
    setError('')
    if (!productName.trim() || !productDetails.trim()) {
      setError('Please fill in the product name and details.')
      return
    }
    setLoading(true)
    setVariants(null)
    setStarredVariant(null)
    setSelectedVariant(0)
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productName, productDetails, tone, keywords, variants: true })
      })
      const data: VariantsResponse | GenerateResponse = await res.json()
      if (!res.ok) throw new Error((data as unknown as { error: string }).error ?? 'Something went wrong.')

      let generatedVariants: GenerateResponse[]
      if ('variants' in data && Array.isArray(data.variants)) {
        generatedVariants = data.variants
      } else {
        generatedVariants = [data as GenerateResponse]
      }

      setVariants(generatedVariants)
      const entry: HistoryEntry = {
        id: crypto.randomUUID(),
        productName,
        tone,
        createdAt: new Date().toISOString(),
        ...generatedVariants[0]
      }
      setResult(entry)
      setHistory(prev => [entry, ...prev].slice(0, 20))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.')
    } finally {
      setLoading(false)
    }
  }

  function handleCopy(text: string, label: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(label)
      setTimeout(() => setCopied(null), 2000)
    })
  }

  function handleExport() {
    if (!variants || variants.length === 0) return
    const active = variants[selectedVariant]
    const starLabel = starredVariant !== null ? ` — Starred: Variant ${starredVariant + 1}` : ''
    const content = `PRODUCT: ${productName}${starLabel}\nTONE: ${tone}\n\n--- VARIANT ${selectedVariant + 1} DESCRIPTION ---\n${active.description}\n\n--- SEO TITLE ---\n${active.seoTitle}\n\n--- META DESCRIPTION ---\n${active.metaDescription}\n\n--- SUGGESTED KEYWORDS ---\n${active.suggestedKeywords.join(', ')}`
    const blob = new Blob([content], { type: 'text/plain' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `${productName.replace(/\s+/g, '_')}_copy.txt`
    a.click()
  }

  function handleStarVariant(index: number) {
    setStarredVariant(prev => prev === index ? null : index)
  }

  return (
    <div className="flex flex-col min-h-screen bg-white font-['DM_Sans',sans-serif]">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');`}</style>
      <Navbar />

      <div className="flex flex-1 pt-14">
        <div className="w-full lg:w-[42%] flex flex-col border-r border-gray-200">
          <Header />
          <InputPanel
            productName={productName}
            productDetails={productDetails}
            keywords={keywords}
            tone={tone}
            loading={loading}
            error={error}
            onProductNameChange={setProductName}
            onProductDetailsChange={setProductDetails}
            onKeywordsChange={setKeywords}
            onToneChange={setTone}
            onGenerate={handleGenerate}
          />
        </div>

        <div className="hidden lg:flex flex-1 flex-col">
          <ResultsPanel
            variants={variants}
            selectedVariant={selectedVariant}
            starredVariant={starredVariant}
            result={result}
            copied={copied}
            productName={productName}
            tone={tone}
            onCopy={handleCopy}
            onExport={handleExport}
            onSelectVariant={setSelectedVariant}
            onStarVariant={handleStarVariant}
          />
        </div>
      </div>
    </div>
  )
}
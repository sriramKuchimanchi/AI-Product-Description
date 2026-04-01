import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import type { HistoryEntry } from '../types'
import { loadHistory, saveHistory, formatDate } from '../utils/storage'

export default function HistoryPage() {
  const navigate = useNavigate()
  const [history, setHistory] = useState<HistoryEntry[]>(loadHistory)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)

  function handleDelete(id: string) {
    const updated = history.filter(h => h.id !== id)
    setHistory(updated)
    saveHistory(updated)
    if (expanded === id) setExpanded(null)
  }

  function handleClear() {
    setHistory([])
    saveHistory([])
    setExpanded(null)
  }

  function handleCopy(text: string, key: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key)
      setTimeout(() => setCopied(null), 2000)
    })
  }

  function handleLoadInApp(entry: HistoryEntry) {
    navigate('/app', {
      state: {
        productName: entry.productName,
        productDetails: '',
        keywords: '',
        tone: entry.tone,
        prefillResult: entry
      }
    })
  }

  const TONE_COLORS: Record<string, string> = {
    professional: 'bg-blue-50 border-blue-200 text-blue-700',
    casual: 'bg-green-50 border-green-200 text-green-700',
    luxury: 'bg-purple-50 border-purple-200 text-purple-700',
    playful: 'bg-yellow-50 border-yellow-200 text-yellow-700',
    minimalist: 'bg-gray-100 border-gray-200 text-gray-600'
  }

  return (
    <div className="min-h-screen bg-gray-50 font-['DM_Sans',sans-serif]">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');`}</style>
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 pt-24 pb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Generation History</h1>
            <p className="text-gray-400 text-sm mt-1">
              {history.length} saved {history.length === 1 ? 'result' : 'results'}
            </p>
          </div>
          {history.length > 0 && (
            <button
              onClick={handleClear}
              className="text-xs text-red-500 hover:text-red-700 border border-red-200 hover:border-red-300 rounded-lg px-4 py-2 transition-all cursor-pointer bg-white"
            >
              Clear all
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-16 text-center">
            <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-2xl mx-auto mb-4">◷</div>
            <p className="text-gray-400 text-sm mb-2">No history yet</p>
            <p className="text-gray-300 text-xs mb-6">Your generated descriptions will appear here</p>
            <button
              onClick={() => navigate('/app')}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-5 py-2.5 rounded-lg transition-all cursor-pointer"
            >
              Generate your first description →
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {history.map(entry => (
              <div key={entry.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <div
                  className="px-6 py-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => setExpanded(expanded === entry.id ? null : entry.id)}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full border capitalize shrink-0 ${TONE_COLORS[entry.tone] ?? 'bg-gray-100 border-gray-200 text-gray-600'}`}>
                      {entry.tone}
                    </span>
                    <p className="text-gray-800 text-sm font-medium truncate">{entry.productName}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 ml-4">
                    <span className="text-gray-300 text-xs">{formatDate(entry.createdAt)}</span>
                    <span className={`text-gray-400 text-sm transition-transform ${expanded === entry.id ? 'rotate-180' : ''}`}>▾</span>
                  </div>
                </div>

                {expanded === entry.id && (
                  <div className="border-t border-gray-100 px-6 py-5 flex flex-col gap-4 bg-gray-50">
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Description</p>
                      <p className="text-gray-700 text-sm leading-relaxed">{entry.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1.5">SEO Title</p>
                        <p className="text-gray-600 text-xs">{entry.seoTitle}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1.5">Meta Description</p>
                        <p className="text-gray-600 text-xs">{entry.metaDescription}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Keywords</p>
                      <div className="flex flex-wrap gap-2">
                        {entry.suggestedKeywords.map(kw => (
                          <span key={kw} className="bg-blue-50 border border-blue-200 text-blue-700 text-xs px-2.5 py-1 rounded-full">
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => handleCopy(entry.description, entry.id)}
                        className="text-xs text-gray-500 hover:text-gray-800 border border-gray-200 hover:border-gray-300 bg-white rounded-lg px-3 py-2 transition-all cursor-pointer"
                      >
                        {copied === entry.id ? '✓ Copied' : 'Copy description'}
                      </button>
                      <button
                        onClick={() => handleLoadInApp(entry)}
                        className="text-xs text-blue-600 hover:text-blue-700 border border-blue-200 hover:border-blue-300 bg-white rounded-lg px-3 py-2 transition-all cursor-pointer"
                      >
                        Open in App →
                      </button>
                      <button
                        onClick={() => handleDelete(entry.id)}
                        className="ml-auto text-xs text-red-400 hover:text-red-600 border border-red-100 hover:border-red-200 bg-white rounded-lg px-3 py-2 transition-all cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

const FEATURES = [
  { icon: '✦', title: '3 Variants Instantly', description: 'Generate three distinct description variants in one click and pick the one that fits your brand best.' },
  { icon: '◎', title: 'SEO Built In', description: 'Every description ships with an SEO title, meta description, and five targeted keywords — ready to publish.' },
  { icon: '⚡', title: 'Competitive Analysis', description: 'Compare your copy against a competitor and get an AI breakdown of strengths, weaknesses, and who wins.' },
  { icon: '▣', title: 'Platform Formatter', description: 'Reformat any description for Amazon, Shopify, or Etsy with the correct structure for each platform automatically.' },
  { icon: '◷', title: 'Generation History', description: 'Every result is saved locally so you can revisit, reload, and export past generations anytime.' },
  { icon: '↓', title: 'One-Click Export', description: 'Export your chosen variant as a clean .txt file with all SEO fields included, ready to hand off.' }
]

const STEPS = [
  { number: '01', title: 'Describe your product', description: 'Enter your product name, key features, and any SEO keywords you want included.' },
  { number: '02', title: 'Choose a tone', description: 'Pick from Professional, Casual, Luxury, Playful, or Minimalist to match your brand voice.' },
  { number: '03', title: 'Generate 3 variants', description: 'The AI generates three unique descriptions with SEO titles, meta descriptions, and keywords.' },
  { number: '04', title: 'Pick, format, export', description: 'Star your favourite, reformat it for your platform, and export it — all in under 30 seconds.' }
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-['DM_Sans',sans-serif]">
      <Navbar />

      <section className="relative pt-36 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-blue-100/80 blur-3xl" />
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(148,163,184,0.2) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="fade-up fade-up-1 inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-1.5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" style={{ animation: 'pulse-slow 2s ease-in-out infinite' }} />
            <span className="text-blue-600 text-xs font-medium">AI-powered · SEO-ready · Multi-platform</span>
          </div>

          <h1 className="fade-up fade-up-2 text-5xl md:text-6xl font-bold tracking-tight leading-tight mb-6 text-slate-900" style={{ fontFamily: "'DM Serif Display', serif" }}>
            Product copy that{' '}
            <span className="italic text-blue-600">converts</span>,
            <br />written in seconds.
          </h1>

          <p className="fade-up fade-up-3 text-slate-500 text-lg leading-relaxed max-w-xl mx-auto mb-10">
            Describe your product, pick a tone, and get three SEO-optimised descriptions with titles, meta tags, and keywords — instantly.
          </p>

          <div className="fade-up fade-up-4 flex items-center justify-center gap-4 flex-wrap">
            <Link to="/app" className="bg-blue-600 hover:bg-blue-700 text-gray-900 font-semibold px-8 py-3.5 rounded-xl transition-all text-sm shadow-lg shadow-blue-200 active:scale-[0.98]">
              Try it now →
            </Link>
            <Link to="/templates" className="text-slate-500 hover:text-slate-800 text-sm font-medium transition-colors border border-slate-200 hover:border-slate-300 px-6 py-3.5 rounded-xl bg-white">
              Browse templates
            </Link>
          </div>
        </div>

        <div className="relative max-w-3xl mx-auto mt-20 fade-up fade-up-4">
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xl shadow-slate-200/60">
            <div className="px-5 py-3.5 border-b border-slate-100 flex items-center gap-2 bg-slate-50">
              <div className="w-3 h-3 rounded-full bg-slate-200" />
              <div className="w-3 h-3 rounded-full bg-slate-200" />
              <div className="w-3 h-3 rounded-full bg-slate-200" />
              <span className="text-slate-400 text-xs ml-2">localhost:5173/app</span>
            </div>
            <div className="p-6 grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                  <p className="text-slate-400 text-xs mb-1.5 uppercase tracking-widest">Product Name</p>
                  <p className="text-slate-700 text-sm">Wireless Noise-Cancelling Headphones</p>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                  <p className="text-slate-400 text-xs mb-1.5 uppercase tracking-widest">Tone</p>
                  <div className="flex gap-2">
                    {['Professional', 'Casual', 'Luxury'].map((t, i) => (
                      <span key={t} className={`text-xs px-2 py-1 rounded-md border ${i === 0 ? 'bg-blue-600 border-blue-500 text-gray-900' : 'bg-white border-slate-200 text-slate-400'}`}>{t}</span>
                    ))}
                  </div>
                </div>
                <div className="bg-blue-600 rounded-lg p-3 text-center">
                  <p className="text-gray-900 text-sm font-semibold">✦ Generate 3 Variants</p>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                {['Variant 1', 'Variant 2', 'Variant 3'].map((v, i) => (
                  <div key={v} className={`rounded-lg p-3 border ${i === 0 ? 'bg-blue-50 border-blue-200' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs text-slate-400 uppercase tracking-widest">{v}</span>
                      {i === 0 && <span className="text-yellow-500 text-xs">★</span>}
                    </div>
                    <div className="space-y-1">
                      <div className="h-1.5 bg-slate-200 rounded-full w-full" />
                      <div className="h-1.5 bg-slate-200 rounded-full w-4/5" />
                      <div className="h-1.5 bg-slate-200 rounded-full w-3/5" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 border-t border-slate-200 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-blue-600 text-xs font-semibold uppercase tracking-widest mb-3">Features</p>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900" style={{ fontFamily: "'DM Serif Display', serif" }}>
              Everything you need to write better copy
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((f) => (
              <div key={f.title} className="bg-slate-50 border border-slate-200 rounded-xl p-6 hover:border-blue-200 hover:bg-blue-50/30 transition-all group">
                <div className="w-9 h-9 rounded-lg bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-600 text-base mb-4">
                  {f.icon}
                </div>
                <h3 className="text-slate-800 font-semibold text-sm mb-2">{f.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 border-t border-slate-200 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-blue-600 text-xs font-semibold uppercase tracking-widest mb-3">How it works</p>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900" style={{ fontFamily: "'DM Serif Display', serif" }}>
              From blank page to published copy in 4 steps
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {STEPS.map((step) => (
              <div key={step.number} className="flex gap-5 bg-white border border-slate-200 rounded-xl p-6">
                <span className="text-3xl font-bold text-slate-200 leading-none shrink-0" style={{ fontFamily: "'DM Serif Display', serif" }}>
                  {step.number}
                </span>
                <div>
                  <h3 className="text-slate-800 font-semibold text-sm mb-1.5">{step.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 py-8 px-6 bg-white">
        <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap gap-4">
         
         
          <p className="text-slate-300 text-xs">© 2025 Product Copy AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
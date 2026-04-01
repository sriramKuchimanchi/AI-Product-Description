import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import type { ToneKey } from '../types'

interface Template {
  id: string; industry: string; icon: string; productName: string
  productDetails: string; keywords: string; tone: ToneKey
  color: string; borderColor: string; iconBg: string; textColor: string
}

const TEMPLATES: Template[] = [
  { id: 'fashion-jacket', industry: 'Fashion', icon: '👗', productName: 'Oversized Vintage Denim Jacket', productDetails: 'Unisex oversized denim jacket with a washed vintage finish, dual chest pockets, button-down front, and ribbed cuffs. Made from 100% heavyweight cotton denim. Available in light wash, dark wash, and black. Perfect for layering over hoodies or dresses.', keywords: 'vintage denim jacket, oversized jacket, unisex streetwear', tone: 'casual', color: 'bg-pink-50 border-pink-200', borderColor: 'border-pink-200', iconBg: 'bg-pink-100', textColor: 'text-pink-600' },
  { id: 'tech-earbuds', industry: 'Tech', icon: '🎧', productName: 'ProBuds X3 Wireless Earbuds', productDetails: 'True wireless earbuds with 12mm dynamic drivers, active noise cancellation, 32-hour total battery life with case, IPX5 water resistance, touch controls, and multipoint Bluetooth 5.3 connection. Includes 3 ear tip sizes. Latency under 60ms for gaming.', keywords: 'wireless earbuds, noise cancelling, true wireless', tone: 'professional', color: 'bg-blue-50 border-blue-200', borderColor: 'border-blue-200', iconBg: 'bg-blue-100', textColor: 'text-blue-600' },
  { id: 'food-granola', industry: 'Food', icon: '🌾', productName: 'Wild Oat Honey & Almond Granola', productDetails: 'Small-batch granola made with whole rolled oats, raw wildflower honey, toasted almonds, pumpkin seeds, and a hint of cinnamon. No refined sugar, no preservatives, gluten-free certified. Baked in small batches for maximum crunch. 400g resealable pouch.', keywords: 'healthy granola, gluten free breakfast, artisan granola', tone: 'playful', color: 'bg-yellow-50 border-yellow-200', borderColor: 'border-yellow-200', iconBg: 'bg-yellow-100', textColor: 'text-yellow-700' },
  { id: 'fitness-mat', industry: 'Fitness', icon: '🧘', productName: 'CoreGrip 6mm Yoga & Pilates Mat', productDetails: 'Non-slip yoga mat with 6mm cushioning, natural tree rubber base, alignment guide lines printed on surface, moisture-wicking microfibre top layer, and carrying strap included. Dimensions 183cm x 68cm. Suitable for yoga, pilates, stretching, and HIIT.', keywords: 'yoga mat, non slip mat, pilates mat, exercise mat', tone: 'minimalist', color: 'bg-green-50 border-green-200', borderColor: 'border-green-200', iconBg: 'bg-green-100', textColor: 'text-green-600' },
  { id: 'beauty-serum', industry: 'Beauty', icon: '✨', productName: 'Lumière Vitamin C Brightening Serum', productDetails: '15% stabilised Vitamin C serum with hyaluronic acid, niacinamide, and ferulic acid. Targets dark spots, uneven skin tone, and dullness. Fragrance-free, dermatologist-tested, suitable for all skin types including sensitive. 30ml glass dropper bottle.', keywords: 'vitamin c serum, brightening serum, anti dark spot', tone: 'luxury', color: 'bg-purple-50 border-purple-200', borderColor: 'border-purple-200', iconBg: 'bg-purple-100', textColor: 'text-purple-600' },
  { id: 'home-lamp', industry: 'Home', icon: '💡', productName: 'ArcForm Adjustable Arc Floor Lamp', productDetails: 'Modern arc floor lamp with a 360° adjustable arm, linen drum shade, weighted marble base, and inline dimmer switch. Compatible with E27 bulbs up to 60W. Height adjustable from 140cm to 190cm. Available in matte black and brushed brass finishes.', keywords: 'arc floor lamp, modern floor lamp, living room lighting', tone: 'professional', color: 'bg-orange-50 border-orange-200', borderColor: 'border-orange-200', iconBg: 'bg-orange-100', textColor: 'text-orange-600' },
  { id: 'pet-harness', industry: 'Pets', icon: '🐾', productName: 'SafeWalk No-Pull Dog Harness', productDetails: 'No-pull dog harness with front and back leash clips, padded chest plate, reflective stitching for night visibility, and quick-release buckles. Machine washable. Adjustable at 4 points for a custom fit. Available in XS to XL. Suitable for all breeds.', keywords: 'no pull dog harness, dog harness, reflective dog harness', tone: 'casual', color: 'bg-teal-50 border-teal-200', borderColor: 'border-teal-200', iconBg: 'bg-teal-100', textColor: 'text-teal-600' },
  { id: 'stationery-planner', industry: 'Stationery', icon: '📓', productName: 'Structured Weekly Planner 2025', productDetails: 'Hardcover weekly planner with monthly overview spreads, weekly layouts with time blocks, habit tracker, notes pages, and a ribbon bookmark. 320 pages, A5 size, lay-flat binding. Printed on 90gsm cream paper. Available in slate, sage, and terracotta covers.', keywords: 'weekly planner, productivity planner, 2025 planner', tone: 'minimalist', color: 'bg-rose-50 border-rose-200', borderColor: 'border-rose-200', iconBg: 'bg-rose-100', textColor: 'text-rose-600' }
]

const FILTERS = ['All', 'Fashion', 'Tech', 'Food', 'Fitness', 'Beauty', 'Home', 'Pets', 'Stationery']

export interface TemplateState { productName: string; productDetails: string; keywords: string; tone: ToneKey }

export default function TemplatesPage() {
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState('All')

  function handleUseTemplate(template: Template) {
    navigate('/app', { state: { productName: template.productName, productDetails: template.productDetails, keywords: template.keywords, tone: template.tone } })
  }

  const filtered = activeFilter === 'All' ? TEMPLATES : TEMPLATES.filter(t => t.industry === activeFilter)

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-['DM_Sans',sans-serif]">
      <Navbar />
      <div className="pt-14 max-w-5xl mx-auto px-6 py-10">
        <div className="mb-8 text-center">
         
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 mt-3 mb-2" style={{ fontFamily: "'DM Serif Display', serif" }}>Start from a real product</h1>
          <p className="text-slate-500 text-sm">Click any template to auto-fill the app and start generating immediately.</p>
        </div>

        <div className="flex items-center gap-2 flex-wrap justify-center mb-8">
          {FILTERS.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                activeFilter === f ? 'bg-blue-600 border-blue-500 text-gray-900' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
              }`}>{f}</button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(template => (
            <div key={template.id} onClick={() => handleUseTemplate(template)}
              className={`group relative bg-white border ${template.borderColor} hover:shadow-md rounded-2xl p-6 flex flex-col gap-4 transition-all cursor-pointer`}>
              <div className="flex items-start justify-between">
                <div className={`w-10 h-10 rounded-xl ${template.iconBg} border ${template.borderColor} flex items-center justify-center text-xl`}>
                  {template.icon}
                </div>
                <span className={`text-xs font-medium ${template.textColor} bg-white border ${template.borderColor} rounded-full px-2.5 py-1`}>{template.industry}</span>
              </div>
              <div>
                <h3 className="text-slate-800 font-semibold text-sm mb-1.5 leading-snug">{template.productName}</h3>
                <p className="text-slate-400 text-xs leading-relaxed line-clamp-3">{template.productDetails}</p>
              </div>
              <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <span className={`text-xs capitalize ${template.textColor}`}>{template.tone} tone</span>
                </div>
                <span className="text-xs font-semibold text-slate-400 group-hover:text-blue-600 transition-colors">Use →</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="border-t border-slate-200 py-8 px-6 bg-white mt-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center text-xs font-bold text-gray-900">AI</div>
            <span className="text-slate-500 text-xs">Product Copy AI</span>
          </div>
          <p className="text-slate-300 text-xs">© 2025 Product Copy AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
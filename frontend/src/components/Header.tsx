export default function Header() {
  return (
    <div className="px-8 py-6 border-b border-gray-200 bg-white">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-sm font-bold text-white">
          AI
        </div>
        <div>
          <span className="text-gray-900 font-semibold tracking-tight text-base">Product Copy AI</span>
          <p className="text-gray-400 text-xs mt-0.5">Generate SEO-ready product descriptions instantly</p>
        </div>
      </div>
    </div>
  )
}
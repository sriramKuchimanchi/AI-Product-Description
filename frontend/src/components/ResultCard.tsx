interface ResultCardProps {
  label: string
  content: string
  onCopy: () => void
  copied: boolean
}

export default function ResultCard({ label, content, onCopy, copied }: ResultCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
          {label}
        </span>
        <button
          onClick={onCopy}
          className="text-xs text-gray-400 hover:text-gray-700 border border-gray-200 hover:border-gray-300 rounded-lg px-3 py-1 transition-all cursor-pointer"
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
      <p className="text-gray-700 text-sm leading-relaxed">{content}</p>
    </div>
  )
}
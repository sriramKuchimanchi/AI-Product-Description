import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation()

  const linkClass = (path: string) =>
    `text-sm transition-colors ${
      location.pathname === path
        ? 'text-gray-900 font-semibold'
        : 'text-gray-500 hover:text-gray-800'
    }`

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 border-b border-gray-200 bg-white/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-xs font-bold text-white">
            AI
          </div>
          <span className="text-gray-900 font-semibold tracking-tight text-sm">Product Copy AI</span>
        </Link>

        <div className="flex items-center gap-7">
          <Link to="/" className={linkClass('/')}>Home</Link>
          <Link to="/templates" className={linkClass('/templates')}>Templates</Link>
          <Link to="/history" className={linkClass('/history')}>History</Link>
          <Link to="/compare" className={linkClass('/compare')}>Compare</Link>
          <Link to="/app" className={linkClass('/app')}>App</Link>
        </div>
      </div>
    </nav>
  )
}
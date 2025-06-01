'use client'

import LanguageSelector from './LanguageSelector'

export default function Header() {
  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-orange-600">Alê</span>
            <span className="ml-2 text-gray-700">Assistant</span>
          </div>
          
          <LanguageSelector />
        </div>
      </div>
    </header>
  )
}
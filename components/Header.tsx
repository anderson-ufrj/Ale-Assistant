'use client'

import { useTranslations, useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { useState } from 'react'

export default function Header() {
  const t = useTranslations('languages')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const languages = [
    { code: 'pt', name: t('pt') },
    { code: 'en', name: t('en') },
    { code: 'es', name: t('es') }
  ]

  const handleLanguageChange = (newLocale: string) => {
    const path = pathname.replace(`/${locale}`, `/${newLocale}`)
    router.push(path)
    setIsOpen(false)
  }

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-orange-600">Alê</span>
            <span className="ml-2 text-gray-700">Assistant</span>
          </div>
          
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center space-x-2 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <span className="text-lg">🌐</span>
              <span>{languages.find(l => l.code === locale)?.name}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                      locale === lang.code ? 'bg-orange-50 text-orange-600' : 'text-gray-700'
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
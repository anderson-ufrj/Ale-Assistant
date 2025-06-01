'use client'

import { useTranslations, useLocale } from 'next-intl'
import Image from 'next/image'
import { getBuildingsWithFallback } from '@/lib/imageConfig'

export default function HeroWithImages() {
  const t = useTranslations('home')
  const locale = useLocale()
  const buildings = getBuildingsWithFallback(locale)
  
  // Main hero building (first in array)
  const heroBuilding = buildings[0]
  // Secondary buildings for grid (remaining)
  const gridBuildings = buildings.slice(1, 5)
  
  return (
    <section className="relative min-h-screen flex items-center px-4 md:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-orange-50">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-gradient-to-br from-emerald-400 to-green-500 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Clean Text Content */}
          <div className="space-y-8">

            {/* Clean Headlines */}
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                {t('title')}
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                {t('subtitle')}
              </p>
            </div>

            {/* Single CTA */}
            <div>
              <button 
                onClick={() => {
                  const aleButton = document.querySelector('[data-ale-trigger]') as HTMLButtonElement
                  if (aleButton) aleButton.click()
                }}
                className="group relative overflow-hidden bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 text-white px-10 py-5 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-110 transform animate-pulse hover:animate-none border-2 border-orange-400/30"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center gap-3">
                  <span className="text-2xl animate-bounce">💬</span>
                  <span>Fale com Alê agora!</span>
                  <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </button>
              
              <div className="mt-4 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-1 text-sm text-green-600 font-medium">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Online agora
                </span>
                <span className="text-sm text-gray-500">• ✓ Sem compromisso</span>
                <span className="text-sm text-gray-500">• ✓ LGPD Compliant</span>
              </div>
            </div>
          </div>

          {/* Clean Visual Layout */}
          <div className="relative h-[600px] hidden lg:block">
            
            {/* Main Hero Image */}
            <div className="absolute top-0 right-0 w-full h-full rounded-3xl overflow-hidden shadow-xl group">
              <Image
                src={heroBuilding.src}
                alt={`${heroBuilding.title} - ${heroBuilding.location}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="600px"
                priority
              />
              
              {/* Simple Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              
              {/* Clean Info Card */}
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <h3 className="font-bold text-gray-900">{heroBuilding.title}</h3>
                <p className="text-sm text-gray-600">{heroBuilding.architect} • {heroBuilding.year}</p>
              </div>
            </div>


          </div>
        </div>
      </div>
    </section>
  )
}
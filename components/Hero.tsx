

'use client'

import { useTranslations, useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { getBuildingsWithFallback } from '@/lib/imageConfig'

interface HeroProps {
  variant?: 'simple' | 'with-images' | 'modern'
  showCta?: boolean
}

export default function Hero({ variant = 'with-images', showCta = true }: HeroProps) {
  const t = useTranslations('home')
  const locale = useLocale()
  const buildings = getBuildingsWithFallback(locale)
  
  const heroBuilding = buildings[0]
  
  if (variant === 'simple') {
    return (
      <section className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            {t('title')}
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
          <div className="mt-12">
            <div className="w-64 h-64 mx-auto bg-gradient-to-br from-orange-400 to-orange-600 rounded-full opacity-20 animate-pulse"></div>
          </div>
        </div>
      </section>
    )
  }

  if (variant === 'modern') {
    return (
      <section className="relative min-h-screen flex items-center px-4 md:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-3 gap-2 opacity-10">
          {buildings.slice(0, 3).map((building, index) => (
            <div key={index} className="relative h-full">
              <Image
                src={building.src}
                alt={building.title}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                {t('title')}
              </h1>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                {t('subtitle')}
              </p>
              {showCta && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => {
                    const aleButton = document.querySelector('[data-ale-trigger]') as HTMLButtonElement
                    if (aleButton) aleButton.click()
                  }}
                >
                  Saiba mais sobre compliance
                </motion.button>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-[600px] hidden lg:block"
            >
              <div className="absolute top-0 right-0 w-72 h-72 rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/brazil/architect.jpg"
                  alt="Arquiteto trabalhando"
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="absolute bottom-20 left-0 w-64 h-64 rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/brazil/architectoncomputer.webp"
                  alt="Arquiteto no computador"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="absolute top-40 left-32 w-48 h-48 rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src={buildings[3]?.src || "/images/brazil/Church-of-Saint-Francis-of-Assisi-Igreja-de-Sao-Francisco-de-Assis-28.5.2024.jpg"}
                  alt="Igreja da Pampulha"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="absolute -bottom-4 right-20 w-32 h-32 bg-orange-500 rounded-full opacity-20 blur-2xl"></div>
              <div className="absolute top-20 -left-10 w-40 h-40 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
            </motion.div>
          </div>
        </div>
      </section>
    )
  }

  // Default: with-images variant
  return (
    <section className="relative min-h-screen flex items-center px-4 md:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-orange-50">
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-gradient-to-br from-emerald-400 to-green-500 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                {t('title')}
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                {t('subtitle')}
              </p>
            </div>

            {showCta && (
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
                    <span>{t('cta').replace('💬 ', '')}</span>
                    <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </button>
                
                <div className="mt-4 flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-1 text-sm text-green-600 font-medium">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    {locale === 'en' ? 'Online now' : locale === 'es' ? 'En línea ahora' : 'Online agora'}
                  </span>
                  <span className="text-sm text-gray-500">• ✓ {locale === 'en' ? 'No commitment' : locale === 'es' ? 'Sin compromiso' : 'Sem compromisso'}</span>
                  <span className="text-sm text-gray-500">• ✓ {locale === 'en' ? 'Privacy compliant' : locale === 'es' ? 'Cumple con privacidad' : 'LGPD Compliant'}</span>
                </div>
              </div>
            )}
          </div>

          <div className="relative h-[600px] hidden lg:block">
            <div className="absolute top-0 right-0 w-full h-full rounded-3xl overflow-hidden shadow-xl group">
              <Image
                src={heroBuilding.src}
                alt={`${heroBuilding.title} - ${heroBuilding.location}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="600px"
                priority
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              
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
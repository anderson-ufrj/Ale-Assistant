


'use client'

import { useTranslations, useLocale } from 'next-intl'
import Image from 'next/image'
import { getBuildingsByLocale, getProfessionalImages } from '@/lib/imageConfig'
import { useEffect, useState } from 'react'

export default function RiskAlertSection() {
  const [mounted, setMounted] = useState(false)
  const t = useTranslations('riskAlert')
  const tExtra = useTranslations('riskAlertExtra')
  const locale = useLocale()
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) {
    return (
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-r from-red-50 to-orange-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 items-center">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative h-32 rounded-xl overflow-hidden shadow-lg bg-gray-200 animate-pulse"></div>
              <div className="relative h-32 rounded-xl overflow-hidden shadow-lg bg-gray-200 animate-pulse"></div>
              <div className="col-span-2 relative h-40 rounded-xl overflow-hidden shadow-lg bg-gray-200 animate-pulse"></div>
            </div>
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border-l-4 border-red-500">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                      <div className="w-8 h-8 bg-red-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <div className="h-8 bg-gray-200 rounded mb-3 animate-pulse"></div>
                    <div className="h-20 bg-gray-200 rounded mb-6 animate-pulse"></div>
                    <div className="h-12 bg-gray-200 rounded inline-block animate-pulse w-48"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
  
  // Get locale-specific buildings and professional images
  const buildings = getBuildingsByLocale(locale)
  const professionalImages = getProfessionalImages()
  
  // Select images based on locale
  const featuredBuilding = buildings[9] || buildings[0] // Palácio Itamaraty or fallback
  const heroImage = professionalImages.find(img => img.category === 'hero') || professionalImages[0]
  const engineerImage = professionalImages.find(img => img.category === 'engineer') || professionalImages[0]
  
  return (
    <section className="py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-r from-red-50 to-orange-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8 items-center">
          {/* Image Gallery */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative h-32 rounded-xl overflow-hidden shadow-lg">
              <Image
                src={featuredBuilding.src}
                alt={tExtra('altTexts.itamaraty')}
                fill
                className="object-cover"
                sizes="25vw"
              />
            </div>
            <div className="relative h-32 rounded-xl overflow-hidden shadow-lg">
              <Image
                src={heroImage?.src || '/images/brazil/Civil-Engineering-Hero-1600x900.jpg'}
                alt={tExtra('altTexts.engineering')}
                fill
                className="object-cover"
                sizes="25vw"
              />
            </div>
            <div className="col-span-2 relative h-40 rounded-xl overflow-hidden shadow-lg">
              <Image
                src={engineerImage?.src || '/images/brazil/civil-engineer.jpg'}
                alt={tExtra('altTexts.engineer')}
                fill
                className="object-cover"
                sizes="50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className="absolute bottom-3 left-3 text-white">
                <p className="text-sm font-medium">{tExtra('altTexts.professionals')}</p>
              </div>
            </div>
          </div>

          {/* Alert Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border-l-4 border-red-500">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                    {t('title')}
                  </h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {t('description')}
                  </p>
                  <button className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-3 rounded-lg transition-colors inline-flex items-center space-x-2">
                    <span>{t('button')}</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
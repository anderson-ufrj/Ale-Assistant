'use client'

import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import { getBuildingsByLocale, getProfessionalImages } from '@/lib/imageConfig'

export default function ArchitectureGallery() {
  const t = useTranslations('architecture.gallery')
  const locale = useLocale()
  
  // Get architecture images based on current locale
  const architectureImages = getBuildingsByLocale(locale)
  
  // Get professional images (these remain the same across all locales)
  const professionalImages = getProfessionalImages('architect')

  return (
    <section className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t('description')}
          </p>
        </div>

        {/* Image Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {architectureImages.slice(0, 6).map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={image.src}
                  alt={`${image.title} - ${image.architect}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{image.title}</h3>
                    <p className="text-sm opacity-90">{image.architect}</p>
                    <p className="text-xs opacity-75">{image.location} • {image.year}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section with Image */}
        <div className="mt-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl overflow-hidden">
          <div className="grid md:grid-cols-2 items-center">
            <div className="p-12 text-white">
              <h3 className="text-2xl font-bold mb-4">
                {t('cta.title')}
              </h3>
              <p className="mb-6 opacity-90">
                {t('cta.description')}
              </p>
              <button className="bg-white text-orange-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                {t('cta.button')}
              </button>
            </div>
            <div className="relative h-full min-h-[300px] md:min-h-[400px]">
              <Image
                src={professionalImages[2]?.src || '/images/brazil/archtectplanningoncomputer.jpg'}
                alt={t('altText')}
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
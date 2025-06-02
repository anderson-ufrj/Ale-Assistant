'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import { getBuildingsByLocale, getProfessionalImages } from '@/lib/imageConfig'

export default function BrazilianArchitectureSection() {
  const t = useTranslations('architecture.brazilian')
  const locale = useLocale()
  
  // Get architecture images based on current locale
  const architectureImages = getBuildingsByLocale(locale)
  
  // Get professional images (these remain the same across all locales)
  const professionalImages = getProfessionalImages('office')
  
  return (
    <section className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t('description')}
          </p>
        </motion.div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {architectureImages.slice(0, 6).map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden rounded-2xl shadow-lg"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={image.src}
                  alt={`${image.title} - ${image.architect}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{image.title}</h3>
                    <p className="text-sm opacity-90">{image.architect}</p>
                    <p className="text-xs opacity-75">{image.location} • {image.year}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Architects Working Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mt-20 grid md:grid-cols-2 gap-12 items-center"
        >
          <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src={professionalImages[0]?.src || '/images/brazil/studio.jpeg'}
              alt={t('altOffice')}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {t('professionals.title')}
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {t('professionals.description')}
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-orange-50 p-4 rounded-xl">
                <h4 className="font-semibold text-orange-900 mb-1">{t('professionals.stats.offices')}</h4>
                <p className="text-sm text-orange-700">{t('professionals.stats.officesLabel')}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-xl">
                <h4 className="font-semibold text-blue-900 mb-1">{t('professionals.stats.security')}</h4>
                <p className="text-sm text-blue-700">{t('professionals.stats.securityLabel')}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
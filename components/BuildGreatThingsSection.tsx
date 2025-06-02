'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import { getBuildingsWithFallback } from '@/lib/imageConfig'

export default function BuildGreatThingsSection() {
  const t = useTranslations('buildGreat')
  const locale = useLocale()
  const famousBuildings = getBuildingsWithFallback(locale)
  
  return (
    <section className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-emerald-50 via-green-50 to-amber-50 relative overflow-hidden">
      {/* Background Pattern - Organic Green */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-lime-300 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 bg-clip-text text-transparent">
            {t('title')}
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">
            {t('subtitle')}
          </h3>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            {t('description')}
          </p>
        </motion.div>

        {/* Buildings Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {famousBuildings.slice(0, 6).map((building, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm border border-orange-200/50 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={building.src}
                  alt={`${building.title} - ${building.architect}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-gray-900/10 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300"></div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h4 className="text-xl font-bold text-white mb-1">
                  {building.title}
                </h4>
                <p className="text-orange-400 font-medium mb-1">
                  {building.location}
                </p>
                <div className="flex justify-between items-center text-sm text-gray-300">
                  <span>{building.architect}</span>
                  <span>{building.year}</span>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-orange-500/20 to-orange-600/20 backdrop-blur-sm border border-orange-400/30 rounded-3xl p-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
              {t('cta.title')}
            </h3>
            <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
              {t('cta.description')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const aleButton = document.querySelector('[data-ale-trigger]') as HTMLButtonElement
                  if (aleButton) aleButton.click()
                }}
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {t('cta.button')}
              </motion.button>
              
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span>{t('cta.features.legal')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <span>{t('cta.features.support')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                  <span>{t('cta.features.updates')}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
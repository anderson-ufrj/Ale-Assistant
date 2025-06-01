'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function HeroSectionNew() {
  const t = useTranslations('home')
  
  return (
    <section className="relative min-h-screen flex items-center px-4 md:px-6 lg:px-8 overflow-hidden">
      {/* Background Images Grid */}
      <div className="absolute inset-0 grid grid-cols-3 gap-2 opacity-10">
        <div className="relative h-full">
          <Image
            src="/images/brazil/Niteroi-Contemporary-Art-Museum-Museu-de-Arte-Contemporanea-de-Niteroi-28.5.2024.jpg"
            alt="Museu de Arte Contemporânea de Niterói"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative h-full">
          <Image
            src="/images/brazil/Museum-of-Tomorrow-Museu-do-Amanha-28.5.2024.jpg"
            alt="Museu do Amanhã"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative h-full">
          <Image
            src="/images/brazil/Brazilian-Congress-Building-Palacio-do-Congresso-Nacional-28.5.2024.jpg"
            alt="Congresso Nacional"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
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
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Saiba mais sobre compliance
            </motion.button>
          </motion.div>

          {/* Image Collage */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[600px] hidden lg:block"
          >
            {/* Main Image */}
            <div className="absolute top-0 right-0 w-72 h-72 rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/brazil/architect.jpg"
                alt="Arquiteto trabalhando"
                fill
                className="object-cover"
              />
            </div>
            
            {/* Secondary Image */}
            <div className="absolute bottom-20 left-0 w-64 h-64 rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/brazil/architectoncomputer.webp"
                alt="Arquiteto no computador"
                fill
                className="object-cover"
              />
            </div>

            {/* Accent Image */}
            <div className="absolute top-40 left-32 w-48 h-48 rounded-3xl overflow-hidden shadow-xl">
              <Image
                src="/images/brazil/Church-of-Saint-Francis-of-Assisi-Igreja-de-Sao-Francisco-de-Assis-28.5.2024.jpg"
                alt="Igreja da Pampulha"
                fill
                className="object-cover"
              />
            </div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-4 right-20 w-32 h-32 bg-orange-500 rounded-full opacity-20 blur-2xl"></div>
            <div className="absolute top-20 -left-10 w-40 h-40 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
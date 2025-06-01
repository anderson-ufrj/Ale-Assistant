'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

const architectureImages = [
  {
    src: '/images/brazil/Catedral-Metropolitana-Nossa-Senhora-Aparecida-Cathedral-of-Brasilia-28.5.2024.jpg',
    title: 'Catedral de Brasília',
    architect: 'Oscar Niemeyer'
  },
  {
    src: '/images/brazil/Museum-of-Tomorrow-Museu-do-Amanha-28.5.2024.jpg',
    title: 'Museu do Amanhã',
    architect: 'Santiago Calatrava'
  },
  {
    src: '/images/brazil/Niteroi-Contemporary-Art-Museum-Museu-de-Arte-Contemporanea-de-Niteroi-28.5.2024.jpg',
    title: 'MAC Niterói',
    architect: 'Oscar Niemeyer'
  },
  {
    src: '/images/brazil/Brazilian-Congress-Building-Palacio-do-Congresso-Nacional-28.5.2024.jpg',
    title: 'Congresso Nacional',
    architect: 'Oscar Niemeyer'
  },
  {
    src: '/images/brazil/Palacio-Itamaraty-28.5.2024-.jpg',
    title: 'Palácio Itamaraty',
    architect: 'Oscar Niemeyer'
  },
  {
    src: '/images/brazil/Church-of-Saint-Francis-of-Assisi-Igreja-de-Sao-Francisco-de-Assis-28.5.2024.jpg',
    title: 'Igreja da Pampulha',
    architect: 'Oscar Niemeyer'
  }
]

export default function BrazilianArchitectureSection() {
  const t = useTranslations('architecture')
  
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
            Inspiração na Arquitetura Moderna Brasileira
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Assim como a arquitetura brasileira revolucionou o mundo com suas formas orgânicas e inovadoras, 
            ajudamos você a construir uma base sólida e legal para seu trabalho criativo.
          </p>
        </motion.div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {architectureImages.map((image, index) => (
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
                  alt={image.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{image.title}</h3>
                    <p className="text-sm opacity-90">{image.architect}</p>
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
              src="/images/brazil/studio.jpeg"
              alt="Escritório de arquitetura"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Profissionais que Constroem o Futuro
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Arquitetos e engenheiros brasileiros estão entre os mais criativos e inovadores do mundo. 
              Para manter essa excelência, é fundamental trabalhar com ferramentas legalizadas que 
              garantam segurança, suporte e atualizações constantes.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-orange-50 p-4 rounded-xl">
                <h4 className="font-semibold text-orange-900 mb-1">+5.000</h4>
                <p className="text-sm text-orange-700">Escritórios regularizados</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-xl">
                <h4 className="font-semibold text-blue-900 mb-1">100%</h4>
                <p className="text-sm text-blue-700">Segurança jurídica</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
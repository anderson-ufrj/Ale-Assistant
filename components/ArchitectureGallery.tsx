'use client'

import Image from 'next/image'

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
    src: '/images/brazil/Church-of-Saint-Francis-of-Assisi-Igreja-de-Sao-Francisco-de-Assis-28.5.2024.jpg',
    title: 'Igreja da Pampulha',
    architect: 'Oscar Niemeyer'
  },
  {
    src: '/images/brazil/studio.jpeg',
    title: 'Escritório Moderno',
    architect: 'Arquitetura Contemporânea'
  }
]

export default function ArchitectureGallery() {
  return (
    <section className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Inspiração na Arquitetura Moderna Brasileira
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Assim como os grandes mestres da arquitetura brasileira revolucionaram o mundo com suas formas orgânicas e inovadoras, 
            ajudamos você a construir uma base sólida e legal para seu trabalho criativo.
          </p>
        </div>

        {/* Image Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {architectureImages.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{image.title}</h3>
                    <p className="text-sm opacity-90">{image.architect}</p>
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
                Trabalhe com Tranquilidade
              </h3>
              <p className="mb-6 opacity-90">
                Arquitetos e engenheiros que utilizam software licenciado têm acesso a recursos exclusivos, 
                suporte técnico e atualizações constantes que potencializam sua criatividade.
              </p>
              <button className="bg-white text-orange-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                Regularize Agora
              </button>
            </div>
            <div className="relative h-full min-h-[300px] md:min-h-[400px]">
              <Image
                src="/images/brazil/archtectplanningoncomputer.jpg"
                alt="Arquiteto planejando no computador"
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
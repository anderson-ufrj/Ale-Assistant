import { useTranslations } from 'next-intl'
import Image from 'next/image'

export default function ComplianceSection() {
  const t = useTranslations('compliance')
  
  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: t('features.legal.title'),
      description: t('features.legal.description')
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: t('features.security.title'),
      description: t('features.security.description')
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      title: t('features.reputation.title'),
      description: t('features.reputation.description')
    }
  ]
  
  return (
    <section className="py-16 px-4 md:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t('description')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 text-orange-600">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        
        {/* Image Gallery Section */}
        <div className="mt-20 grid md:grid-cols-2 gap-12 items-center">
          <div className="grid grid-cols-2 gap-4">
            {/* Igreja da Pampulha - Imagem alternativa */}
            <div className="col-span-2 relative h-64 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/brazil/igreja-pampulha-780x520.jpg"
                alt="Igreja da Pampulha - Visão Externa"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h4 className="text-lg font-bold">Igreja da Pampulha</h4>
                <p className="text-sm opacity-90">Patrimônio Mundial UNESCO</p>
              </div>
            </div>
            
            {/* Secondary Images */}
            <div className="relative h-32 rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/images/brazil/architectoncomputer.webp"
                alt="Arquiteto no computador"
                fill
                className="object-cover"
                sizes="25vw"
              />
            </div>
            <div className="relative h-32 rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/images/brazil/studio.jpeg"
                alt="Escritório de arquitetura"
                fill
                className="object-cover"
                sizes="25vw"
              />
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Tradição e Inovação da Arquitetura Brasileira
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Desde a Igreja da Pampulha de Niemeyer até os escritórios modernos de hoje, 
              a arquitetura brasileira sempre se destacou pela criatividade e inovação. 
              Para manter essa excelência, é fundamental trabalhar com ferramentas legalizadas.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-orange-50 p-4 rounded-xl">
                <h4 className="font-semibold text-orange-900 mb-1">80+ anos</h4>
                <p className="text-sm text-orange-700">De tradição arquitetônica</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-xl">
                <h4 className="font-semibold text-blue-900 mb-1">Vanguarda</h4>
                <p className="text-sm text-blue-700">Mundial em design</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-8 py-3 rounded-lg transition-colors inline-flex items-center space-x-2">
            <span>{t('learnMore')}</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
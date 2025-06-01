import { useTranslations } from 'next-intl'

export default function SketchUpComplianceSection() {
  const t = useTranslations('sketchup')
  
  const risks = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: t('risks.financial.title'),
      description: t('risks.financial.description'),
      highlight: "R$ 5.000 a R$ 20.000"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
        </svg>
      ),
      title: t('risks.legal.title'),
      description: t('risks.legal.description'),
      highlight: t('risks.legal.highlight')
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      title: t('risks.professional.title'),
      description: t('risks.professional.description'),
      highlight: t('risks.professional.highlight')
    }
  ]

  const benefits = [
    {
      title: t('benefits.support'),
      icon: "🛡️"
    },
    {
      title: t('benefits.updates'),
      icon: "🔄"
    },
    {
      title: t('benefits.cloud'),
      icon: "☁️"
    },
    {
      title: t('benefits.certification'),
      icon: "📜"
    }
  ]

  return (
    <section className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-white to-orange-50 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-5">
        <img 
          src="/images/brazil/archtectplanningoncomputer.jpg" 
          alt="Arquiteto trabalhando"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header with curved design inspired by Niemeyer */}
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 flex items-center justify-center opacity-5">
            <div className="w-96 h-96 rounded-full bg-orange-500"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 relative">
            {t('title')}
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed relative">
            {t('subtitle')}
          </p>
        </div>

        {/* ITCA Warning */}
        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-100 rounded-full -mr-16 -mt-16 opacity-50"></div>
          <div className="relative">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-red-900 mb-2">{t('itca.title')}</h3>
                <p className="text-red-800 leading-relaxed">{t('itca.description')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Risk Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {risks.map((risk, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50 rounded-full -mr-12 -mt-12"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 text-orange-600">
                  {risk.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {risk.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {risk.description}
                </p>
                <div className="text-orange-600 font-bold text-lg">
                  {risk.highlight}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -ml-32 -mt-32"></div>
          <div className="relative">
            <h3 className="text-3xl font-bold mb-8 text-center">{t('benefits.title')}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl mb-3">{benefit.icon}</div>
                  <p className="font-medium">{benefit.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <p className="text-2xl text-gray-700 mb-6">
            {t('cta.text')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
              {t('cta.button')}
            </button>
            <p className="text-gray-600">
              {t('cta.hours')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
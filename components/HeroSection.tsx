import { useTranslations } from 'next-intl'

export default function HeroSection() {
  const t = useTranslations('home')
  
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
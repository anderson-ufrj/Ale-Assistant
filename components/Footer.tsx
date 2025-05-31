import { useTranslations } from 'next-intl'

export default function Footer() {
  const t = useTranslations('footer')
  
  return (
    <footer className="w-full bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <p className="text-center text-sm text-gray-600">
          {t('text')}
        </p>
      </div>
    </footer>
  )
}
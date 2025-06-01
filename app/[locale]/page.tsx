import dynamic from 'next/dynamic'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Footer from '@/components/Footer'

// Lazy load heavy components
const ArchitectureGallery = dynamic(() => import('@/components/ArchitectureGallery'), {
  loading: () => <div className="min-h-[400px] flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div></div>
})

const BuildGreatThingsSection = dynamic(() => import('@/components/BuildGreatThingsSection'))
const SketchUpComplianceSection = dynamic(() => import('@/components/SketchUpComplianceSection'))
const ComplianceSection = dynamic(() => import('@/components/ComplianceSection'))
const RiskAlertSection = dynamic(() => import('@/components/RiskAlertSection'))

// Lazy load chatbot with no SSR
const Chatbot = dynamic(() => import('@/components/Chatbot'), {
  ssr: false,
  loading: () => null
})

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Hero />
      <ArchitectureGallery />
      <BuildGreatThingsSection />
      <SketchUpComplianceSection />
      <ComplianceSection />
      <RiskAlertSection />
      <Footer />
      <Chatbot />
    </div>
  )
}
import Header from '@/components/Header'
import HeroWithImages from '@/components/HeroWithImages'
import ArchitectureGallery from '@/components/ArchitectureGallery'
import BuildGreatThingsSection from '@/components/BuildGreatThingsSection'
import SketchUpComplianceSection from '@/components/SketchUpComplianceSection'
import ComplianceSection from '@/components/ComplianceSection'
import RiskAlertSection from '@/components/RiskAlertSection'
import Footer from '@/components/Footer'
import ChatbotAle from '@/components/ChatbotAle'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <HeroWithImages />
      <ArchitectureGallery />
      <BuildGreatThingsSection />
      <SketchUpComplianceSection />
      <ComplianceSection />
      <RiskAlertSection />
      <Footer />
      <ChatbotAle />
    </div>
  )
}
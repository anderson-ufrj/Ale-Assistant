import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Footer from '@/components/Footer'
import ErrorBoundary from '@/components/ErrorBoundary'
import ArchitectureGallery from '@/components/ArchitectureGallery'
import BuildGreatThingsSection from '@/components/BuildGreatThingsSection'
import SketchUpComplianceSection from '@/components/SketchUpComplianceSection'
import ComplianceSection from '@/components/ComplianceSection'
import RiskAlertSection from '@/components/RiskAlertSection'
import Chatbot from '@/components/Chatbot'

export default function HomePage() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col">
        <Header />
        <ErrorBoundary>
          <Hero />
        </ErrorBoundary>
        <ErrorBoundary>
          <ArchitectureGallery />
        </ErrorBoundary>
        <ErrorBoundary>
          <BuildGreatThingsSection />
        </ErrorBoundary>
        <ErrorBoundary>
          <SketchUpComplianceSection />
        </ErrorBoundary>
        <ErrorBoundary>
          <ComplianceSection />
        </ErrorBoundary>
        <ErrorBoundary>
          <RiskAlertSection />
        </ErrorBoundary>
        <Footer />
        <Chatbot />
      </div>
    </ErrorBoundary>
  )
}
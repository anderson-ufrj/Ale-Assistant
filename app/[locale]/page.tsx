import dynamic from 'next/dynamic'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Footer from '@/components/Footer'
import ErrorBoundary from '@/components/ErrorBoundary'
import LoadingSpinner from '@/components/LoadingSpinner'
import LoadingSkeleton from '@/components/LoadingSkeleton'

// Lazy load heavy components with loading states
const ArchitectureGallery = dynamic(() => import('@/components/ArchitectureGallery'), {
  loading: () => (
    <div className="py-16">
      <LoadingSkeleton variant="gallery" count={8} />
    </div>
  )
})

const BuildGreatThingsSection = dynamic(() => import('@/components/BuildGreatThingsSection'), {
  loading: () => (
    <div className="py-16">
      <LoadingSkeleton variant="card" count={3} />
    </div>
  )
})

const SketchUpComplianceSection = dynamic(() => import('@/components/SketchUpComplianceSection'), {
  loading: () => <LoadingSpinner />
})

const ComplianceSection = dynamic(() => import('@/components/ComplianceSection'), {
  loading: () => <LoadingSpinner />
})

const RiskAlertSection = dynamic(() => import('@/components/RiskAlertSection'), {
  loading: () => <LoadingSpinner />
})

// Lazy load chatbot with no SSR
const Chatbot = dynamic(() => import('@/components/Chatbot'), {
  ssr: false,
  loading: () => null
})

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
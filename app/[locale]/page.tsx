import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import Footer from '@/components/Footer'
import ChatbotWidget from '@/components/ChatbotWidget'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 to-white">
      <Header />
      <HeroSection />
      <Footer />
      <ChatbotWidget />
    </div>
  )
}
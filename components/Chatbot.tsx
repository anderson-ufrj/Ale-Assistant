'use client'

import { useState, useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { getFirebaseAuth, getFirebaseDb } from '@/lib/firebase'
import type { Auth } from 'firebase/auth'

type ConversationStep = 
  | 'welcome'
  | 'askName'
  | 'askCompliance'
  | 'askCompany'
  | 'askRole'
  | 'askAlert'
  | 'askAuth'
  | 'askWhatsapp'
  | 'success'
  | 'final'

interface Message {
  id: string
  type: 'bot' | 'user'
  content: string
  options?: { value: string; label: string }[]
  isTyping?: boolean
}

interface UserData {
  name: string
  email: string
  whatsapp: string
  company: string
  role: string
  receivedAlert: boolean
  knowsCompliance: boolean
  provider: string
}

export default function Chatbot() {
  const t = useTranslations('ale')
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [currentStep, setCurrentStep] = useState<ConversationStep>('welcome')
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    whatsapp: '',
    company: '',
    role: '',
    receivedAlert: false,
    knowsCompliance: false,
    provider: ''
  })
  const [firebaseAuth, setFirebaseAuth] = useState<Auth | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 100
      setIsVisible(scrolled)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial scroll position
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initial welcome messages
      setTimeout(() => {
        addBotMessage(t('greeting') + ' 👋')
        setTimeout(() => {
          addBotMessage(t('welcome'))
          setCurrentStep('askName')
        }, 1500)
      }, 500)
    }
  }, [isOpen, t, messages.length])

  const addBotMessage = (content: string, options?: { value: string; label: string }[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'bot',
      content,
      options,
      isTyping: true
    }
    
    setMessages(prev => [...prev, newMessage])
    
    // Remove typing indicator after a delay
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id ? { ...msg, isTyping: false } : msg
        )
      )
    }, 1000)
  }

  const addUserMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content
    }
    setMessages(prev => [...prev, newMessage])
  }

  const handleUserInput = (value: string) => {
    addUserMessage(value)
    setInputValue('')

    switch (currentStep) {
      case 'askName':
        setUserData({ ...userData, name: value })
        setTimeout(() => {
          const message = t('niceToMeet').replace('{{name}}', value)
          addBotMessage(message)
          setTimeout(() => {
            addBotMessage(t('askCompliance'), [
              { value: 'yes', label: t('yes') },
              { value: 'no', label: t('no') }
            ])
            setCurrentStep('askCompliance')
          }, 1000)
        }, 500)
        break

      case 'askCompany':
        setUserData({ ...userData, company: value })
        setTimeout(() => {
          addBotMessage(t('askRole'), [
            { value: 'tech', label: t('roleTech') },
            { value: 'manager', label: t('roleManager') },
            { value: 'admin', label: t('roleAdmin') },
            { value: 'other', label: t('roleOther') }
          ])
          setCurrentStep('askRole')
        }, 500)
        break

      case 'askWhatsapp':
        setUserData({ ...userData, whatsapp: value })
        saveUserData({ ...userData, whatsapp: value })
        break

      default:
        break
    }
  }

  const handleOptionClick = (value: string) => {
    switch (currentStep) {
      case 'askCompliance':
        setUserData({ ...userData, knowsCompliance: value === 'yes' })
        addUserMessage(value === 'yes' ? t('yes') : t('no'))
        
        setTimeout(() => {
          if (value === 'no') {
            addBotMessage(t('noComplianceExplanation'))
            setTimeout(() => {
              addBotMessage(t('askCompany'))
              setCurrentStep('askCompany')
            }, 1500)
          } else {
            addBotMessage(t('yesComplianceResponse'))
            setTimeout(() => {
              addBotMessage(t('askCompany'))
              setCurrentStep('askCompany')
            }, 1000)
          }
        }, 500)
        break

      case 'askRole':
        setUserData({ ...userData, role: value })
        const roleLabels: Record<string, string> = {
          tech: t('roleTech'),
          manager: t('roleManager'),
          admin: t('roleAdmin'),
          other: t('roleOther')
        }
        addUserMessage(roleLabels[value] || value)
        
        setTimeout(() => {
          addBotMessage(t('askAlert'), [
            { value: 'yes', label: t('alertYes') },
            { value: 'no', label: t('alertNo') }
          ])
          setCurrentStep('askAlert')
        }, 500)
        break

      case 'askAlert':
        const updatedUserData = { ...userData, receivedAlert: value === 'yes' }
        setUserData(updatedUserData)
        addUserMessage(value === 'yes' ? t('alertYes') : t('alertNo'))
        
        setTimeout(() => {
          if (value === 'yes') {
            addBotMessage(t('alertYesResponse'))
          } else {
            addBotMessage(t('alertNoResponse'))
          }
          
          setTimeout(() => {
            const authMessage = t('askAuth').replace('{{name}}', updatedUserData.name)
            addBotMessage(authMessage)
            setCurrentStep('askAuth')
          }, 1000)
        }, 500)
        break

      default:
        break
    }
  }

  const handleGoogleAuth = async () => {
    setIsLoading(true)
    try {
      const { auth, googleProvider } = await getFirebaseAuth()
      const { signInWithPopup } = await import('firebase/auth')
      
      googleProvider.setCustomParameters({
        prompt: 'select_account'
      })
      
      setFirebaseAuth(auth)
      const result = await signInWithPopup(auth, googleProvider)
      const user = result.user
      
      setUserData({
        ...userData,
        email: user.email || '',
        provider: 'google'
      })
      
      addUserMessage(t('loginWith').replace('{{provider}}', 'Google').replace('{{email}}', user.email || ''))
      handleAuthSuccess(userData.name)
    } catch (error: any) {
      console.error('Erro na autenticação Google:', error)
      addBotMessage(t('authError'))
    } finally {
      setIsLoading(false)
    }
  }

  const handleMetaAuth = async () => {
    setIsLoading(true)
    try {
      const { auth, facebookProvider } = await getFirebaseAuth()
      const { signInWithPopup } = await import('firebase/auth')
      
      facebookProvider.setCustomParameters({
        display: 'popup'
      })
      
      setFirebaseAuth(auth)
      const result = await signInWithPopup(auth, facebookProvider)
      const user = result.user
      
      setUserData({
        ...userData,
        email: user.email || '',
        provider: 'meta'
      })
      
      addUserMessage(t('loginWith').replace('{{provider}}', 'Meta').replace('{{email}}', user.email || ''))
      handleAuthSuccess(userData.name)
    } catch (error: any) {
      console.error('Erro na autenticação Meta:', error)
      addBotMessage(t('authError'))
    } finally {
      setIsLoading(false)
    }
  }

  const handleEmailAuth = (email: string) => {
    setUserData({
      ...userData,
      email,
      provider: 'email'
    })
    addUserMessage(email)
    handleAuthSuccess(userData.name)
  }

  const handleAuthSuccess = (userName?: string) => {
    setTimeout(() => {
      const name = userName || userData.name
      const whatsappMessage = t('askWhatsappMessage').replace('{{name}}', name)
      addBotMessage(whatsappMessage)
      setCurrentStep('askWhatsapp')
    }, 500)
  }

  const handleWhatsAppClick = () => {
    const message = t('whatsappDefaultMessage')
      .replace('{{name}}', userData.name)
      .replace('{{company}}', userData.company)
    const whatsappUrl = `https://wa.me/5535984718935?text=${encodeURIComponent(message)}`
    
    // Save user data before redirecting
    saveUserData(userData)
    
    window.open(whatsappUrl, '_blank')
    
    setTimeout(() => {
      addBotMessage(t('whatsappRedirectMessage'))
      setCurrentStep('success')
    }, 500)
  }

  const saveUserData = async (data: UserData) => {
    try {
      const db = await getFirebaseDb()
      const { collection, addDoc, serverTimestamp } = await import('firebase/firestore')
      
      const leadData = {
        nome: data.name,
        email: data.email,
        whatsapp: data.whatsapp,
        empresa: data.company,
        cargo: data.role,
        recebeu_alerta: data.receivedAlert,
        conhece_compliance: data.knowsCompliance,
        provider: data.provider,
        data_criacao: serverTimestamp(),
        origem: 'chatbot_ale'
      }
      
      await addDoc(collection(db, 'leads'), leadData)
    } catch (error) {
      console.error('Erro ao salvar dados:', error)
    }
  }

  const resetChat = () => {
    setMessages([])
    setCurrentStep('welcome')
    setUserData({
      name: '',
      email: '',
      whatsapp: '',
      company: '',
      role: '',
      receivedAlert: false,
      knowsCompliance: false,
      provider: ''
    })
    setInputValue('')
    if (firebaseAuth?.currentUser) {
      import('firebase/auth').then(({ signOut }) => {
        signOut(firebaseAuth!)
      })
    }
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        data-ale-trigger="true"
        className={`fixed bottom-6 right-6 z-50 transition-all duration-500 transform ${
          isVisible && !isOpen ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-16 opacity-0 scale-75 pointer-events-none'
        }`}
      >
        <div className="group relative overflow-hidden bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 text-white px-6 py-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 animate-pulse hover:animate-none border-2 border-orange-400/30 flex items-center space-x-3">
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative flex items-center gap-2">
            <span className="text-xl animate-bounce">💬</span>
            <span className="font-bold hidden sm:inline">Alê</span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </button>

      {/* Chat Widget */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop for mobile only */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
              onClick={() => {
                setIsOpen(false)
                setTimeout(resetChat, 300)
              }}
            />
            
            {/* Chat Container */}
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed z-50 
                bottom-0 right-0 left-0 top-0 lg:bottom-6 lg:right-6 lg:left-auto lg:top-auto
                lg:w-[380px] lg:h-[600px] 
                bg-white lg:rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-orange-50 to-red-50 lg:rounded-t-2xl">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-xl">👩‍💼</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Alê Assistant</h3>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      {t('status')}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setIsOpen(false)
                    setTimeout(resetChat, 300)
                  }}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] ${
                        message.type === 'user'
                          ? 'bg-orange-500 text-white rounded-2xl rounded-br-md'
                          : 'bg-gray-100 text-gray-800 rounded-2xl rounded-bl-md'
                      } px-4 py-2`}
                    >
                      {message.isTyping ? (
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      ) : (
                        <p className="text-sm">{message.content}</p>
                      )}
                    </div>
                  </div>
                ))}

                {/* Options */}
                {messages.length > 0 && 
                 messages[messages.length - 1].options && 
                 !messages[messages.length - 1].isTyping && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {messages[messages.length - 1].options!.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleOptionClick(option.value)}
                        className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-full text-sm hover:bg-orange-50 hover:border-orange-300 transition-colors"
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}

                {/* Auth Options */}
                {currentStep === 'askAuth' && (
                  <div className="space-y-3 mt-4">
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={handleGoogleAuth}
                        disabled={isLoading}
                        className="bg-white border border-gray-300 text-gray-700 p-3 rounded-lg hover:bg-gray-50 transition-colors flex flex-col items-center justify-center space-y-2 disabled:opacity-50"
                      >
                        <svg className="w-6 h-6" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        <span className="text-xs">{t('authGoogleLabel')}</span>
                      </button>
                      <button
                        onClick={handleMetaAuth}
                        disabled={isLoading}
                        className="bg-[#1877F2] text-white p-3 rounded-lg hover:bg-[#1864D9] transition-colors flex flex-col items-center justify-center space-y-2 disabled:opacity-50"
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                        <span className="text-xs">{t('authMetaLabel')}</span>
                      </button>
                      <button
                        disabled={true}
                        className="bg-black text-white p-3 rounded-lg transition-colors flex flex-col items-center justify-center space-y-2 opacity-50 cursor-not-allowed"
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                        </svg>
                        <span className="text-xs">Apple</span>
                      </button>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">{t('authOrEmail')}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* WhatsApp Option */}
                {currentStep === 'askWhatsapp' && (
                  <div className="space-y-3 mt-4">
                    <button
                      onClick={handleWhatsAppClick}
                      className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg transition-colors flex items-center justify-center space-x-3"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                      <span>{t('whatsappButton')}</span>
                    </button>
                    <button
                      onClick={() => {
                        addBotMessage(t('whatsappAskNumber'))
                      }}
                      className="w-full bg-white border border-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      {t('whatsappPreferNumber')}
                    </button>
                  </div>
                )}

                {/* Success Message */}
                {currentStep === 'success' && (
                  <div className="text-center py-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                )}

                {/* Final Message */}
                {currentStep === 'final' && (
                  <div className="text-center py-4">
                    <p className="text-gray-600">{t('finalNoProblem')}</p>
                    <p className="text-gray-600 mt-2">{t('finalHereToHelp')}</p>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-gray-100">
                {(currentStep === 'askName' || currentStep === 'askCompany' || 
                  (currentStep === 'askWhatsapp' && messages[messages.length - 1]?.content.includes('Qual seu número')) ||
                  (currentStep === 'askAuth' && messages[messages.length - 1]?.content !== 'Legal')) && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      if (inputValue.trim()) {
                        if (currentStep === 'askAuth' && inputValue.includes('@')) {
                          handleEmailAuth(inputValue.trim())
                        } else {
                          handleUserInput(inputValue.trim())
                        }
                      }
                    }}
                    className="flex space-x-2"
                  >
                    <input
                      type={currentStep === 'askAuth' ? 'email' : 'text'}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder={
                        currentStep === 'askName' ? t('namePlaceholder') :
                        currentStep === 'askCompany' ? t('companyPlaceholder') :
                        currentStep === 'askAuth' ? t('emailPlaceholder') :
                        currentStep === 'askWhatsapp' ? t('whatsappPlaceholder') :
                        t('messagePlaceholder')
                      }
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                    <button
                      type="submit"
                      className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
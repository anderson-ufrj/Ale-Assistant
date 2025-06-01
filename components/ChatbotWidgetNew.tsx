'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { signInWithPopup, signOut } from 'firebase/auth'
import { auth, googleProvider, facebookProvider, db } from '@/lib/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

export default function ChatbotWidgetNew() {
  const t = useTranslations('ale')
  const tHome = useTranslations('home')
  const [isOpen, setIsOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [currentStep, setCurrentStep] = useState<'intro' | 'auth' | 'form' | 'success'>('intro')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    language: 'pt',
    consent: false,
    provider: ''
  })

  const isBusinessHours = () => {
    const now = new Date()
    const hours = now.getHours()
    const day = now.getDay()
    return day >= 1 && day <= 5 && hours >= 9 && hours < 18
  }

  const handleExpand = () => {
    setIsOpen(true)
    setTimeout(() => setIsExpanded(true), 100)
  }

  const handleClose = () => {
    setIsExpanded(false)
    setTimeout(() => {
      setIsOpen(false)
      setCurrentStep('intro')
      setError('')
    }, 300)
  }

  const handleGoogleAuth = async () => {
    setIsLoading(true)
    setError('')
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const user = result.user
      setUserData({
        ...userData,
        name: user.displayName || '',
        email: user.email || '',
        provider: 'google'
      })
      setCurrentStep('form')
    } catch (error: any) {
      console.error('Erro na autenticação Google:', error)
      setError('Erro ao fazer login. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleMetaAuth = async () => {
    setIsLoading(true)
    setError('')
    try {
      const result = await signInWithPopup(auth, facebookProvider)
      const user = result.user
      setUserData({
        ...userData,
        name: user.displayName || '',
        email: user.email || '',
        provider: 'meta'
      })
      setCurrentStep('form')
    } catch (error: any) {
      console.error('Erro na autenticação Meta:', error)
      setError('Erro ao fazer login. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userData.consent) {
      alert(t('consentTitle'))
      return
    }
    
    setIsLoading(true)
    setError('')
    
    try {
      const leadData = {
        nome: userData.name,
        email: userData.email,
        whatsapp: userData.whatsapp,
        idioma: userData.language,
        provider: userData.provider,
        consentimento: userData.consent,
        data_consentimento: serverTimestamp(),
        data_criacao: serverTimestamp(),
        status_retorno: 'pending',
        horario_comercial: isBusinessHours()
      }
      
      await addDoc(collection(db, 'leads'), leadData)
      
      setCurrentStep('success')
      
      if (auth.currentUser) {
        await signOut(auth)
      }
    } catch (error: any) {
      console.error('Erro ao salvar dados:', error)
      setError('Erro ao salvar seus dados. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = () => {
    setCurrentStep('form')
    setUserData({
      ...userData,
      provider: 'email'
    })
  }

  return (
    <>
      {/* Floating Button - More Subtle */}
      {!isOpen && (
        <button
          onClick={handleExpand}
          className="fixed bottom-6 right-6 group"
        >
          <div className="relative">
            {/* Subtle shadow ring on hover */}
            <div className="absolute inset-0 bg-orange-400 rounded-full opacity-0 group-hover:opacity-20 scale-90 group-hover:scale-110 transition-all duration-500"></div>
            
            {/* Main button - smaller and more professional */}
            <div className="relative bg-gradient-to-br from-orange-500 to-orange-600 text-white px-5 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                <span className="text-xl">💬</span>
              </div>
              <span className="font-medium pr-1">{tHome('cta')}</span>
            </div>
          </div>
        </button>
      )}

      {/* Expanded Chat Widget */}
      {isOpen && (
        <div className={`fixed bottom-6 right-6 transition-all duration-300 ${isExpanded ? 'w-96' : 'w-0'} z-50`}>
          <div className={`bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 ${isExpanded ? 'animate-expand' : 'scale-0'}`}>
            {/* Header with organic shape */}
            <div className="relative bg-gradient-to-br from-orange-500 to-orange-600 p-6 text-white">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 organic-shape -mr-16 -mt-16"></div>
              <div className="relative flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center animate-float">
                    <span className="text-3xl">👩‍💼</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">Alê Assistant</h3>
                    <p className="text-sm text-white/80">{t('greeting')}</p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 max-h-[500px] overflow-y-auto">
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm animate-slide-in">
                  {error}
                </div>
              )}

              {currentStep === 'intro' && (
                <div className="space-y-4 animate-slide-in">
                  <div className="text-center py-4">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Bem-vindo!</h4>
                    <p className="text-gray-600">Como prefere continuar?</p>
                  </div>
                  
                  <button
                    onClick={() => setCurrentStep('auth')}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-4 rounded-2xl hover:shadow-lg transition-all duration-300 font-medium"
                  >
                    Entrar com Google ou Meta
                  </button>
                  
                  <button
                    onClick={handleRegister}
                    className="w-full bg-white border-2 border-orange-500 text-orange-600 px-4 py-4 rounded-2xl hover:bg-orange-50 transition-all duration-300 font-medium"
                  >
                    Cadastrar manualmente
                  </button>
                </div>
              )}

              {currentStep === 'auth' && (
                <div className="space-y-4 animate-slide-in">
                  <h4 className="text-lg font-medium text-center mb-6">{t('authTitle')}</h4>
                  
                  <button
                    onClick={handleGoogleAuth}
                    disabled={isLoading}
                    className="w-full bg-white border border-gray-300 text-gray-700 px-4 py-3 rounded-xl hover:bg-gray-50 transition-all duration-300 flex items-center justify-center space-x-3 disabled:opacity-50"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span>{isLoading ? 'Carregando...' : t('authGoogle')}</span>
                  </button>
                  
                  <button
                    onClick={handleMetaAuth}
                    disabled={isLoading}
                    className="w-full bg-[#1877F2] text-white px-4 py-3 rounded-xl hover:bg-[#1864D9] transition-all duration-300 flex items-center justify-center space-x-3 disabled:opacity-50"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span>{isLoading ? 'Carregando...' : t('authMeta')}</span>
                  </button>
                  
                  <button
                    onClick={() => setCurrentStep('intro')}
                    className="w-full text-gray-500 text-sm hover:text-gray-700 transition-colors"
                  >
                    Voltar
                  </button>
                </div>
              )}

              {currentStep === 'form' && (
                <form onSubmit={handleSubmit} className="space-y-4 animate-slide-in">
                  <h4 className="text-lg font-medium mb-4">{t('formTitle')}</h4>
                  
                  {userData.provider === 'email' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nome completo
                        </label>
                        <input
                          type="text"
                          value={userData.name}
                          onChange={(e) => setUserData({...userData, name: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          E-mail
                        </label>
                        <input
                          type="email"
                          value={userData.email}
                          onChange={(e) => setUserData({...userData, email: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          required
                        />
                      </div>
                    </>
                  )}
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('formWhatsApp')}
                    </label>
                    <input
                      type="tel"
                      value={userData.whatsapp}
                      onChange={(e) => setUserData({...userData, whatsapp: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="+55 11 99999-9999"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('formLanguage')}
                    </label>
                    <select
                      value={userData.language}
                      onChange={(e) => setUserData({...userData, language: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="pt">Português</option>
                      <option value="en">English</option>
                      <option value="es">Español</option>
                    </select>
                  </div>

                  <div className="bg-orange-50 p-4 rounded-xl">
                    <h5 className="font-medium text-gray-900 mb-2">{t('consentTitle')}</h5>
                    <label className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        checked={userData.consent}
                        onChange={(e) => setUserData({...userData, consent: e.target.checked})}
                        className="mt-1 w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                      />
                      <span className="text-sm text-gray-600">{t('consentText')}</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading || !userData.consent}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium px-4 py-3 rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                  >
                    {isLoading ? 'Salvando...' : t('submitButton')}
                  </button>
                </form>
              )}

              {currentStep === 'success' && (
                <div className="text-center py-8 animate-slide-in">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-expand">
                    <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-700 mb-6">
                    {isBusinessHours() ? t('successMessage') : t('outOfHoursMessage')}
                  </p>
                  <button
                    onClick={handleClose}
                    className="text-orange-600 hover:text-orange-700 font-medium"
                  >
                    Fechar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
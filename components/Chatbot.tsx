'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { getFirebaseAuth, getFirebaseDb } from '@/lib/firebase'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { Auth } from 'firebase/auth'

interface ChatbotProps {
  variant?: 'simple' | 'conversational'
}

const formSchema = z.object({
  name: z.string().min(2, 'Nome muito curto'),
  email: z.string().email('E-mail inválido'),
  whatsapp: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Número inválido'),
  consent: z.boolean()
})

type FormData = z.infer<typeof formSchema>

export default function Chatbot({ variant = 'simple' }: ChatbotProps) {
  const t = useTranslations('ale')
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [currentStep, setCurrentStep] = useState<'auth' | 'form' | 'success'>('auth')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [firebaseAuth, setFirebaseAuth] = useState<Auth | null>(null)
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    language: 'pt',
    consent: false,
    provider: ''
  })

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  })

  const consent = watch('consent')

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 100
      setIsVisible(scrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isBusinessHours = () => {
    const now = new Date()
    const hours = now.getHours()
    const day = now.getDay()
    return day >= 1 && day <= 5 && hours >= 9 && hours < 18
  }

  const handleGoogleAuth = async () => {
    setIsLoading(true)
    setError('')
    try {
      const { auth, googleProvider } = await getFirebaseAuth()
      const { signInWithPopup } = await import('firebase/auth')
      
      setFirebaseAuth(auth)
      const result = await signInWithPopup(auth, googleProvider)
      const user = result.user
      
      setUserData({
        ...userData,
        name: user.displayName || '',
        email: user.email || '',
        provider: 'google'
      })
      setValue('name', user.displayName || '')
      setValue('email', user.email || '')
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
      const { auth, facebookProvider } = await getFirebaseAuth()
      const { signInWithPopup } = await import('firebase/auth')
      
      setFirebaseAuth(auth)
      const result = await signInWithPopup(auth, facebookProvider)
      const user = result.user
      
      setUserData({
        ...userData,
        name: user.displayName || '',
        email: user.email || '',
        provider: 'meta'
      })
      setValue('name', user.displayName || '')
      setValue('email', user.email || '')
      setCurrentStep('form')
    } catch (error: any) {
      console.error('Erro na autenticação Meta:', error)
      setError('Erro ao fazer login. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmit = async (data: FormData) => {
    if (!data.consent) {
      alert(t('consentTitle'))
      return
    }
    
    setIsLoading(true)
    setError('')
    
    try {
      const db = await getFirebaseDb()
      const { collection, addDoc, serverTimestamp } = await import('firebase/firestore')
      
      const leadData = {
        nome: data.name,
        email: data.email,
        whatsapp: data.whatsapp,
        idioma: userData.language,
        provider: userData.provider,
        consentimento: data.consent,
        data_consentimento: serverTimestamp(),
        data_criacao: serverTimestamp(),
        status_retorno: 'pending',
        horario_comercial: isBusinessHours()
      }
      
      await addDoc(collection(db, 'leads'), leadData)
      
      setCurrentStep('success')
      
      if (firebaseAuth?.currentUser) {
        const { signOut } = await import('firebase/auth')
        await signOut(firebaseAuth)
      }
    } catch (error: any) {
      console.error('Erro ao salvar dados:', error)
      setError('Erro ao salvar seus dados. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  const resetModal = () => {
    setIsOpen(false)
    setTimeout(() => {
      setCurrentStep('auth')
      setUserData({
        name: '',
        email: '',
        whatsapp: '',
        language: 'pt',
        consent: false,
        provider: ''
      })
      setError('')
    }, 300)
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        data-ale-trigger
        className={`fixed bottom-6 right-6 z-50 transition-all duration-500 transform ${
          isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-16 opacity-0 scale-75 pointer-events-none'
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

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl">👩‍💼</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Alê Assistant</h3>
                      <p className="text-sm text-gray-500">{t('greeting')}</p>
                    </div>
                  </div>
                  <button
                    onClick={resetModal}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Content */}
                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                    {error}
                  </div>
                )}
                
                {currentStep === 'auth' && (
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium text-center mb-6">{t('authTitle')}</h4>
                    <button
                      onClick={handleGoogleAuth}
                      disabled={isLoading}
                      className="w-full bg-white border border-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
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
                      className="w-full bg-[#1877F2] text-white px-4 py-3 rounded-lg hover:bg-[#1864D9] transition-colors flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      <span>{isLoading ? 'Carregando...' : t('authMeta')}</span>
                    </button>
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">ou</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setCurrentStep('form')}
                      className="w-full bg-white border border-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cadastrar manualmente
                    </button>
                  </div>
                )}

                {currentStep === 'form' && (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <h4 className="text-lg font-medium mb-4">{t('formTitle')}</h4>
                    
                    {!userData.provider && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nome completo
                          </label>
                          <input
                            {...register('name')}
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                          {errors.name && (
                            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            E-mail
                          </label>
                          <input
                            {...register('email')}
                            type="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                          {errors.email && (
                            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                          )}
                        </div>
                      </>
                    )}
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('formWhatsApp')}
                      </label>
                      <input
                        {...register('whatsapp')}
                        type="tel"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="+55 11 99999-9999"
                      />
                      {errors.whatsapp && (
                        <p className="mt-1 text-sm text-red-600">{errors.whatsapp.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('formLanguage')}
                      </label>
                      <select
                        value={userData.language}
                        onChange={(e) => setUserData({...userData, language: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      >
                        <option value="pt">Português</option>
                        <option value="en">English</option>
                        <option value="es">Español</option>
                      </select>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h5 className="font-medium text-gray-900 mb-2">{t('consentTitle')}</h5>
                      <label className="flex items-start space-x-3">
                        <input
                          {...register('consent')}
                          type="checkbox"
                          className="mt-1 w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                        />
                        <span className="text-sm text-gray-600">{t('consentText')}</span>
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading || !consent}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? 'Salvando...' : t('submitButton')}
                    </button>
                  </form>
                )}

                {currentStep === 'success' && (
                  <div className="text-center py-8">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-gray-700">
                      {isBusinessHours() ? t('successMessage') : t('outOfHoursMessage')}
                    </p>
                    <button
                      onClick={resetModal}
                      className="mt-6 text-orange-600 hover:text-orange-700 font-medium"
                    >
                      Fechar
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Sparkles, Heart, Shield } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import clsx from 'clsx'
import { signInWithPopup, signOut } from 'firebase/auth'
import { auth, googleProvider, facebookProvider, db } from '@/lib/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

// Tipos de mensagem no chat
type MessageType = 'bot' | 'user'
type Message = {
  id: string
  type: MessageType
  content: string
  timestamp: Date
}

// Schema de validação progressiva
const nameSchema = z.object({
  name: z.string().min(2, 'Nome muito curto').max(50, 'Nome muito longo')
})

const whatsappSchema = z.object({
  whatsapp: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Número inválido')
})

export default function ChatbotAle() {
  const t = useTranslations('ale')
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [currentStep, setCurrentStep] = useState<'welcome' | 'name' | 'whatsapp' | 'consent' | 'complete'>('welcome')
  const [isTyping, setIsTyping] = useState(false)
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    provider: '',
    language: 'pt'
  })
  
  // React Hook Form para cada etapa
  const nameForm = useForm({
    resolver: zodResolver(nameSchema)
  })
  
  const whatsappForm = useForm({
    resolver: zodResolver(whatsappSchema)
  })

  // Detecta horário comercial
  const isBusinessHours = () => {
    const now = new Date()
    const hours = now.getHours()
    const day = now.getDay()
    return day >= 1 && day <= 5 && hours >= 9 && hours < 18
  }

  // Adiciona mensagem ao chat
  const addMessage = (content: string, type: MessageType) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, newMessage])
  }

  // Simula digitação da Alê
  const simulateTyping = async (duration: number = 1000) => {
    setIsTyping(true)
    await new Promise(resolve => setTimeout(resolve, duration))
    setIsTyping(false)
  }

  // Reset do chat
  const resetChat = () => {
    setMessages([])
    setCurrentStep('welcome')
    setUserData({
      name: '',
      email: '',
      whatsapp: '',
      provider: '',
      language: 'pt'
    })
    nameForm.reset()
    whatsappForm.reset()
  }

  // Inicia conversa
  const startChat = () => {
    resetChat()
    setIsOpen(true)
    setTimeout(async () => {
      await simulateTyping()
      addMessage(t('welcome'), 'bot')
      setCurrentStep('name')
    }, 500)
  }

  // Processa resposta do nome
  const handleNameSubmit = async (data: { name: string }) => {
    addMessage(data.name, 'user')
    setUserData(prev => ({ ...prev, name: data.name }))
    
    await simulateTyping(1200)
    addMessage(t('niceToMeet', { name: data.name }), 'bot')
    
    await simulateTyping(800)
    addMessage(t('askWhatsapp'), 'bot')
    setCurrentStep('whatsapp')
  }

  // Processa WhatsApp
  const handleWhatsappSubmit = async (data: { whatsapp: string }) => {
    addMessage(data.whatsapp, 'user')
    setUserData(prev => ({ ...prev, whatsapp: data.whatsapp }))
    
    await simulateTyping()
    addMessage(t('askConsent'), 'bot')
    setCurrentStep('consent')
  }

  // Processa consentimento
  const handleConsent = async (accepted: boolean) => {
    if (accepted) {
      addMessage(t('consentAccepted'), 'user')
      
      // Salva no Firestore
      try {
        const leadData = {
          nome: userData.name,
          email: userData.email,
          whatsapp: userData.whatsapp,
          idioma: userData.language,
          provider: userData.provider || 'chat',
          consentimento: true,
          data_consentimento: serverTimestamp(),
          data_criacao: serverTimestamp(),
          status_retorno: 'pending',
          horario_comercial: isBusinessHours()
        }
        
        await addDoc(collection(db, 'leads'), leadData)
        
        await simulateTyping()
        addMessage(
          isBusinessHours() ? t('thankYouBusiness') : t('thankYouAfterHours'),
          'bot'
        )
        setCurrentStep('complete')
      } catch (error) {
        console.error('Erro ao salvar:', error)
        addMessage(t('errorSaving'), 'bot')
      }
    } else {
      addMessage(t('consentDeclined'), 'user')
      await simulateTyping()
      addMessage(t('understandDecline'), 'bot')
      setCurrentStep('complete')
    }
  }

  // Login social (opcional)
  const handleSocialLogin = async (provider: 'google' | 'facebook') => {
    try {
      const authProvider = provider === 'google' ? googleProvider : facebookProvider
      const result = await signInWithPopup(auth, authProvider)
      const user = result.user
      
      setUserData(prev => ({
        ...prev,
        name: user.displayName || '',
        email: user.email || '',
        provider
      }))
      
      addMessage(t('niceToMeet', { name: user.displayName }), 'bot')
      await simulateTyping()
      addMessage(t('askWhatsapp'), 'bot')
      setCurrentStep('whatsapp')
    } catch (error) {
      console.error('Erro no login:', error)
    }
  }

  return (
    <>
      {/* Botão flutuante - Design sutil e elegante */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startChat}
            data-ale-trigger
            className={clsx(
              "fixed bottom-6 right-6 z-50",
              "bg-gradient-to-br from-slate-50 to-slate-100",
              "text-slate-700 shadow-lg hover:shadow-xl",
              "rounded-full p-4",
              "transition-all duration-300",
              "border border-slate-200",
              "group"
            )}
          >
            <div className="relative">
              <span className="text-2xl group-hover:scale-110 transition-transform inline-block">💬</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute -top-1 -right-1"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
              </motion.div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-3rem)]"
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
              {/* Header */}
              <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-4 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-lg">👩‍💼</span>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">Alê</h3>
                      <p className="text-xs text-slate-600">{t('status')}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setIsOpen(false)
                      setTimeout(resetChat, 300) // Reset após animação de fechar
                    }}
                    className="text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Messages Area */}
              <div className="h-96 overflow-y-auto p-4 space-y-4 bg-slate-50">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={clsx(
                      "flex",
                      message.type === 'user' ? 'justify-end' : 'justify-start'
                    )}
                  >
                    <div
                      className={clsx(
                        "max-w-[80%] p-3 rounded-2xl",
                        message.type === 'user'
                          ? 'bg-gradient-to-br from-amber-500 to-orange-600 text-white'
                          : 'bg-white text-slate-700 border border-slate-200'
                      )}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </motion.div>
                ))}
                
                {/* Typing indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white border border-slate-200 rounded-2xl p-3">
                      <div className="flex space-x-2">
                        <motion.div
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ repeat: Infinity, duration: 1.4 }}
                          className="w-2 h-2 bg-slate-400 rounded-full"
                        />
                        <motion.div
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ repeat: Infinity, duration: 1.4, delay: 0.2 }}
                          className="w-2 h-2 bg-slate-400 rounded-full"
                        />
                        <motion.div
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ repeat: Infinity, duration: 1.4, delay: 0.4 }}
                          className="w-2 h-2 bg-slate-400 rounded-full"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-slate-200 bg-white">
                {currentStep === 'name' && (
                  <form onSubmit={nameForm.handleSubmit(handleNameSubmit)} className="flex gap-2">
                    <input
                      {...nameForm.register('name')}
                      placeholder={t('namePlaceholder')}
                      className="flex-1 px-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
                      autoFocus
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className="bg-gradient-to-r from-amber-500 to-orange-600 text-white p-2 rounded-xl hover:shadow-lg transition-all"
                    >
                      <Send className="w-5 h-5" />
                    </motion.button>
                  </form>
                )}

                {currentStep === 'whatsapp' && (
                  <form onSubmit={whatsappForm.handleSubmit(handleWhatsappSubmit)} className="flex gap-2">
                    <input
                      {...whatsappForm.register('whatsapp')}
                      placeholder="+55 11 99999-9999"
                      className="flex-1 px-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
                      autoFocus
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className="bg-gradient-to-r from-amber-500 to-orange-600 text-white p-2 rounded-xl hover:shadow-lg transition-all"
                    >
                      <Send className="w-5 h-5" />
                    </motion.button>
                  </form>
                )}

                {currentStep === 'consent' && (
                  <div className="space-y-3">
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                      <div className="flex items-start gap-2">
                        <Shield className="w-5 h-5 text-amber-600 mt-0.5" />
                        <p className="text-xs text-slate-700">{t('consentText')}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleConsent(true)}
                        className="flex-1 bg-gradient-to-r from-amber-500 to-orange-600 text-white py-2 rounded-xl text-sm font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
                      >
                        <Heart className="w-4 h-4" />
                        {t('accept')}
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleConsent(false)}
                        className="flex-1 bg-slate-200 text-slate-700 py-2 rounded-xl text-sm font-medium hover:bg-slate-300 transition-all"
                      >
                        {t('decline')}
                      </motion.button>
                    </div>
                  </div>
                )}

                {currentStep === 'welcome' && (
                  <div className="text-center text-sm text-slate-500">
                    {t('initializing')}...
                  </div>
                )}

                {currentStep === 'complete' && (
                  <div className="text-center">
                    <button
                      onClick={() => {
                        setIsOpen(false)
                        setTimeout(resetChat, 300)
                      }}
                      className="text-sm text-slate-600 hover:text-slate-800 transition-colors"
                    >
                      {t('close')}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
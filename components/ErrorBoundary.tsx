'use client'

import React, { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-[400px] flex flex-col items-center justify-center p-8">
            <div className="text-center space-y-4">
              <div className="text-6xl">😵</div>
              <h2 className="text-2xl font-bold text-gray-900">Ops! Algo deu errado</h2>
              <p className="text-gray-600 max-w-md">
                Encontramos um erro inesperado. Por favor, tente recarregar a página.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Recarregar página
              </button>
            </div>
          </div>
        )
      )
    }

    return this.props.children
  }
}
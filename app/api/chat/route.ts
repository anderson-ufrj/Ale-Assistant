/**
 * API Route para chat com RAG
 * POST /api/chat
 */

import { NextRequest, NextResponse } from 'next/server';
import { generateRAGResponse, initializeRAG, isRAGInitialized } from '@/lib/rag';

// Inicializa RAG na primeira requisição
let initialized = false;

function ensureRAGInitialized() {
  if (!initialized) {
    initializeRAG();
    initialized = true;
  }
}

interface ChatRequestBody {
  message: string;
  conversationHistory?: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
  locale?: string;
  userContext?: {
    name?: string;
    company?: string;
    role?: string;
    receivedAlert?: boolean;
    knowsCompliance?: boolean;
  };
}

interface ChatResponseBody {
  success: boolean;
  response?: string;
  relevantDocuments?: Array<{
    title: string;
    category: string;
    score: number;
  }>;
  tokensUsed?: number;
  error?: string;
}

export async function POST(request: NextRequest): Promise<NextResponse<ChatResponseBody>> {
  try {
    // Verifica se a API key está configurada
    if (!process.env.ANTHROPIC_API_KEY) {
      console.error('[API] ANTHROPIC_API_KEY não configurada');
      return NextResponse.json(
        {
          success: false,
          error: 'Serviço de IA não configurado. Por favor, configure ANTHROPIC_API_KEY.'
        },
        { status: 500 }
      );
    }

    // Garante que o RAG está inicializado
    ensureRAGInitialized();

    if (!isRAGInitialized()) {
      console.error('[API] RAG não foi inicializado corretamente');
      return NextResponse.json(
        {
          success: false,
          error: 'Sistema de conhecimento não inicializado'
        },
        { status: 500 }
      );
    }

    // Parse do body
    const body: ChatRequestBody = await request.json();

    if (!body.message || typeof body.message !== 'string') {
      return NextResponse.json(
        {
          success: false,
          error: 'Mensagem inválida'
        },
        { status: 400 }
      );
    }

    const {
      message,
      conversationHistory = [],
      locale = 'pt',
      userContext
    } = body;

    console.log('[API] Processing message:', {
      messagePreview: message.substring(0, 50),
      historyLength: conversationHistory.length,
      locale,
      hasUserContext: !!userContext
    });

    // Enriquece a mensagem com contexto do usuário se disponível
    let enrichedMessage = message;
    if (userContext) {
      const contextParts: string[] = [];

      if (userContext.name) {
        contextParts.push(`Nome do usuário: ${userContext.name}`);
      }
      if (userContext.company) {
        contextParts.push(`Empresa: ${userContext.company}`);
      }
      if (userContext.role) {
        contextParts.push(`Função: ${userContext.role}`);
      }
      if (userContext.receivedAlert !== undefined) {
        contextParts.push(
          `Recebeu alerta: ${userContext.receivedAlert ? 'Sim' : 'Não'}`
        );
      }
      if (userContext.knowsCompliance !== undefined) {
        contextParts.push(
          `Conhece compliance: ${userContext.knowsCompliance ? 'Sim' : 'Não'}`
        );
      }

      if (contextParts.length > 0) {
        enrichedMessage = `[Contexto do usuário: ${contextParts.join(', ')}]\n\n${message}`;
      }
    }

    // Gera resposta usando RAG
    const ragResponse = await generateRAGResponse(
      enrichedMessage,
      conversationHistory,
      {
        locale,
        temperature: 0.7,
        maxTokens: 1024,
        topKDocuments: 3
      }
    );

    console.log('[API] Response generated:', {
      responseLength: ragResponse.response.length,
      documentsUsed: ragResponse.relevantDocuments.length,
      tokensUsed: ragResponse.tokensUsed
    });

    return NextResponse.json({
      success: true,
      response: ragResponse.response,
      relevantDocuments: ragResponse.relevantDocuments,
      tokensUsed: ragResponse.tokensUsed
    });

  } catch (error) {
    console.error('[API] Error processing chat request:', error);

    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';

    return NextResponse.json(
      {
        success: false,
        error: `Erro ao processar mensagem: ${errorMessage}`
      },
      { status: 500 }
    );
  }
}

// Endpoint de health check
export async function GET(): Promise<NextResponse> {
  ensureRAGInitialized();

  const stats = {
    ragInitialized: isRAGInitialized(),
    apiKeyConfigured: !!process.env.ANTHROPIC_API_KEY,
    timestamp: new Date().toISOString()
  };

  return NextResponse.json({
    status: 'ok',
    service: 'chat-api',
    ...stats
  });
}

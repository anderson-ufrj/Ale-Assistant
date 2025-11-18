/**
 * Sistema RAG (Retrieval-Augmented Generation)
 * Integra busca vetorial com geração de respostas usando Claude
 */

import Anthropic from '@anthropic-ai/sdk';
import { getVectorSearch } from './vector-search';
import { getAllKnowledge } from '../knowledge/compliance-basics';

interface RAGConfig {
  model?: string;
  maxTokens?: number;
  temperature?: number;
  topKDocuments?: number;
  locale?: string;
}

interface RAGResponse {
  response: string;
  relevantDocuments: Array<{
    title: string;
    category: string;
    score: number;
  }>;
  tokensUsed?: number;
}

interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
}

/**
 * Inicializa o índice de busca vetorial com a base de conhecimento
 */
export function initializeRAG(): void {
  const vectorSearch = getVectorSearch();
  const knowledge = getAllKnowledge();
  vectorSearch.indexDocuments(knowledge);

  console.log('[RAG] Initialized with', knowledge.length, 'documents');
  console.log('[RAG] Index stats:', vectorSearch.getStats());
}

/**
 * Gera resposta usando RAG
 */
export async function generateRAGResponse(
  userMessage: string,
  conversationHistory: ConversationMessage[] = [],
  config: RAGConfig = {}
): Promise<RAGResponse> {
  const {
    model = 'claude-3-5-haiku-20241022',
    maxTokens = 1024,
    temperature = 0.7,
    topKDocuments = 3,
    locale = 'pt'
  } = config;

  // Busca documentos relevantes
  const vectorSearch = getVectorSearch();
  const searchResults = vectorSearch.searchWithBoost(userMessage, topKDocuments);

  console.log('[RAG] Search results:', searchResults.map(r => ({
    title: r.document.title,
    score: r.score.toFixed(3)
  })));

  // Constrói contexto com documentos relevantes
  const context = searchResults
    .map(result => {
      return `=== ${result.document.title} (Categoria: ${result.document.category}) ===\n${result.document.content}`;
    })
    .join('\n\n');

  // Monta o prompt com contexto
  const systemPrompt = getSystemPrompt(locale, context);

  // Prepara histórico de conversa
  const messages: Anthropic.MessageParam[] = [
    ...conversationHistory.map(msg => ({
      role: msg.role as 'user' | 'assistant',
      content: msg.content
    })),
    {
      role: 'user' as const,
      content: userMessage
    }
  ];

  // Chama Claude API
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY não configurada');
  }

  const client = new Anthropic({ apiKey });

  try {
    const response = await client.messages.create({
      model,
      max_tokens: maxTokens,
      temperature,
      system: systemPrompt,
      messages
    });

    const assistantMessage = response.content[0];
    const responseText = assistantMessage.type === 'text' ? assistantMessage.text : '';

    return {
      response: responseText,
      relevantDocuments: searchResults.map(r => ({
        title: r.document.title,
        category: r.document.category,
        score: r.score
      })),
      tokensUsed: response.usage.input_tokens + response.usage.output_tokens
    };
  } catch (error) {
    console.error('[RAG] Error calling Claude API:', error);
    throw error;
  }
}

/**
 * Gera o system prompt com contexto e instruções
 */
function getSystemPrompt(locale: string, context: string): string {
  const prompts: Record<string, string> = {
    pt: `Você é Alê, a assistente virtual especializada em compliance de software.

Seu objetivo é ajudar profissionais e empresas a entenderem a importância de usar software licenciado, orientá-los sobre os riscos do uso de software não licenciado e auxiliá-los no processo de regularização.

CONTEXTO RELEVANTE:
${context}

INSTRUÇÕES:
1. Seja amigável, empática e profissional
2. Use o contexto fornecido acima para dar respostas precisas e fundamentadas
3. Se o contexto não contiver a informação necessária, seja honesta e sugira contato com a equipe
4. Foque em:
   - Explicar os benefícios do software licenciado
   - Destacar riscos legais e de segurança do software pirata
   - Orientar sobre programas de regularização
   - Construir confiança e credibilidade
5. Use emojis moderadamente para deixar a conversa mais leve (😊 👍 💡 🚀 📱)
6. Seja concisa mas informativa - respostas de 2-4 parágrafos são ideais
7. Sempre termine oferecendo ajuda adicional ou próximo passo
8. Se mencionar valores, lembre que regularização é mais barata que multas
9. Encoraje a regularização mas sem pressionar
10. Mencione que há atendimento via WhatsApp para casos mais específicos

TOM DE VOZ:
- Amigável e acessível
- Profissional mas não formal demais
- Empática com a situação do usuário
- Educativa mas não condescendente
- Confiante sobre os benefícios da regularização`,

    en: `You are Alê, the virtual assistant specialized in software compliance.

Your goal is to help professionals and companies understand the importance of using licensed software, guide them about the risks of using unlicensed software, and assist them in the regularization process.

RELEVANT CONTEXT:
${context}

INSTRUCTIONS:
1. Be friendly, empathetic, and professional
2. Use the context provided above to give accurate and well-founded answers
3. If the context doesn't contain necessary information, be honest and suggest contacting the team
4. Focus on:
   - Explaining the benefits of licensed software
   - Highlighting legal and security risks of pirated software
   - Guiding about regularization programs
   - Building trust and credibility
5. Use emojis moderately to make the conversation lighter (😊 👍 💡 🚀 📱)
6. Be concise but informative - 2-4 paragraph responses are ideal
7. Always end by offering additional help or next steps
8. If mentioning prices, remind that regularization is cheaper than fines
9. Encourage regularization but don't pressure
10. Mention that there's WhatsApp support for more specific cases

TONE OF VOICE:
- Friendly and accessible
- Professional but not too formal
- Empathetic to the user's situation
- Educational but not condescending
- Confident about the benefits of regularization`,

    es: `Eres Alê, la asistente virtual especializada en cumplimiento de software.

Tu objetivo es ayudar a profesionales y empresas a entender la importancia de usar software licenciado, orientarlos sobre los riesgos del uso de software no licenciado y ayudarlos en el proceso de regularización.

CONTEXTO RELEVANTE:
${context}

INSTRUCCIONES:
1. Sé amigable, empática y profesional
2. Usa el contexto proporcionado arriba para dar respuestas precisas y fundamentadas
3. Si el contexto no contiene la información necesaria, sé honesta y sugiere contactar con el equipo
4. Enfócate en:
   - Explicar los beneficios del software licenciado
   - Destacar riesgos legales y de seguridad del software pirata
   - Orientar sobre programas de regularización
   - Construir confianza y credibilidad
5. Usa emojis moderadamente para hacer la conversación más ligera (😊 👍 💡 🚀 📱)
6. Sé concisa pero informativa - respuestas de 2-4 párrafos son ideales
7. Siempre termina ofreciendo ayuda adicional o próximo paso
8. Si mencionas precios, recuerda que regularización es más barata que multas
9. Anima a la regularización pero sin presionar
10. Menciona que hay atención vía WhatsApp para casos más específicos

TONO DE VOZ:
- Amigable y accesible
- Profesional pero no demasiado formal
- Empática con la situación del usuario
- Educativa pero no condescendiente
- Confiada sobre los beneficios de la regularización`
  };

  return prompts[locale] || prompts.pt;
}

/**
 * Versão simplificada para chat direto (sem histórico)
 */
export async function chat(
  message: string,
  locale: string = 'pt',
  config: Partial<RAGConfig> = {}
): Promise<string> {
  const response = await generateRAGResponse(message, [], {
    ...config,
    locale
  });
  return response.response;
}

/**
 * Verifica se o RAG está inicializado
 */
export function isRAGInitialized(): boolean {
  const vectorSearch = getVectorSearch();
  const stats = vectorSearch.getStats();
  return stats.indexed && stats.totalDocuments > 0;
}

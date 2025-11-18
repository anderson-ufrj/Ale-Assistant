# Sistema RAG (Retrieval-Augmented Generation)

Este diretório contém a implementação do sistema RAG para o Ale-Assistant, que permite respostas inteligentes baseadas em uma base de conhecimento sobre compliance de software.

## Arquitetura

```
┌─────────────────┐
│   User Query    │
└────────┬────────┘
         │
         ▼
┌─────────────────────────┐
│   Vector Search         │
│  (TF-IDF + Cosine)      │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│  Knowledge Base         │
│  (compliance-basics.ts) │
└────────┬────────────────┘
         │
         ▼ (Top-K Docs)
┌─────────────────────────┐
│   Claude API            │
│  (Context + Query)      │
└────────┬────────────────┘
         │
         ▼
┌─────────────────┐
│   AI Response   │
└─────────────────┘
```

## Componentes

### 1. Knowledge Base (`../knowledge/compliance-basics.ts`)

Base de conhecimento estruturada com documentos sobre:
- Definição de compliance
- Aspectos legais
- Segurança
- Reputação empresarial
- SketchUp específico
- Processo de regularização
- LGPD
- Profissionais de arquitetura
- FAQs

Cada documento contém:
- `id`: Identificador único
- `category`: Categoria do documento
- `title`: Título
- `content`: Conteúdo detalhado
- `tags`: Tags para busca
- `relevance`: Score de relevância (0-1)

### 2. Vector Search (`vector-search.ts`)

Sistema de busca vetorial usando:
- **TF-IDF**: Term Frequency-Inverse Document Frequency
- **Cosine Similarity**: Cálculo de similaridade entre vetores
- **Boosting**: Amplificação por categoria e tags

Características:
- Busca puramente vetorial (não requer API externa)
- Normalização de texto (remove acentos, lowercase)
- Tokenização inteligente
- Suporte a boost por categoria e tags

### 3. RAG Engine (`index.ts`)

Orquestrador principal que:
- Inicializa o índice de busca
- Busca documentos relevantes (Top-K)
- Constrói contexto para Claude
- Gera prompts otimizados por idioma
- Gerencia conversação

## Uso

### Inicialização (uma vez)

```typescript
import { initializeRAG } from '@/lib/rag';

initializeRAG();
```

### Chat simples

```typescript
import { chat } from '@/lib/rag';

const response = await chat(
  'O que é compliance de software?',
  'pt' // locale
);
console.log(response);
```

### Chat com histórico

```typescript
import { generateRAGResponse } from '@/lib/rag';

const response = await generateRAGResponse(
  'E quais são os riscos?',
  [
    { role: 'user', content: 'O que é compliance?' },
    { role: 'assistant', content: 'Compliance é...' }
  ],
  {
    locale: 'pt',
    temperature: 0.7,
    maxTokens: 1024,
    topKDocuments: 3
  }
);

console.log(response.response);
console.log('Documentos usados:', response.relevantDocuments);
console.log('Tokens:', response.tokensUsed);
```

### Via API Route

```bash
POST /api/chat
Content-Type: application/json

{
  "message": "Como regularizar meu SketchUp?",
  "locale": "pt",
  "conversationHistory": [
    {
      "role": "user",
      "content": "Preciso de ajuda"
    },
    {
      "role": "assistant",
      "content": "Claro! Como posso ajudar?"
    }
  ],
  "userContext": {
    "name": "João",
    "company": "ArqDesign",
    "role": "tech",
    "receivedAlert": true
  }
}
```

Resposta:

```json
{
  "success": true,
  "response": "Para regularizar seu SketchUp...",
  "relevantDocuments": [
    {
      "title": "SketchUp para Profissionais",
      "category": "sketchup",
      "score": 0.856
    }
  ],
  "tokensUsed": 1234
}
```

## Configuração

### Variáveis de Ambiente

```bash
# .env.local
ANTHROPIC_API_KEY=sk-ant-...
```

Obtenha sua chave em: https://console.anthropic.com/

### Parâmetros de Configuração

```typescript
interface RAGConfig {
  model?: string;           // Padrão: 'claude-3-5-sonnet-20241022'
  maxTokens?: number;       // Padrão: 1024
  temperature?: number;     // Padrão: 0.7 (0-1, criatividade)
  topKDocuments?: number;   // Padrão: 3 (quantos docs buscar)
  locale?: string;          // Padrão: 'pt' (pt/en/es)
}
```

## Prompts do Sistema

O sistema usa prompts otimizados para cada idioma (pt/en/es) que instruem Claude a:

1. Agir como Alê, assistente de compliance
2. Usar o contexto fornecido (documentos relevantes)
3. Ser amigável, empática e profissional
4. Focar em benefícios e orientação
5. Usar emojis moderadamente
6. Ser concisa mas informativa
7. Sempre oferecer próximos passos

## Performance

### Métricas Típicas

- **Busca vetorial**: < 50ms (10 documentos)
- **Claude API**: 500-2000ms (depende da resposta)
- **Total**: ~1-3 segundos

### Otimizações

- Índice vetorial em memória (rápido)
- Top-K limitado (reduz contexto)
- Cache de embeddings (futuro)
- Streaming de respostas (futuro)

## Extensões Futuras

### Planejado

- [ ] Suporte a streaming de respostas
- [ ] Cache de respostas frequentes
- [ ] Migração para vector database (Pinecone/Weaviate)
- [ ] Embeddings mais avançados (OpenAI/Cohere)
- [ ] Analytics de queries
- [ ] A/B testing de prompts
- [ ] Feedback loop de qualidade

### Possível

- [ ] Multi-modal (imagens de compliance)
- [ ] Síntese de documentos longos
- [ ] Geração de relatórios personalizados
- [ ] Integração com CRM
- [ ] Chatbot voice

## Testes

```bash
# Teste a API
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "O que é compliance?",
    "locale": "pt"
  }'

# Health check
curl http://localhost:3000/api/chat
```

## Troubleshooting

### "ANTHROPIC_API_KEY não configurada"

Adicione a chave em `.env.local`:

```bash
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

### "RAG não foi inicializado"

Certifique-se que `initializeRAG()` foi chamado antes de usar.

### Respostas genéricas

- Aumente `topKDocuments` (mais contexto)
- Ajuste `temperature` (0.5 = conservador, 0.9 = criativo)
- Adicione mais documentos à knowledge base

### Performance lenta

- Reduza `maxTokens` (respostas mais curtas)
- Reduza `topKDocuments` (menos contexto)
- Use modelo mais rápido (haiku)

## Licença

Parte do projeto Ale-Assistant.

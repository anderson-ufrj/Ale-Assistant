# Implementação RAG no Ale-Assistant 🤖

Este documento descreve a implementação do sistema RAG (Retrieval-Augmented Generation) no Ale-Assistant, que adiciona capacidades de IA conversacional ao chatbot.

## 📋 Visão Geral

O RAG foi implementado para permitir que a Alê (assistente virtual) responda perguntas de forma inteligente sobre compliance de software, usando:

1. **Base de conhecimento** estruturada sobre compliance, regularização, SketchUp, LGPD, etc.
2. **Busca vetorial** com TF-IDF e similaridade de cosseno
3. **Claude (Anthropic)** para geração de respostas naturais e contextualizadas
4. **Modo híbrido**: chatbot pode operar em modo RAG (conversa livre) ou modo tradicional (coleta de leads)

## 🏗️ Arquitetura

```
┌────────────────────────────────────────────────────────────────┐
│                         Frontend                               │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Chatbot.tsx                                             │  │
│  │  - Modo RAG: Conversa livre com IA                      │  │
│  │  - Modo Tradicional: Coleta de dados estruturada        │  │
│  └────────────────────┬─────────────────────────────────────┘  │
└────────────────────────┼────────────────────────────────────────┘
                         │
                         ▼ POST /api/chat
┌────────────────────────────────────────────────────────────────┐
│                      API Route                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  app/api/chat/route.ts                                   │  │
│  │  - Recebe mensagem do usuário                           │  │
│  │  - Enriquece com contexto do usuário                    │  │
│  │  - Chama sistema RAG                                    │  │
│  └────────────────────┬─────────────────────────────────────┘  │
└────────────────────────┼────────────────────────────────────────┘
                         │
                         ▼
┌────────────────────────────────────────────────────────────────┐
│                      Sistema RAG                               │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  lib/rag/index.ts                                        │  │
│  │  1. Busca documentos relevantes (Vector Search)         │  │
│  │  2. Constrói contexto com documentos                    │  │
│  │  3. Gera prompt para Claude                             │  │
│  │  4. Chama Claude API                                    │  │
│  │  5. Retorna resposta + documentos usados                │  │
│  └────────┬───────────────────────┬────────────────────────┘  │
└────────────┼───────────────────────┼────────────────────────────┘
             │                       │
             ▼                       ▼
┌────────────────────┐  ┌────────────────────────────┐
│  Vector Search     │  │  Knowledge Base            │
│  lib/rag/          │  │  lib/knowledge/            │
│  vector-search.ts  │  │  compliance-basics.ts      │
│                    │  │                            │
│  - TF-IDF          │  │  - 10 documentos           │
│  - Cosine Sim      │  │  - Compliance              │
│  - Boosting        │  │  - Regularização           │
│                    │  │  - SketchUp                │
│                    │  │  - LGPD, etc.              │
└────────────────────┘  └────────────────────────────┘
             │
             ▼
┌────────────────────────────────────┐
│  Claude API (Anthropic)            │
│  - Model: claude-3-5-haiku         │
│  - Temperature: 0.7                │
│  - Max tokens: 1024                │
└────────────────────────────────────┘
```

## 📁 Estrutura de Arquivos

```
Ale-Assistant/
├── app/
│   └── api/
│       └── chat/
│           └── route.ts              # API endpoint para chat RAG
├── components/
│   └── Chatbot.tsx                   # Chatbot com suporte RAG
├── lib/
│   ├── knowledge/
│   │   └── compliance-basics.ts      # Base de conhecimento
│   └── rag/
│       ├── index.ts                  # Sistema RAG principal
│       ├── vector-search.ts          # Busca vetorial
│       └── README.md                 # Documentação técnica
├── .env.local.example                # Variáveis de ambiente (modelo)
└── RAG_IMPLEMENTATION.md             # Este arquivo
```

## 🚀 Como Usar

### 1. Configuração Inicial

Adicione sua chave da API da Anthropic no arquivo `.env.local`:

```bash
# Crie o arquivo .env.local
cp .env.local.example .env.local

# Adicione sua chave
ANTHROPIC_API_KEY=sk-ant-sua-chave-aqui
```

Obtenha sua chave em: https://console.anthropic.com/

### 2. Executar o Projeto

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev
```

### 3. Usar o Chat RAG

1. Acesse o site e role a página para baixo
2. Clique no botão flutuante "Alê" 💬
3. Escolha "💬 Conversar livremente"
4. Faça perguntas sobre compliance de software!

#### Exemplos de Perguntas:

- "O que é compliance de software?"
- "Quais os riscos de usar software pirata?"
- "Como regularizar meu SketchUp?"
- "O que é LGPD e como ela se aplica?"
- "Quanto custa uma multa por software não licenciado?"
- "Quais os benefícios de software original?"

### 4. Alternar Entre Modos

- **Modo RAG → Modo Coleta**: Clique em "📋 Quero falar com a equipe"
- **Modo Coleta → Modo RAG**: Feche e reabra o chat, escolha "💬 Conversar livremente"

## 🎯 Funcionalidades

### Modo RAG (Conversa Livre)

- ✅ Respostas inteligentes geradas por IA
- ✅ Busca automática na base de conhecimento
- ✅ Contexto de conversa mantido
- ✅ Suporte a múltiplos idiomas (pt, en, es)
- ✅ Respostas personalizadas baseadas em dados do usuário
- ✅ Indicador visual de resposta IA (fundo roxo)

### Modo Tradicional (Coleta de Leads)

- ✅ Fluxo estruturado de perguntas
- ✅ Coleta de nome, empresa, cargo, etc.
- ✅ Autenticação Google/Meta/Email
- ✅ Integração WhatsApp
- ✅ Salvamento no Firestore

## 📊 Base de Conhecimento

A base de conhecimento atual contém **10 documentos** organizados por categoria:

| ID | Categoria | Título | Relevância |
|----|-----------|--------|------------|
| compliance-definition | basics | O que é Software Compliance | 1.0 |
| legal-compliance | legal | Conformidade Legal | 1.0 |
| security-benefits | security | Segurança Garantida | 0.9 |
| business-reputation | business | Reputação Empresarial | 0.8 |
| sketchup-compliance | sketchup | SketchUp para Profissionais | 0.95 |
| regularization-process | process | Processo de Regularização | 0.9 |
| lgpd-compliance | privacy | LGPD e Proteção de Dados | 0.7 |
| architecture-professionals | professionals | Compliance para Arquitetos | 0.85 |
| common-questions | faq | Perguntas Frequentes | 0.8 |
| contact-info | contact | Como Obter Ajuda | 0.7 |

### Adicionar Novos Documentos

Edite `lib/knowledge/compliance-basics.ts`:

```typescript
export const complianceKnowledge = [
  // ... documentos existentes
  {
    id: "novo-documento",
    category: "nova-categoria",
    title: "Título do Documento",
    content: `Conteúdo detalhado aqui...`,
    tags: ["tag1", "tag2", "tag3"],
    relevance: 0.85
  }
];
```

## 🔧 Configurações Avançadas

### Ajustar Parâmetros do RAG

Edite `lib/rag/index.ts`:

```typescript
const response = await generateRAGResponse(
  userMessage,
  conversationHistory,
  {
    model: 'claude-3-5-haiku-20241022', // Modelo do Claude (Haiku - rápido e econômico)
    maxTokens: 1024,                     // Tamanho máx da resposta
    temperature: 0.7,                    // Criatividade (0-1)
    topKDocuments: 3,                    // Quantos docs buscar
    locale: 'pt'                         // Idioma (pt/en/es)
  }
);
```

### Personalizar Prompts

Os prompts do sistema estão em `lib/rag/index.ts` na função `getSystemPrompt()`. Edite para ajustar o tom, estilo e instruções da IA.

### Melhorar Busca Vetorial

Ajuste os pesos de boost em `lib/rag/vector-search.ts`:

```typescript
searchWithBoost(
  query,
  topK: 3,
  categoryBoost: 1.2,  // Peso para categoria
  tagBoost: 1.1        // Peso para tags
)
```

## 📈 Métricas e Performance

### Tempos Médios

- **Busca vetorial**: ~30-50ms
- **Chamada Claude API (Haiku)**: 300-1000ms (mais rápido que Sonnet!)
- **Total (usuário)**: 0.5-2 segundos

### Custos (Anthropic - Haiku)

- **Input**: $0.25 / milhão de tokens
- **Output**: $1.25 / milhão de tokens
- **Estimativa por conversa**: $0.001 - $0.005 (muito econômico!)

### Limites

- Máximo de tokens por requisição: 1024
- Histórico de conversa: ilimitado (enquanto chat aberto)
- Base de conhecimento: 10 documentos (~15.000 tokens)

## 🧪 Testes

### Teste Manual via Navegador

1. Abra o site em `http://localhost:3000`
2. Clique no botão Alê
3. Escolha "Conversar livremente"
4. Teste perguntas variadas

### Teste via API (curl)

```bash
# Health check
curl http://localhost:3000/api/chat

# Chat simples
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "O que é compliance de software?",
    "locale": "pt"
  }'

# Com histórico
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "E quais são os riscos?",
    "conversationHistory": [
      {"role": "user", "content": "O que é compliance?"},
      {"role": "assistant", "content": "Compliance é usar software legal..."}
    ],
    "locale": "pt"
  }'
```

### Verificar Logs

```bash
# Logs do servidor
npm run dev

# Procure por:
# [API] Processing message: ...
# [RAG] Search results: ...
# [RAG] Response generated: ...
```

## 🐛 Troubleshooting

### "ANTHROPIC_API_KEY não configurada"

**Solução**: Adicione a chave no `.env.local`:
```bash
ANTHROPIC_API_KEY=sk-ant-sua-chave
```

### "RAG não foi inicializado"

**Solução**: O RAG é inicializado automaticamente na primeira requisição. Espere alguns segundos e tente novamente.

### Respostas genéricas ou imprecisas

**Soluções**:
1. Aumentar `topKDocuments` de 3 para 5
2. Adicionar mais documentos à base de conhecimento
3. Melhorar tags e categorias dos documentos
4. Ajustar `temperature` para 0.5 (mais conservador)

### Performance lenta

**Soluções**:
1. Reduzir `maxTokens` para 512
2. Usar modelo mais rápido (se disponível)
3. Implementar cache de respostas

### Erro de timeout

**Solução**: A API da Anthropic pode demorar. Aumente o timeout no fetch:

```typescript
const response = await fetch('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({...}),
  signal: AbortSignal.timeout(30000) // 30 segundos
});
```

## 🔮 Próximos Passos

### Melhorias Planejadas

- [ ] Cache de respostas frequentes (Redis)
- [ ] Streaming de respostas (Server-Sent Events)
- [ ] Analytics de queries e satisfação
- [ ] Migração para vector database (Pinecone/Weaviate)
- [ ] Embeddings mais avançados (OpenAI/Cohere)
- [ ] A/B testing de prompts
- [ ] Rate limiting por usuário
- [ ] Exportação de conversas
- [ ] Feedback de qualidade (👍/👎)
- [ ] Multi-modal (imagens de compliance)

### Extensões Possíveis

- [ ] Integração com CRM
- [ ] Webhooks para notificações
- [ ] API pública para terceiros
- [ ] Versão WhatsApp bot
- [ ] Dashboard de admin
- [ ] Treinamento fine-tuned

## 📚 Recursos Adicionais

- [Documentação Anthropic](https://docs.anthropic.com/)
- [Claude API Reference](https://docs.anthropic.com/claude/reference/getting-started-with-the-api)
- [RAG Best Practices](https://www.anthropic.com/index/retrieval-augmented-generation-rag)
- [Vector Search Guide](https://www.pinecone.io/learn/what-is-similarity-search/)

## 🤝 Contribuindo

Para adicionar recursos ou melhorar o RAG:

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Add nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto é parte do Ale-Assistant.

---

**Desenvolvido por Anderson Henrique da Silva**
**Data de Implementação**: 2025-11-18

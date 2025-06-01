# 🏛️ Alê Assistant - Plataforma de Software Compliance

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-orange.svg)
![License](https://img.shields.io/badge/license-Proprietary-red.svg)
![Next.js](https://img.shields.io/badge/Next.js-15.1.0-black.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)
![Firebase](https://img.shields.io/badge/Firebase-10.0-yellow.svg)

### Promovendo o uso ético e legal de software no Brasil

*Uma plataforma educacional focada em Software Compliance para arquitetos e engenheiros brasileiros*

[🌐 Demo](#) • [📋 Documentação](#funcionalidades) • [🚀 Deploy](#)

</div>

---

## 🎯 **Sobre o Projeto**

O **Alê Assistant** é uma plataforma educacional inovadora que ajuda profissionais de arquitetura e engenharia a entenderem e implementarem **Software Compliance** em seus escritórios. Nosso foco é promover o uso ético e legal de software, especialmente SketchUp, através de uma abordagem diplomática e educativa.

### 🎭 **Nossa Missão**
Transformar a percepção sobre licenciamento de software, mostrando que compliance não é punição, mas **proteção, profissionalismo e crescimento sustentável**.

---

## ✨ **Funcionalidades**

### 🤖 **Alê - Assistente Virtual Inteligente**
- **Conversação natural** com coleta progressiva de dados
- **Conformidade LGPD** com consentimento explícito
- **Autenticação segura** via Google e Facebook
- **Horário comercial automático** para respostas contextualizadas
- **Botão flutuante inteligente** que aparece após engajamento

### 🌍 **Multilíngue & Regional**
- **3 idiomas**: Português 🇧🇷, English 🇺🇸, Español 🇪🇸
- **Detecção automática** por localização geográfica
- **Seletor manual** para controle do usuário
- **Imagens regionais** adaptadas para cada mercado
- **Fallback inteligente** para máxima disponibilidade

### 🎨 **Design & Experiência**
- **Arquitetura brasileira** como inspiração visual
- **Organic modernism** inspirado em Niemeyer e Burle Marx
- **Animações fluidas** e micro-interações polidas
- **Responsivo total** para todos os dispositivos
- **Performance otimizada** com Next.js 15

### 🔐 **Backend & Segurança**
- **Firebase Firestore** para dados estruturados
- **Autenticação segura** com múltiplos provedores
- **LGPD compliance** nativo
- **Rate limiting** e proteção contra spam
- **Logs auditáveis** para conformidade

---

## 🛠️ **Stack Tecnológica**

### **Frontend**
- **Next.js 15.1.0** - React framework de produção
- **TypeScript** - Tipagem estática para maior robustez
- **Tailwind CSS** - Framework CSS utilitário
- **Framer Motion** - Animações avançadas
- **next-intl** - Internacionalização nativa

### **Backend & Dados**
- **Firebase Authentication** - Autenticação multi-provedor
- **Firestore** - Banco NoSQL escalável
- **Vercel** - Deploy e hosting otimizado

### **Ferramentas & Qualidade**
- **React Hook Form + Zod** - Validação de formulários
- **ESLint + Prettier** - Qualidade de código
- **Git** - Controle de versão

---

## 🚀 **Instalação & Execução**

### **Pré-requisitos**
```bash
Node.js 18+ 
npm ou yarn
Conta Firebase configurada
```

### **Configuração Local**
```bash
# Clone o repositório
git clone https://github.com/anderson-henrique/ale-assistant.git
cd ale-assistant

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local

# Execute em desenvolvimento
npm run dev
```

### **Variáveis de Ambiente**
```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

---

## 📁 **Estrutura do Projeto**

```
ale-assistant/
├── 📱 app/
│   ├── [locale]/
│   │   ├── layout.tsx      # Layout principal
│   │   └── page.tsx        # Página inicial
│   └── layout.tsx          # Layout raiz
├── 🧩 components/
│   ├── ChatbotWidget.tsx   # Assistente Alê
│   ├── Header.tsx          # Cabeçalho com seletor
│   ├── HeroWithImages.tsx  # Seção hero principal
│   ├── LanguageSelector.tsx # Seletor de idiomas
│   └── Footer.tsx          # Rodapé
├── 🎨 styles/
│   └── globals.css         # Estilos globais
├── 🌐 messages/
│   ├── pt.json            # Traduções português
│   ├── en.json            # Traduções inglês
│   └── es.json            # Traduções espanhol
├── 🖼️ public/images/
│   ├── brazil/            # Arquitetura brasileira
│   ├── usa/               # Arquitetura americana
│   └── hispanic/          # Arquitetura hispânica
├── ⚙️ lib/
│   ├── firebase.ts        # Configuração Firebase
│   ├── i18n.ts           # Configuração i18n
│   └── imageConfig.ts     # Gerenciamento de imagens
└── 🔧 middleware.ts        # Middleware de localização
```

---

## 🎨 **Design System**

### **Paleta de Cores**
```css
Primary: #f97316 (Orange 500)
Secondary: #dc2626 (Red 600)  
Success: #16a34a (Green 600)
Background: #f8fafc (Slate 50)
Text: #1e293b (Slate 800)
```

### **Typography**
- **Headlines**: Inter, font-bold
- **Body**: Inter, font-medium
- **Captions**: Inter, font-normal

### **Componentes**
- **Buttons**: Rounded-2xl, gradientes vibrantes
- **Cards**: Backdrop-blur, sombras suaves
- **Inputs**: Focus ring orange, transições suaves

---

## 🌍 **Internacionalização**

### **Idiomas Suportados**
| Idioma | Código | Região |
|--------|--------|--------|
| Português | `pt` | Brasil, Portugal, PALOP |
| English | `en` | EUA, Reino Unido, Canadá |
| Español | `es` | Espanha, América Latina |

### **Detecção Automática**
O sistema detecta automaticamente o país do usuário e adapta:
- **Idioma da interface**
- **Imagens regionais** (arquitetura local)
- **Conteúdo contextualizado**

---

## 📊 **Métricas & Analytics**

### **KPIs Monitorados**
- **Taxa de conversão** Alê (visitante → lead)
- **Tempo de engajamento** por página
- **Distribuição geográfica** de usuários
- **Preferências de idioma** dos visitantes
- **Horários de maior atividade**

### **LGPD & Compliance**
- ✅ **Consentimento explícito** antes da coleta
- ✅ **Transparência total** sobre uso dos dados
- ✅ **Minimização de dados** (só o necessário)
- ✅ **Direito ao esquecimento** implementado
- ✅ **Logs auditáveis** para conformidade

---

## 🎭 **Filosofia do Projeto**

### **Abordagem Diplomática**
Ao invés de usar táticas de medo, focamos em:
- **Educação** sobre benefícios do software original
- **Inspiração** através de casos de sucesso
- **Suporte** para regularização gradual
- **Respeito** pelo contexto econômico brasileiro

### **Design Centrado no Usuário**
- **Progressão natural** da conscientização à ação
- **Linguagem humanizada** e acessível
- **Visual inspirador** com arquitetura brasileira
- **Experiência fluida** em todos os dispositivos

---

## 🚀 **Roadmap**

### **Fase 1 - Fundação** ✅
- [x] Plataforma base multi-idioma
- [x] Assistente Alê funcional
- [x] Design system completo
- [x] Conformidade LGPD

### **Fase 2 - Expansão** 🏗️
- [ ] Blog educacional sobre compliance
- [ ] Calculadora de ROI para licenças
- [ ] Portal do cliente
- [ ] Integração WhatsApp Business

### **Fase 3 - Inteligência** 🔮
- [ ] AI para recomendações personalizadas
- [ ] Dashboard analytics avançado
- [ ] API para integrações
- [ ] Mobile app nativo

---

## 🤝 **Contribuição**

Este é um projeto **proprietário** desenvolvido por **Anderson Henrique da Silva**. 

Para sugestões ou parcerias:
- 📧 Email: [contato@aleassistant.com.br]
- 💼 LinkedIn: [Anderson Henrique da Silva]
- 🌐 Website: [aleassistant.com.br]

---

## 📄 **Licença**

Copyright © 2025 Anderson Henrique da Silva. Todos os direitos reservados.

Este software é **proprietário** e confidencial. É proibida a reprodução, distribuição ou modificação sem autorização expressa do autor.

---

## 🙏 **Agradecimentos**

- **Antropic Claude** - Desenvolvimento assistido por IA
- **Vercel** - Hosting e deploy
- **Firebase** - Backend e autenticação
- **Comunidade React** - Ecossistema incrível
- **Arquitetos brasileiros** - Inspiração para o design

---

<div align="center">

### 🏛️ **Construído com ❤️ por Anderson Henrique da Silva**

*Promovendo ética, legalidade e profissionalismo no uso de software*

**[⭐ Star este projeto](https://github.com/anderson-henrique/ale-assistant) se ele te inspirou!**

</div>
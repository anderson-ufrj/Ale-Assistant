#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando saúde do projeto...\n');

// Verificar arquivos essenciais
const essentialFiles = [
  'package.json',
  'next.config.mjs',
  'tsconfig.json',
  '.env.local',
  'app/[locale]/layout.tsx',
  'app/[locale]/page.tsx',
  'lib/firebase.ts',
  'lib/i18n.ts'
];

let hasErrors = false;

console.log('📁 Verificando arquivos essenciais:');
essentialFiles.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - FALTANDO!`);
    hasErrors = true;
  }
});

// Verificar mensagens de tradução
console.log('\n🌐 Verificando arquivos de tradução:');
const locales = ['pt', 'en', 'es'];
locales.forEach(locale => {
  const messagePath = path.join(process.cwd(), `messages/${locale}.json`);
  if (fs.existsSync(messagePath)) {
    try {
      const content = JSON.parse(fs.readFileSync(messagePath, 'utf8'));
      console.log(`✅ ${locale}.json - Válido`);
    } catch (err) {
      console.log(`❌ ${locale}.json - JSON INVÁLIDO!`);
      hasErrors = true;
    }
  } else {
    console.log(`❌ ${locale}.json - FALTANDO!`);
    hasErrors = true;
  }
});

// Verificar variáveis de ambiente
console.log('\n🔐 Verificando variáveis de ambiente:');
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const requiredEnvVars = [
    'NEXT_PUBLIC_FIREBASE_API_KEY',
    'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
    'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
    'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
    'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
    'NEXT_PUBLIC_FIREBASE_APP_ID'
  ];
  
  requiredEnvVars.forEach(varName => {
    if (envContent.includes(varName)) {
      console.log(`✅ ${varName}`);
    } else {
      console.log(`❌ ${varName} - FALTANDO!`);
      hasErrors = true;
    }
  });
} else {
  console.log('❌ .env.local - ARQUIVO FALTANDO!');
  hasErrors = true;
}

// Verificar dependências
console.log('\n📦 Verificando dependências principais:');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const requiredDeps = ['next', 'react', 'react-dom', 'firebase', 'next-intl', 'tailwindcss'];

requiredDeps.forEach(dep => {
  if (packageJson.dependencies[dep] || packageJson.devDependencies[dep]) {
    console.log(`✅ ${dep}`);
  } else {
    console.log(`❌ ${dep} - FALTANDO!`);
    hasErrors = true;
  }
});

console.log('\n' + (hasErrors ? '❌ Foram encontrados problemas!' : '✅ Tudo parece estar OK!'));

if (hasErrors) {
  console.log('\n💡 Sugestões:');
  console.log('1. Execute: npm install');
  console.log('2. Verifique se o arquivo .env.local existe');
  console.log('3. Certifique-se de que todos os arquivos foram salvos');
  process.exit(1);
}

process.exit(0);
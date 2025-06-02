#!/usr/bin/env node

const { spawn } = require('child_process');
const http = require('http');
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 3000;
const MAX_RETRIES = 5;
const RETRY_DELAY = 2000;

// Kill any process on port 3000
const killPort = async () => {
  return new Promise((resolve) => {
    const kill = spawn('kill', ['-9', `$(lsof -t -i:${PORT})`], { shell: true });
    kill.on('close', () => resolve());
    kill.on('error', () => resolve());
    setTimeout(resolve, 1000); // Wait a bit to ensure port is free
  });
};

// Check if server is healthy
const checkHealth = (retries = 0) => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: PORT,
      path: '/api/health',
      method: 'GET',
      timeout: 5000
    };

    const req = http.request(options, (res) => {
      if (res.statusCode === 200) {
        resolve(true);
      } else if (retries < MAX_RETRIES) {
        console.log(`⏳ Health check failed, retrying... (${retries + 1}/${MAX_RETRIES})`);
        setTimeout(() => {
          checkHealth(retries + 1).then(resolve).catch(reject);
        }, RETRY_DELAY);
      } else {
        reject(new Error(`Health check failed after ${MAX_RETRIES} retries`));
      }
    });

    req.on('error', (error) => {
      if (retries < MAX_RETRIES) {
        console.log(`⏳ Server not ready, retrying... (${retries + 1}/${MAX_RETRIES})`);
        setTimeout(() => {
          checkHealth(retries + 1).then(resolve).catch(reject);
        }, RETRY_DELAY);
      } else {
        reject(error);
      }
    });

    req.on('timeout', () => {
      req.destroy();
      if (retries < MAX_RETRIES) {
        console.log(`⏳ Health check timeout, retrying... (${retries + 1}/${MAX_RETRIES})`);
        setTimeout(() => {
          checkHealth(retries + 1).then(resolve).catch(reject);
        }, RETRY_DELAY);
      } else {
        reject(new Error('Health check timeout'));
      }
    });

    req.end();
  });
};

// Start the Next.js server
const startServer = async () => {
  console.log('🔧 Preparando para iniciar o servidor...');
  
  // Kill any existing process on the port
  console.log('🗑️  Liberando porta 3000...');
  await killPort();
  
  // Check if node_modules exists
  if (!fs.existsSync(path.join(process.cwd(), 'node_modules'))) {
    console.log('📦 Instalando dependências...');
    const install = spawn('npm', ['install'], { stdio: 'inherit' });
    await new Promise((resolve) => install.on('close', resolve));
  }
  
  console.log(`🚀 Iniciando servidor Next.js na porta ${PORT}...`);
  
  const server = spawn('npm', ['run', 'dev'], {
    stdio: 'inherit',
    env: { ...process.env, PORT }
  });

  server.on('error', (error) => {
    console.error('❌ Erro ao iniciar servidor:', error.message);
    process.exit(1);
  });

  // Wait a bit for server to start
  await new Promise(resolve => setTimeout(resolve, 5000));
  
  // Check server health
  console.log('🏥 Verificando saúde do servidor...');
  
  try {
    await checkHealth();
    console.log('✅ Servidor está rodando e saudável!');
    console.log(`🌐 Acesse: http://localhost:${PORT}`);
    console.log('\n💡 Pressione Ctrl+C para parar o servidor');
  } catch (error) {
    console.error('❌ Servidor não respondeu ao health check:', error.message);
    console.log('\n💡 O servidor pode estar iniciando. Tente acessar manualmente em alguns segundos.');
    console.log(`🌐 URL: http://localhost:${PORT}`);
  }
  
  // Handle shutdown
  process.on('SIGINT', () => {
    console.log('\n🛑 Parando servidor...');
    server.kill();
    process.exit(0);
  });
};

// Run if called directly
if (require.main === module) {
  startServer().catch((error) => {
    console.error('❌ Erro fatal:', error.message);
    process.exit(1);
  });
}

module.exports = { startServer, checkHealth };
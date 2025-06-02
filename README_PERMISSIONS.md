# Resolvendo Problemas de Permissões

## Problema
Às vezes, a pasta `.next` fica com permissões de root, impedindo o Next.js de funcionar.

## Solução Rápida

### Opção 1: Usar o script de correção
```bash
sudo ./fix-permissions.sh
npm run dev
```

### Opção 2: Usar os novos comandos npm
```bash
# Limpar cache e iniciar
npm run dev:clean

# Ou apenas corrigir permissões
npm run fix:permissions
```

### Opção 3: Manualmente
```bash
sudo rm -rf .next
npm run dev
```

## Prevenção

Para evitar problemas futuros:

1. **NUNCA use sudo com npm/yarn**
   ```bash
   # ❌ Errado
   sudo npm install
   sudo npm run dev
   
   # ✅ Correto
   npm install
   npm run dev
   ```

2. **Se precisar instalar algo globalmente**
   ```bash
   # Configure npm para não precisar de sudo
   npm config set prefix ~/.npm-global
   echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
   source ~/.bashrc
   ```

3. **Scripts úteis adicionados**
   - `npm run clean` - Remove .next e node_modules
   - `npm run clean:cache` - Remove apenas .next
   - `npm run fix:permissions` - Corrige permissões
   - `npm run dev:clean` - Limpa cache e inicia dev
   - `npm run reinstall` - Limpa tudo e reinstala

## Checklist de Resolução

1. ✅ Executar `sudo ./fix-permissions.sh`
2. ✅ Verificar se não há processos antigos rodando
3. ✅ Executar `npm run dev`
4. ✅ Acessar http://localhost:3000/pt
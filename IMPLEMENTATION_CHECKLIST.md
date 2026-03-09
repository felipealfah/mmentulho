# ✅ Checklist de Implementação - Web Performance Optimization

**Projeto:** MM Entulho - Caçambas Brasília  
**Data:** 2026-03-09  
**Status:** Pronto para implementação

---

## 📋 FASE 1: Preparação (5-10 min)

- [ ] **1.1** Abrir terminal no diretório do projeto
```bash
cd /Users/felipefull/Documents/Projetos/localseo/projetos/cacambasbrasilia/site
```

- [ ] **1.2** Verificar versão do Node
```bash
node --version  # Deve ser >= 14
npm --version
```

- [ ] **1.3** Verificar que imagens existem em `/public/`
```bash
ls -la public/*.webp
```

- [ ] **1.4** Instalar Sharp (biblioteca de otimização)
```bash
npm install --save-dev sharp
```

---

## 📦 FASE 2: Validar Arquivos (2-3 min)

- [ ] **2.1** Verificar que todos os arquivos foram criados
```bash
# Arquivos que devem existir:
ls -la src/layouts/BaseLayout.astro          # ✅ Modificado
ls -la src/components/Hero.astro              # ✅ Modificado  
ls -la src/components/ResponsiveImage.astro   # ✅ Novo
ls -la scripts/optimize-images.js             # ✅ Novo
ls -la astro.config.mjs                       # ✅ Modificado
ls -la wrangler.toml                          # ✅ Novo
ls -la _redirects                             # ✅ Novo
```

- [ ] **2.2** Revisar mudanças no Git
```bash
git status  # Ver arquivos modificados/novos
git diff src/layouts/BaseLayout.astro        # Revisar LCP preload
git diff src/components/Hero.astro           # Revisar fetchpriority
```

---

## 🖼️ FASE 3: Otimizar Imagens (2-5 min)

- [ ] **3.1** Executar script de otimização
```bash
node scripts/optimize-images.js
```

- [ ] **3.2** Aguardar conclusão (verá output similar a):
```
📸 Processando: cacamba_de_entulho _em_brasilia.webp
   Dimensões originais: 1536x1024
   ✅ 1200w: AVIF 45.2KiB | WebP 52.1KiB | JPEG 58.3KiB
   ✅ 800w: AVIF 28.1KiB | WebP 32.5KiB | JPEG 37.2KiB
   ✅ 400w: AVIF 12.3KiB | WebP 14.8KiB | JPEG 17.6KiB
✨ Concluído em 2345ms
```

- [ ] **3.3** Verificar pasta de output
```bash
ls -lah public/optimized/ | head -20
du -sh public/optimized/          # Ver tamanho total
```

Esperado: ~1-2MB total (economizado ~5.5MB)

- [ ] **3.4** Visualizar exemplos de srcset
```bash
# O script exibiu exemplos de <picture> tags
# Copie esses exemplos para usar nos componentes
```

---

## 🏗️ FASE 4: Build Local (3-5 min)

- [ ] **4.1** Limpar build anterior
```bash
rm -rf dist/ .astro/
```

- [ ] **4.2** Fazer build
```bash
npm run build
```

Aguardar mensagem de sucesso:
```
✓ Completed in 45.23s.
```

- [ ] **4.3** Verificar que build criou `dist/`
```bash
ls -la dist/ | head -10
du -sh dist/  # Ver tamanho do bundle
```

Esperado: `dist/` deve ser criado com sucesso

---

## 🧪 FASE 5: Testar Localmente (5-10 min)

- [ ] **5.1** Iniciar servidor preview
```bash
npm run preview
```

Aguardar:
```
  ➜ Local: http://localhost:3000/
```

- [ ] **5.2** Abrir site em navegador
```
http://localhost:3000
```

- [ ] **5.3** Verificar que:
  - [ ] Página carrega sem erros
  - [ ] Imagens aparecem corretamente
  - [ ] Menu funciona
  - [ ] Links funcionam
  - [ ] Nenhum erro no console (F12 > Console)

- [ ] **5.4** Executar Lighthouse (Chrome DevTools)
```
1. Abrir Chrome DevTools (F12)
2. Ir em "Lighthouse"
3. Clicar "Analyze page load" (Mobile)
4. Aguardar resultado
```

Esperado:
- LCP < 3.0s (melhorado)
- Performance > 75

- [ ] **5.5** Parar servidor preview (Ctrl+C)

---

## 🔐 FASE 6: Commit e Deploy (3-5 min)

- [ ] **6.1** Ver status do git
```bash
git status
```

Esperado: Ver arquivos novos e modificados

- [ ] **6.2** Adicionar todos os arquivos
```bash
git add .
```

- [ ] **6.3** Fazer commit
```bash
git commit -m "perf: optimize core web vitals

- Add LCP image preload with fetchpriority=high
- Implement CSS code-splitting in Astro config
- Create image optimization script for AVIF/WebP conversion
- Add ResponsiveImage component for optimized images
- Configure Cloudflare cache headers (wrangler.toml)
- Add DNS prefetch for critical routes
- Estimated savings: 5.5MB on page load

Metrics improvement expected:
- LCP: 6.0s → 2.0-2.5s (60-67% improvement)
- FCP: 3.3s → 1.5-2.0s (40-55% improvement)
- Page size: 10-12MB → 4-5MB (50-60% reduction)
- Lighthouse: ~60 → ~90-94"
```

- [ ] **6.4** Fazer push para Git
```bash
git push origin main
```

Aguardar:
- GitHub Actions rodando
- Cloudflare Pages fazendo deploy

---

## 📊 FASE 7: Validação Pós-Deploy (5-10 min)

- [ ] **7.1** Aguardar deploy completar (2-3 minutos)

- [ ] **7.2** Verificar site em produção
```
https://mmentulho.com.br
```

- [ ] **7.3** Rodar PageSpeed Insights
```
https://pagespeed.web.dev/?url=https://mmentulho.com.br
```

Capturar screenshot com métricas

- [ ] **7.4** Verificar Google Search Console (opcional)
```
https://search.google.com/search-console
Verificar Core Web Vitals
```

- [ ] **7.5** Verificar Cloudflare Dashboard
```
1. Ir em: https://dash.cloudflare.com
2. Selecionar mmentulho.com.br
3. Ir em: Analytics > Web Analytics
4. Verificar tráfego
```

---

## 📈 FASE 8: Monitoramento (Contínuo)

**Dia 1:**
- [ ] Verificar se site está online
- [ ] Não há erros no console
- [ ] Imagens carregam

**Semana 1:**
- [ ] Monitorar PageSpeed Insights diariamente
- [ ] Verificar Google Search Console
- [ ] Comparar com baseline anterior

**Semana 2-4:**
- [ ] Coletar dados de Core Web Vitals reais
- [ ] Analisar feedback de usuários
- [ ] Identificar oportunidades de melhoria adicional

---

## 🎯 Métricas Esperadas

Após conclusão, você deve ver melhorias em:

```
ANTES:
┌──────────────────────────────────┐
│ LCP:  6.0s    ❌ Precisa melhorar │
│ FCP:  3.3s    ❌ Precisa melhorar │
│ CLS:  0       ✅ Bom             │
│ TBT:  10ms    ✅ Bom             │
│ Size: 10-12MB ❌ Muito grande    │
└──────────────────────────────────┘

DEPOIS (esperado):
┌──────────────────────────────────┐
│ LCP:  2.0-2.5s ✅ Excelente       │
│ FCP:  1.5-2.0s ✅ Excelente       │
│ CLS:  0        ✅ Mantido        │
│ TBT:  ~5ms     ✅ Mantido        │
│ Size: 4-5MB    ✅ 50-60% menor   │
└──────────────────────────────────┘
```

---

## 🚨 Troubleshooting

**Problema: "sharp not found"**
```bash
Solução: npm install --save-dev sharp
         npm install  (para reinstalar tudo)
```

**Problema: Script não encontra imagens**
```bash
Solução: ls -la public/*.webp
         Verificar que as imagens existem
         Editar baseName no script se necessário
```

**Problema: Build falha**
```bash
Solução: rm -rf node_modules/ dist/ .astro/
         npm install
         npm run build
```

**Problema: Imagens não carregam após deploy**
```bash
Solução: Verificar se pasta /public/optimized/ foi enviada
         Limpar cache Cloudflare (Dashboard > Caching > Purge)
```

**Problema: Site está mais lento**
```bash
Solução: Verificar DevTools (F12 > Network)
         Verificar se há erros (F12 > Console)
         Limpar cache local do navegador (Ctrl+Shift+Delete)
```

---

## 📚 Documentação Consultável

Se tiver dúvidas, consulte:

1. **README_PERFORMANCE.md** - Resumo visual das mudanças
2. **OTIMIZACOES_APLICADAS.md** - Guia passo-a-passo
3. **PERFORMANCE_OPTIMIZATION.md** - Documentação técnica completa

---

## ✨ Próximos Passos Opcionais

Após concluir checklist principal:

- [ ] Implementar Web Vitals monitoring
- [ ] Adicionar Analytics do Core Web Vitals
- [ ] Otimizar Google Maps (lazy load)
- [ ] Implementar Service Worker para cache offline
- [ ] A/B test com usuários reais

---

## 📞 Suporte

Se algo não funcionar:

1. Consulte a documentação
2. Tente os troubleshooting acima
3. Verifique Node.js version >= 14
4. Verifique espaço em disco
5. Tente em outro terminal limpo

---

**Status Final:** [ ] Checklist Completo ✅

**Data de Conclusão:** ________

**Tempo Gasto:** ________

**Notas:** ________________________________________________________________

---

**Parabéns!** 🎉 Seu site está otimizado para Web Core Vitals!

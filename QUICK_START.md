# ⚡ Quick Start - Performance Optimization

**Tempo estimado:** 30 minutos de trabalho (2-5 min de execução de scripts)

---

## 1️⃣ INSTALAR DEPENDÊNCIA (5 min)

```bash
cd /Users/felipefull/Documents/Projetos/localseo/projetos/cacambasbrasilia/site
npm install --save-dev sharp
```

---

## 2️⃣ OTIMIZAR IMAGENS (2 min)

```bash
node scripts/optimize-images.js
```

**Resultado esperado:**
- Pasta `/public/optimized/` criada
- Imagens em AVIF, WebP e JPEG
- Economia de ~5.5MB

---

## 3️⃣ TESTAR LOCALMENTE (10 min)

```bash
# Limpar e fazer build
rm -rf dist/ .astro/
npm run build

# Iniciar preview
npm run preview
```

Abrir: http://localhost:3000

Rodar Lighthouse:
- F12 → Lighthouse → Analyze page load

Esperado: Performance > 75, LCP < 3.0s

---

## 4️⃣ FAZER DEPLOY (5 min)

```bash
git add .
git commit -m "perf: optimize core web vitals - LCP preload, image optimization, cache rules"
git push origin main
```

---

## 5️⃣ VALIDAR (5 min)

Abrir: https://mmentulho.com.br

Rodar PageSpeed Insights:
https://pagespeed.web.dev/?url=https://mmentulho.com.br

Comparar com baseline anterior.

---

## 📊 Métricas Esperadas

| Métrica | Antes | Depois |
|---------|-------|--------|
| LCP | 6.0s | 2.0-2.5s ✅ |
| FCP | 3.3s | 1.5-2.0s ✅ |
| Tamanho | 10-12MB | 4-5MB ✅ |

---

## 🆘 Algo deu errado?

Consulte:
- `IMPLEMENTATION_CHECKLIST.md` - Checklist completo
- `OTIMIZACOES_APLICADAS.md` - Guia passo-a-passo
- `PERFORMANCE_OPTIMIZATION.md` - Documentação técnica

---

## ✅ Pronto!

Seu site agora está otimizado para Core Web Vitals! 🚀

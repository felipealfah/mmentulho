# Performance Optimization - Caçambas Brasília

## 🎯 Otimizações Implementadas

### 1. **LCP (Largest Contentful Paint) - Preload otimizado**
- **Problema:** LCP de 6.0s (objetivo: < 2.5s)
- **Solução:**
  - ✅ Adicionado preload da imagem hero com `fetchpriority="high"`
  - ✅ Corrigido caminho da imagem LCP no BaseLayout.astro
  - ✅ Aplicado `data-fetch-priority="high"` no Hero component

### 2. **FCP (First Contentful Paint) - 3.3s para < 2.5s**
- **Implementado:**
  - ✅ Critical CSS inline (via Tailwind + Astro)
  - ✅ Defer de scripts não-críticos
  - ✅ Preload de recursos críticos

### 3. **Rendering-Blocking Requests**
- **CSS do Contato:** Atualmente bloqueando 510ms de latência
- **Solução aplicada:**
  - ✅ CSS é crítico, mas já otimizado com Tailwind
  - ✅ Astro + Tailwind gera CSS crítico automaticamente
  - ✅ CSS não-crítico marcado com `media` queries

### 4. **Otimização de Imagens - Economia estimada: 5.5MB**

#### Imagens a otimizar (com prioridade):

| Imagem | Tamanho Atual | Redução Estimada | Ação |
|--------|---------------|------------------|------|
| /cacamba_de_entulho _em_brasilia.webp | 1.976 KiB | 1.720 KiB (87%) | Reduzir compactação |
| /aluguel_cacamba_entulhobrasilia.webp | 1.943 KiB | 1.931 KiB (99.4%) | Usar imagem responsiva |
| /tele_entulho_brasilia.webp | 1.854 KiB | 1.842 KiB (99.3%) | Usar imagem responsiva |
| /mm_entulho.webp (Logo) | 53.3 KiB | 50.9 KiB (95%) | Reduzir e usar responsiva |
| Google Maps Image | 39.2 KiB | 19.4 KiB (50%) | Usar AVIF + WebP |

**Ações recomendadas:**

```bash
# 1. Instalar ferramentas de otimização
npm install -D sharp imagemin imagemin-webp imagemin-avif

# 2. Criar script de otimização (save como scripts/optimize-images.js)
# Veja abaixo para o código

# 3. Executar otimização
node scripts/optimize-images.js
```

**Script de Otimização de Imagens:**

Crie o arquivo `scripts/optimize-images.js`:

```javascript
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sourceDir = './public';
const outputDir = './public/optimized';

// Criar diretório se não existir
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Arquivos a otimizar
const imagesToOptimize = [
  'cacamba_de_entulho _em_brasilia.webp',
  'aluguel_cacamba_entulhobrasilia.webp',
  'tele_entulho_brasilia.webp',
  'mm_entulho.webp'
];

async function optimizeImage(filename) {
  const inputPath = path.join(sourceDir, filename);
  const baseName = path.parse(filename).name;

  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    console.log(`Otimizando ${filename} (${metadata.width}x${metadata.height})...`);

    // Gerar AVIF (melhor compressão)
    await image
      .avif({ quality: 70, effort: 6 })
      .toFile(path.join(outputDir, `${baseName}.avif`));

    // Gerar WebP (boa compressão)
    await sharp(inputPath)
      .webp({ quality: 75 })
      .toFile(path.join(outputDir, `${baseName}.webp`));

    // Gerar otimizado original (para fallback)
    await sharp(inputPath)
      .toFile(path.join(outputDir, `${baseName}-original.webp`));

    console.log(`✅ ${filename} otimizado com sucesso`);
  } catch (error) {
    console.error(`❌ Erro otimizando ${filename}:`, error.message);
  }
}

async function main() {
  console.log('🖼️  Iniciando otimização de imagens...\n');

  for (const filename of imagesToOptimize) {
    await optimizeImage(filename);
  }

  console.log('\n✨ Otimização concluída!');
  console.log('📦 Imagens otimizadas estão em ./public/optimized/');
}

main();
```

**Uso em componentes Astro:**

```astro
---
// Exemplo: Services.astro
import { Image } from 'astro:assets';
import cacambaImage from '../assets/images/cacamba.webp';
---

<!-- Usando com componente Image do Astro -->
<Image
  src={cacambaImage}
  alt="Caçamba de Entulho"
  width={400}
  height={300}
  format="webp"
/>

<!-- Ou com responsive images em HTML puro -->
<picture>
  <source
    srcset="/optimized/cacamba.avif"
    type="image/avif"
  />
  <source
    srcset="/optimized/cacamba.webp"
    type="image/webp"
  />
  <img
    src="/optimized/cacamba-original.webp"
    alt="Caçamba de Entulho"
    width="400"
    height="300"
    loading="lazy"
  />
</picture>
```

### 5. **Cache Lifecycle - TTL otimizado**

**Configuração no Cloudflare (wrangler.toml):**

```toml
# Fonts (1 ano)
[[rules]]
globs = ["*.woff2", "*.ttf", "*.eot"]
cache_ttl = 31536000

# Imagens (30 dias)
[[rules]]
globs = ["*.webp", "*.avif", "*.jpg", "*.png", "*.gif"]
cache_ttl = 2592000

# Assets estáticos (7 dias)
[[rules]]
globs = ["*.css", "*.js"]
cache_ttl = 604800

# HTML (1 dia - não cachear por muito tempo)
[[rules]]
globs = ["*.html"]
cache_ttl = 86400
```

**Headers recomendados no Cloudflare Dashboard:**

```
# Règle para imagens
Corresponde a: *.webp OR *.avif OR *.jpg OR *.png
Browser Cache TTL: 1 mês
Cache Level: Cache Everything

# Regra para JavaScript/CSS
Corresponde a: *.js OR *.css
Browser Cache TTL: 7 dias
Cache Level: Cache Everything

# Regra para Fonts
Corresponde a: *.woff2 OR *.ttf
Browser Cache TTL: 1 ano
Cache Level: Cache Everything
```

### 6. **Rede - Reduzir Cadeia Crítica (510ms → objetivo: < 300ms)**

**Problema atual:**
- Navigation (284ms)
- CSS do contato (510ms)
- Email decode (408ms)

**Solução implementada:**

✅ **Defer de recursos não-críticos:**
```html
<!-- Em BaseLayout.astro: Scripts devem ser defer ou async -->
<script defer src="..."></script>
```

✅ **DNS Prefetch já configurado para:**
- /
- /sobre
- /servicos
- /contato

✅ **Critical CSS:**
- Tailwind já otimiza o CSS crítico automaticamente

### 7. **Total Blocking Time (10ms) - ✅ Excelente**
- Já está dentro do target (< 50ms)
- Manter monitoramento

### 8. **Cumulative Layout Shift (0) - ✅ Perfeito**
- Nenhuma mudança de layout
- Manter assim: todas as imagens têm width/height

## 📊 Métricas Esperadas Após Otimizações

| Métrica | Antes | Depois | Target | Status |
|---------|-------|--------|--------|--------|
| LCP | 6.0s | ~2.5s | < 2.5s | 🟢 |
| FCP | 3.3s | ~2.0s | < 1.8s | 🟡 |
| CLS | 0 | 0 | < 0.1 | 🟢 |
| TBT | 10ms | ~5ms | < 50ms | 🟢 |
| Speed Index | 5.0s | ~2.5s | < 2.5s | 🟢 |

## 🚀 Próximos Passos

### 1. **Otimizar Imagens (PRIORIDADE MÁXIMA)**
```bash
# Executar script de otimização
node scripts/optimize-images.js

# Verificar tamanhos
du -h public/optimized/
```

### 2. **Testar e Validar**
```bash
npm run build
npm run preview
# Executar Lighthouse audit no Preview
```

### 3. **Implementar no Cloudflare Pages**
- Fazer push para Git
- Cloudflare Pages fará deploy automático
- Configurar headers de cache no Dashboard

### 4. **Monitorar Core Web Vitals**
- Usar Google Search Console
- PageSpeed Insights
- Monitorar em tempo real com Web Vitals JS library

## 🔍 Ferramentas de Monitoramento

**Adicionar monitoramento de Web Vitals:**

```astro
---
// src/components/WebVitals.astro
---

<script>
  import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

  getCLS(console.log);
  getFID(console.log);
  getFCP(console.log);
  getLCP(console.log);
  getTTFB(console.log);
</script>
```

## 📚 Referências

- [Web.dev - Performance](https://web.dev/performance/)
- [Core Web Vitals Guide](https://web.dev/vitals/)
- [Astro Performance](https://docs.astro.build/guides/performance/)
- [Cloudflare Cache](https://developers.cloudflare.com/cache/)
- [Sharp Image Processing](https://sharp.pixelplumbing.com/)

## ✅ Checklist de Implementação

- [x] Preload LCP image com fetchpriority="high"
- [x] Otimizar astro.config para CSS code split
- [x] Configurar cache rules no Cloudflare
- [ ] **Otimizar imagens com sharp** (próximo passo)
- [ ] Testar Lighthouse audit
- [ ] Implementar Web Vitals monitoring
- [ ] Validar após deploy
- [ ] Monitorar por 2 semanas
- [ ] Ajustar conforme necessário

---

**Status:** 🟢 Implementação em progresso
**Próxima Review:** Após otimização de imagens

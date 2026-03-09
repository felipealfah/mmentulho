#!/usr/bin/env node

/**
 * Image Optimization Script
 * Converte imagens para formatos modernos (AVIF, WebP) com múltiplas resoluções
 * Uso: node scripts/optimize-images.js
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDir = path.join(__dirname, '../public');
const outputDir = path.join(__dirname, '../public/optimized');

// Criar diretório de saída se não existir
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
  console.log(`✅ Diretório criado: ${outputDir}`);
}

// Imagens a otimizar com suas resoluções alvo
const imagesToOptimize = [
  {
    name: 'cacamba_de_entulho _em_brasilia.webp',
    sizes: [1200, 800, 400], // Resoluções responsivas
    priority: 'high' // Imagem LCP
  },
  {
    name: 'aluguel_cacamba_entulhobrasilia.webp',
    sizes: [800, 400],
    priority: 'medium'
  },
  {
    name: 'tele_entulho_brasilia.webp',
    sizes: [800, 400],
    priority: 'medium'
  },
  {
    name: 'mm_entulho.webp',
    sizes: [400, 200], // Logo, tamanhos menores
    priority: 'high'
  }
];

// Configurações de qualidade por formato
const qualitySettings = {
  avif: { quality: 70, effort: 6 },
  webp: { quality: 75 },
  jpeg: { quality: 80, progressive: true }
};

/**
 * Otimiza uma imagem para múltiplos formatos e resoluções
 */
async function optimizeImage(filename, sizes, priority) {
  const inputPath = path.join(sourceDir, filename);

  // Verificar se arquivo existe
  if (!fs.existsSync(inputPath)) {
    console.error(`❌ Arquivo não encontrado: ${inputPath}`);
    return;
  }

  const baseName = path.parse(filename).name;
  const startTime = Date.now();

  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    console.log(`\n📸 Processando: ${filename}`);
    console.log(`   Dimensões originais: ${metadata.width}x${metadata.height}`);
    console.log(`   Tamanho original: ${(fs.statSync(inputPath).size / 1024).toFixed(2)} KiB`);
    console.log(`   Prioridade: ${priority}`);
    console.log(`   Resoluções alvo: ${sizes.join('px, ')}px`);

    // Gerar versões para cada resolução
    for (const size of sizes) {
      // Calcular altura mantendo aspect ratio
      const height = Math.round((metadata.height / metadata.width) * size);

      // AVIF (melhor compressão)
      const avifPath = path.join(outputDir, `${baseName}-${size}w.avif`);
      await sharp(inputPath)
        .resize(size, height, { fit: 'cover', position: 'center' })
        .avif(qualitySettings.avif)
        .toFile(avifPath);
      const avifSize = fs.statSync(avifPath).size / 1024;

      // WebP (boa compressão, melhor compatibilidade)
      const webpPath = path.join(outputDir, `${baseName}-${size}w.webp`);
      await sharp(inputPath)
        .resize(size, height, { fit: 'cover', position: 'center' })
        .webp(qualitySettings.webp)
        .toFile(webpPath);
      const webpSize = fs.statSync(webpPath).size / 1024;

      // JPEG (fallback)
      const jpegPath = path.join(outputDir, `${baseName}-${size}w.jpg`);
      await sharp(inputPath)
        .resize(size, height, { fit: 'cover', position: 'center' })
        .jpeg(qualitySettings.jpeg)
        .toFile(jpegPath);
      const jpegSize = fs.statSync(jpegPath).size / 1024;

      console.log(`   ✅ ${size}w: AVIF ${avifSize.toFixed(2)}KiB | WebP ${webpSize.toFixed(2)}KiB | JPEG ${jpegSize.toFixed(2)}KiB`);
    }

    // Gerar versão full-size para fallback
    const fullAvif = path.join(outputDir, `${baseName}-full.avif`);
    await sharp(inputPath)
      .avif(qualitySettings.avif)
      .toFile(fullAvif);

    const fullWebp = path.join(outputDir, `${baseName}-full.webp`);
    await sharp(inputPath)
      .webp(qualitySettings.webp)
      .toFile(fullWebp);

    const duration = Date.now() - startTime;
    console.log(`✨ Concluído em ${duration}ms`);

  } catch (error) {
    console.error(`❌ Erro ao processar ${filename}:`, error.message);
  }
}

/**
 * Gera arquivo HTML de exemplo com srcset responsivo
 */
function generateExampleHTML(baseName, sizes) {
  const srcset = sizes
    .map(size => `/optimized/${baseName}-${size}w.webp ${size}w`)
    .join(', ');

  const avifSrcset = sizes
    .map(size => `/optimized/${baseName}-${size}w.avif ${size}w`)
    .join(', ');

  return `<picture>
  <!-- AVIF para navegadores que suportam (melhor compressão) -->
  <source
    srcset="${avifSrcset}"
    sizes="(max-width: 768px) 100vw, 50vw"
    type="image/avif"
  />

  <!-- WebP para navegadores que suportam -->
  <source
    srcset="${srcset}"
    sizes="(max-width: 768px) 100vw, 50vw"
    type="image/webp"
  />

  <!-- Fallback JPEG -->
  <img
    src="/optimized/${baseName}-full.webp"
    srcset="${srcset}"
    sizes="(max-width: 768px) 100vw, 50vw"
    alt="Imagem otimizada"
    loading="lazy"
    decoding="async"
  />
</picture>`;
}

/**
 * Função principal
 */
async function main() {
  console.log('🖼️  =====================================');
  console.log('   Image Optimization Script');
  console.log('=====================================\n');

  const startTime = Date.now();
  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;

  // Processar cada imagem
  for (const { name, sizes, priority } of imagesToOptimize) {
    const originalPath = path.join(sourceDir, name);
    if (fs.existsSync(originalPath)) {
      totalOriginalSize += fs.statSync(originalPath).size;
    }
    await optimizeImage(name, sizes, priority);
  }

  // Calcular tamanho total otimizado
  if (fs.existsSync(outputDir)) {
    const files = fs.readdirSync(outputDir);
    for (const file of files) {
      totalOptimizedSize += fs.statSync(path.join(outputDir, file)).size;
    }
  }

  const duration = Date.now() - startTime;
  const savings = totalOriginalSize - totalOptimizedSize;
  const savingsPercent = ((savings / totalOriginalSize) * 100).toFixed(1);

  console.log('\n\n📊 =====================================');
  console.log('   Resumo da Otimização');
  console.log('=====================================');
  console.log(`Tamanho original: ${(totalOriginalSize / 1024).toFixed(2)} KiB`);
  console.log(`Tamanho otimizado: ${(totalOptimizedSize / 1024).toFixed(2)} KiB`);
  console.log(`Economia: ${(savings / 1024).toFixed(2)} KiB (${savingsPercent}%)`);
  console.log(`Tempo total: ${(duration / 1000).toFixed(2)}s`);
  console.log('=====================================\n');

  // Gerar exemplo de HTML
  console.log('📝 Exemplos de uso em componentes Astro:\n');
  for (const { name, sizes } of imagesToOptimize) {
    const baseName = path.parse(name).name;
    console.log(`<!-- ${name} -->`);
    console.log(generateExampleHTML(baseName, sizes));
    console.log('\n');
  }

  console.log('✨ Otimização concluída com sucesso!');
  console.log('📦 Imagens estão em: ./public/optimized/\n');
}

// Executar
main().catch(error => {
  console.error('Erro fatal:', error);
  process.exit(1);
});

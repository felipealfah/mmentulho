// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import compress from 'astro-compress';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  // Site URL para geração de sitemap e canonical URLs
  // Para Cloudflare Pages: https://[projeto].pages.dev
  // Para domínio customizado: atualize aqui
  site: 'https://mmentulho.com.br',

  integrations: [
    react(),
    tailwind(),
    sitemap({
      // Configuração de sitemap para SEO
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      filter: (page) => {
        // Excluir páginas de admin ou privadas
        return !page.includes('/admin') && !page.includes('/private');
      },
    }),
    compress({
      CSS: true,
      HTML: {
        removeAttributeQuotes: false,
      },
      Image: true,
      JavaScript: true,
      SVG: true,
    }),
  ],

  output: 'server',
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),

  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },

  vite: {
    resolve: {
      alias: {
        '@data': '/src/data',
        '@components': '/src/components',
        '@layouts': '/src/layouts',
        '@utils': '/src/utils',
        '@styles': '/src/styles',
      },
    },
    build: {
      minify: 'terser',
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom'],
          },
        },
      },
    },
  },
});

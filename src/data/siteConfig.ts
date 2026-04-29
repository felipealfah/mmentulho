/**
 * Configuração centralizada do site MM Entulho.
 * Dados de NAP, branding, social e SEO.
 */

export const siteConfig = {
  // ── Identidade ──────────────────────────────
  name: "MM Entulho",
  shortName: "MM Entulho",
  description: "Aluguel de caçambas de entulho em Brasília e DF. Entrega rápida em até 2 horas, rastreamento GPS e descarte responsável. Orçamento grátis!",
  url: "https://mmentulho.com.br",

  // ── NAP (Name, Address, Phone) ──────────────
  phone: "(61) 97402-2227",
  whatsapp: "5561974022227",
  whatsappMessage: "Gostaria de orçamento de caçamba de entulho",
  email: "contato@mmentulho.com.br",
  address: {
    street: "Brasília",
    city: "Brasília",
    state: "DF",
    zip: "72000-000",
    country: "BR",
  },

  // ── Branding ────────────────────────────────
  themeColor: "#dfb43e",
  logo: "/mm_entulho.webp",
  ogImage: "/mm_entulho.webp",

  // ── Social ──────────────────────────────────
  social: {
    facebook: "",
    instagram: "",
  },

  // ── Horário de funcionamento ────────────────
  openingHours: {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "07:00",
    closes: "18:00",
  },

  // ── SEO ─────────────────────────────────────
  priceRange: "R$ 200 - R$ 800",
  geo: {
    latitude: "-15.7801",
    longitude: "-47.9292",
  },
};

// Helper: URL do WhatsApp formatada
export function getWhatsAppUrl(customMessage?: string): string {
  const msg = encodeURIComponent(customMessage || siteConfig.whatsappMessage);
  return `https://wa.me/${siteConfig.whatsapp}?text=${msg}`;
}

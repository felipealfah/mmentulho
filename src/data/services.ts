// Service and Region Data for MM Entulho

export interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  icon: string;
  image?: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  features: string[];
  benefits: string[];
  price: string;
  priceDetails?: string;
  color: 'primary' | 'secondary';
  order: number;
}

export interface Region {
  id: string;
  name: string;
  slug: string;
  area: string;
  zipCodes: string[];
  neighborhoods: string[];
}

export interface ServiceRegion {
  serviceId: string;
  regionId: string;
  title: string;
  description: string;
  keywords: string[];
  specialOffer?: string;
}

// ============================================
// SERVICES - 2 Main Services
// ============================================

export const services: Service[] = [
  {
    id: 'caçamba-entulho',
    name: 'Locação de Caçamba de Entulho',
    slug: 'locacao-cacamba',
    description: 'Aluguel de caçambas de entulho em diversos tamanhos (4m³, 6m³ e 8m³) para reformas, demolições e obras em Brasília e DF. Entrega rápida, caçamba limpa e rastreada, com responsabilidade ambiental garantida.',
    longDescription: 'Aluguel de caçambas de entulho em Brasília com entrega rápida. Ideal para reformas, demolições e limpeza de terrenos. Caçambas de qualidade com coleta rápida e segura.',
    icon: 'M20 13a1 1 0 100-2v2a1 1 0 100-2v-2zm0 0V9a2 2 0 00-2-2H6a2 2 0 00-2 2v4m16 0h2a1 1 0 001-1v-4a1 1 0 00-1-1h-2m0 0V9a2 2 0 00-2-2H6a2 2 0 00-2 2v4m0 0H2a1 1 0 00-1 1v4a1 1 0 001 1h2',
    image: '/aluguel_cacamba_entulhobrasilia.webp',
    primaryKeyword: 'caçamba de entulho brasília',
    secondaryKeywords: [
      'aluguel caçamba brasília',
      'caçamba brasília',
      'caçamba de entulho df',
      'entulho brasília',
    ],
    features: [
      'Caçamba vistoriada e rastreada',
      'Descarte consciente e responsável',
      'Autorizado pelo SLU',
      'Controle de Transporte de Resíduos (CTR)',
      'Entrega rápida em Brasília',
    ],
    benefits: [
      'Obra limpa e organizada',
      'Entulho retirado rapidamente',
      'Responsabilidade ambiental',
      'Comodidade e segurança',
      'Atendimento confiável',
    ],
    price: '',
    priceDetails: '',
    color: 'primary',
    order: 1,
  },
  {
    id: 'tele-entulho',
    name: 'Tele Entulho em Brasília',
    slug: 'tele-entulho',
    description: 'Serviço rápido de remoção de entulho sob demanda — ligue ou envie mensagem e resolvemos em até 2 horas em toda Brasília e DF. Ideal para limpeza de terrenos, garagens, áreas externas e resíduos pontuais.',
    longDescription: 'Tele entulho para retirada rápida de resíduos de construção, demolição e limpeza. Chamada express com coleta no mesmo dia. Ideal para pequenas e médias quantidades de entulho.',
    icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 00.948-.684l1.498-4.493a1 1 0 011.502-.684l1.498 4.493a1 1 0 00.948.684H19a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V5z',
    image: '/tele_entulho_brasilia.webp',
    primaryKeyword: 'tele entulho brasília',
    secondaryKeywords: [
      'tele entulho df',
      'remoção entulho brasília',
      'entulho rápido brasília',
      'coleta entulho sob demanda',
    ],
    features: [
      'Resposta em até 2 horas',
      'Remoção eficiente e limpa',
      'Descarte responsável',
      'Rastreamento completo do resíduo',
    ],
    benefits: [
      'Coleta rápida',
      'Sem burocracia',
      'Atendimento sempre disponível',
      'Área limpa',
      'Serviço confiável',
    ],
    price: '',
    priceDetails: '',
    color: 'primary',
    order: 2,
  },
];

// ============================================
// REGIONS - 12 Main Service Areas
// ============================================

export const regions: Region[] = [
  {
    id: 'taguatinga',
    name: 'Taguatinga',
    slug: 'taguatinga',
    area: 'Eixo L Sul',
    zipCodes: ['72100-000', '72110-000', '72120-000'],
    neighborhoods: ['Taguatinga Norte', 'Taguatinga Sul', 'Condomínios'],
  },
  {
    id: 'sobradinho',
    name: 'Sobradinho',
    slug: 'sobradinho',
    area: 'Eixo Monumental',
    zipCodes: ['73000-000', '73010-000'],
    neighborhoods: ['Sobradinho 1', 'Sobradinho 2', 'Centro'],
  },
  {
    id: 'ceilandia',
    name: 'Ceilândia',
    slug: 'ceilandia',
    area: 'Entorno Oeste',
    zipCodes: ['72200-000', '72220-000'],
    neighborhoods: ['Ceilândia Norte', 'Ceilândia Sul', 'Centro'],
  },
  {
    id: 'asa-norte',
    name: 'Asa Norte',
    slug: 'asa-norte',
    area: 'Plano Piloto',
    zipCodes: ['70800-000', '70810-000', '70820-000'],
    neighborhoods: ['SQN', 'SR Norte', 'Espaço das Cidades'],
  },
  {
    id: 'asa-sul',
    name: 'Asa Sul',
    slug: 'asa-sul',
    area: 'Plano Piloto',
    zipCodes: ['70200-000', '70210-000', '70220-000'],
    neighborhoods: ['SQS', 'SR Sul', 'Centro'],
  },
  {
    id: 'aguas-claras',
    name: 'Águas Claras',
    slug: 'aguas-claras',
    area: 'Eixo L Norte',
    zipCodes: ['71900-000', '71910-000', '71920-000'],
    neighborhoods: ['Avenida Central', 'Vila da Asa Norte', 'Condomínios'],
  },
  {
    id: 'guara',
    name: 'Guará',
    slug: 'guara',
    area: 'Eixo L Sul',
    zipCodes: ['71020-000', '71030-000'],
    neighborhoods: ['Guará 1', 'Guará 2'],
  },
  {
    id: 'riacho-fundo',
    name: 'Riacho Fundo',
    slug: 'riacho-fundo',
    area: 'Eixo L Sul',
    zipCodes: ['71800-000', '71810-000'],
    neighborhoods: ['Riacho Fundo 1', 'Riacho Fundo 2'],
  },
  {
    id: 'brasilia-planopiloto',
    name: 'Brasília (Plano Piloto)',
    slug: 'brasilia-planopiloto',
    area: 'Plano Piloto',
    zipCodes: ['70000-000', '70070-000'],
    neighborhoods: ['Esplanada dos Ministérios', 'Centro', 'Zona Cívica'],
  },
  {
    id: 'nucleo-bandeirante',
    name: 'Núcleo Bandeirante',
    slug: 'nucleo-bandeirante',
    area: 'Entorno Sul',
    zipCodes: ['71800-000'],
    neighborhoods: ['Centro', 'Residencial'],
  },
  {
    id: 'lago-sul',
    name: 'Lago Sul',
    slug: 'lago-sul',
    area: 'Plano Piloto',
    zipCodes: ['71500-000', '71510-000'],
    neighborhoods: ['Condomínios', 'Centro'],
  },
  {
    id: 'lago-norte',
    name: 'Lago Norte',
    slug: 'lago-norte',
    area: 'Plano Piloto',
    zipCodes: ['71500-000'],
    neighborhoods: ['Condomínios', 'Centro'],
  },
];

// ============================================
// SERVICE REGIONS MAPPING
// ============================================

export const serviceRegions: ServiceRegion[] = [
  // CAÇAMBA DE ENTULHO - Regional Pages
  {
    serviceId: 'caçamba-entulho',
    regionId: 'taguatinga',
    title: 'Caçamba de Entulho em Taguatinga',
    description: 'Aluguel de caçambas para entulho em Taguatinga. Rápido, seguro e confiável.',
    keywords: ['caçamba entulho taguatinga', 'aluguel caçamba taguatinga', 'entulho taguatinga'],
  },
  {
    serviceId: 'caçamba-entulho',
    regionId: 'sobradinho',
    title: 'Caçamba de Entulho em Sobradinho',
    description: 'Aluguel de caçambas em Sobradinho com coleta rápida.',
    keywords: ['caçamba sobradinho', 'entulho sobradinho', 'aluguel caçamba sobradinho'],
  },
  {
    serviceId: 'caçamba-entulho',
    regionId: 'ceilandia',
    title: 'Caçamba de Entulho em Ceilândia',
    description: 'Caçambas para entulho em Ceilândia. Entrega em 24 horas.',
    keywords: ['caçamba ceilândia', 'entulho ceilândia', 'aluguel caçamba ceilândia'],
  },
  {
    serviceId: 'caçamba-entulho',
    regionId: 'asa-norte',
    title: 'Caçamba de Entulho em Asa Norte',
    description: 'Aluguel de caçambas em Asa Norte. Atendimento profissional.',
    keywords: ['caçamba asa norte', 'entulho asa norte', 'aluguel caçamba asa norte'],
  },
  {
    serviceId: 'caçamba-entulho',
    regionId: 'asa-sul',
    title: 'Caçamba de Entulho em Asa Sul',
    description: 'Caçambas para entulho em Asa Sul com entrega rápida.',
    keywords: ['caçamba asa sul', 'entulho asa sul', 'aluguel caçamba asa sul'],
  },
  {
    serviceId: 'caçamba-entulho',
    regionId: 'aguas-claras',
    title: 'Caçamba de Entulho em Águas Claras',
    description: 'Aluguel de caçambas em Águas Claras. Qualidade garantida.',
    keywords: ['caçamba águas claras', 'entulho águas claras', 'aluguel caçamba águas claras'],
  },
  {
    serviceId: 'caçamba-entulho',
    regionId: 'guara',
    title: 'Caçamba de Entulho no Guará',
    description: 'Caçambas para entulho no Guará. Serviço confiável.',
    keywords: ['caçamba guará', 'entulho guará', 'aluguel caçamba guará'],
  },
  {
    serviceId: 'caçamba-entulho',
    regionId: 'riacho-fundo',
    title: 'Caçamba de Entulho em Riacho Fundo',
    description: 'Aluguel de caçambas em Riacho Fundo com coleta rápida.',
    keywords: ['caçamba riacho fundo', 'entulho riacho fundo', 'aluguel caçamba riacho fundo'],
  },

  // DISK ENTULHO - Selected Regions
  {
    serviceId: 'disk-entulho',
    regionId: 'taguatinga',
    title: 'Disk Entulho em Taguatinga',
    description: 'Coleta rápida de entulho em Taguatinga. Atendimento 24/7.',
    keywords: ['disk entulho taguatinga', 'coleta entulho taguatinga'],
  },
  {
    serviceId: 'disk-entulho',
    regionId: 'sobradinho',
    title: 'Disk Entulho em Sobradinho',
    description: 'Chamada express para coleta de entulho em Sobradinho.',
    keywords: ['disk entulho sobradinho', 'coleta entulho sobradinho'],
  },
  {
    serviceId: 'disk-entulho',
    regionId: 'ceilandia',
    title: 'Disk Entulho em Ceilândia',
    description: 'Disk entulho em Ceilândia com coleta no mesmo dia.',
    keywords: ['disk entulho ceilândia', 'coleta entulho ceilândia'],
  },

  // PAPA ENTULHO - Major Cities
  {
    serviceId: 'papa-entulho',
    regionId: 'taguatinga',
    title: 'Papa Entulho em Taguatinga',
    description: 'Máquina papa entulho em Taguatinga para grandes volumes.',
    keywords: ['papa entulho taguatinga', 'máquina entulho taguatinga'],
  },
  {
    serviceId: 'papa-entulho',
    regionId: 'asa-norte',
    title: 'Papa Entulho em Asa Norte',
    description: 'Papa entulho em Asa Norte. Remoção mecanizada eficiente.',
    keywords: ['papa entulho asa norte', 'máquina entulho asa norte'],
  },

  // ALUGUEL CONTAINER - Strategic Locations
  {
    serviceId: 'aluguel-container',
    regionId: 'brasilia-planopiloto',
    title: 'Aluguel de Container em Brasília',
    description: 'Containers para aluguel no Plano Piloto com entrega rápida.',
    keywords: ['aluguel container brasília', 'container brasília'],
  },
  {
    serviceId: 'aluguel-container',
    regionId: 'taguatinga',
    title: 'Aluguel de Container em Taguatinga',
    description: 'Containers disponíveis para aluguel em Taguatinga.',
    keywords: ['aluguel container taguatinga', 'container taguatinga'],
  },

  // COLETA ENTULHO - All Major Regions
  {
    serviceId: 'coleta-entulho',
    regionId: 'brasilia-planopiloto',
    title: 'Coleta de Entulho em Brasília',
    description: 'Coleta sustentável de entulho no Plano Piloto.',
    keywords: ['coleta entulho brasília', 'retirada entulho brasília'],
  },
  {
    serviceId: 'coleta-entulho',
    regionId: 'taguatinga',
    title: 'Coleta de Entulho em Taguatinga',
    description: 'Coleta responsável de entulho em Taguatinga.',
    keywords: ['coleta entulho taguatinga', 'retirada entulho taguatinga'],
  },
];

// ============================================
// UTILITY FUNCTIONS
// ============================================

export function getServiceById(id: string): Service | undefined {
  return services.find(s => s.id === id);
}

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find(s => s.slug === slug);
}

export function getRegionById(id: string): Region | undefined {
  return regions.find(r => r.id === id);
}

export function getRegionBySlug(slug: string): Region | undefined {
  return regions.find(r => r.slug === slug);
}

export function getServiceRegions(serviceId: string): ServiceRegion[] {
  return serviceRegions.filter(sr => sr.serviceId === serviceId);
}

export function getRegionServices(regionId: string): ServiceRegion[] {
  return serviceRegions.filter(sr => sr.regionId === regionId);
}

export function getAllServiceRegionPairs(): ServiceRegion[] {
  return serviceRegions;
}

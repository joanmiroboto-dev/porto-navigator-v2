export type PlaceCategory = 'ver' | 'hacer' | 'comer';

export interface Place {
  id: string;
  name: string;
  description: string;
  category: PlaceCategory;
  lat: number;
  lng: number;
  imageUrl: string;
  tip?: string;
  priceRange?: string;
}

export interface CulturalEvent {
  id: string;
  name: string;
  date: string;
  dateLabel: string;
  location: string;
  description: string;
  price?: string;
  relevance: string;
}

export interface TransportOption {
  name: string;
  price: string;
  description: string;
}

export interface DayPlan {
  date: string;
  label: string;
  subtitle: string;
  places: string[];
  events?: string[];
  tips?: string[];
}

// ─── LUGARES ─────────────────────────────────────────────

export const PLACES: Place[] = [
  // ── VER ──
  {
    id: 'ribeira',
    name: 'Ribeira',
    description: 'El pintoresco barrio ribereño, Patrimonio de la Humanidad por la UNESCO. Pasea por sus callejuelas y disfruta de las vistas al río Duero.',
    category: 'ver',
    lat: 41.1408,
    lng: -8.6132,
    imageUrl: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=600&h=400&fit=crop&q=80',
    tip: 'Mejor al atardecer para fotos increíbles',
  },
  {
    id: 'puente-luis-i',
    name: 'Puente Dom Luís I',
    description: 'Icónico puente de hierro de dos niveles diseñado por un discípulo de Eiffel. Cruza a pie por el nivel superior para vistas espectaculares.',
    category: 'ver',
    lat: 41.1395,
    lng: -8.6093,
    imageUrl: 'https://images.unsplash.com/photo-1569959220744-ff553533f492?w=800&q=80',
    tip: 'Cruza por el nivel inferior para ir a Gaia y por el superior para las vistas',
  },
  {
    id: 'sao-bento',
    name: 'Estación São Bento',
    description: 'Estación de tren con más de 20.000 azulejos que narran la historia de Portugal. Una joya del arte portugués y museo al aire libre.',
    category: 'ver',
    lat: 41.1456,
    lng: -8.6102,
    imageUrl: 'https://images.unsplash.com/photo-1613861615547-f1da86f0c7eb?w=800&q=80',
    tip: 'Entrada libre, visítala temprano para evitar multitudes',
  },
  {
    id: 'libreria-lello',
    name: 'Librería Lello',
    description: 'Una de las librerías más bellas del mundo, con su famosa escalera roja. Inspiración para J.K. Rowling. El valor arquitectónico es único.',
    category: 'ver',
    lat: 41.1468,
    lng: -8.6148,
    imageUrl: 'https://images.unsplash.com/photo-1571167530149-c1105da4c2c7?w=800&q=80',
    tip: 'Compra entrada online (5€, descontables en libros). Ve temprano para evitar colas.',
  },
  {
    id: 'torre-clerigos',
    name: 'Torre dos Clérigos',
    description: 'Torre barroca de 76m de altura con 240 escalones. Las mejores vistas panorámicas de Oporto desde la cima.',
    category: 'ver',
    lat: 41.1458,
    lng: -8.6146,
    imageUrl: 'https://images.unsplash.com/photo-1593179357196-ea11a2e7c119?w=800&q=80',
  },
  {
    id: 'capela-almas',
    name: 'Capela das Almas',
    description: 'Capilla cubierta de azulejos blancos y azules en la calle Santa Catarina. Murales que narran episodios bíblicos, una galería de arte al aire libre.',
    category: 'ver',
    lat: 41.1490,
    lng: -8.6063,
    imageUrl: 'https://images.unsplash.com/photo-1588263823647-ce3546d325bc?w=800&q=80',
    tip: 'Gratuita. Pasea por Santa Catarina después para hacer shopping.',
  },
  {
    id: 'igreja-carmo',
    name: 'Igreja do Carmo',
    description: 'Impresionante iglesia con un enorme mural de azulejos en su fachada lateral. Arte religioso portugués en su máxima expresión.',
    category: 'ver',
    lat: 41.1467,
    lng: -8.6162,
    imageUrl: 'https://images.unsplash.com/photo-1600025282051-ec0c6bf3137a?w=800&q=80',
  },
  {
    id: 'san-francisco',
    name: 'Iglesia de San Francisco',
    description: 'Joya del barroco dorado. Interior completamente recubierto de talla dorada, una de las iglesias más ornamentadas de Europa.',
    category: 'ver',
    lat: 41.1413,
    lng: -8.6157,
    imageUrl: 'https://images.unsplash.com/photo-1574359411659-15573a27d625?w=800&q=80',
    tip: 'Accede por los callejones medievales del barrio de Barredo',
  },
  {
    id: 'palacio-bolsa',
    name: 'Palácio da Bolsa',
    description: 'Antiguo palacio de la Bolsa de Valores con el impresionante Salón Árabe. Obra maestra del neoclasicismo portuense.',
    category: 'ver',
    lat: 41.1414,
    lng: -8.6162,
    imageUrl: 'https://images.unsplash.com/photo-1566654761376-5c97fdab3abb?w=800&q=80',
  },
  {
    id: 'jardines-cristal',
    name: 'Jardines del Palacio de Cristal',
    description: '8 hectáreas de senderos sombreados, fuentes y pavos reales. Vistas privilegiadas a la desembocadura del Duero y al puente de la Arrábida.',
    category: 'ver',
    lat: 41.1475,
    lng: -8.6270,
    imageUrl: 'https://images.unsplash.com/photo-1585938389612-a552a28d6914?w=800&q=80',
    tip: 'El Museo Romántico dentro del recinto es gratis sábados y domingos.',
  },
  {
    id: 'catedral-se',
    name: 'Catedral (Sé do Porto)',
    description: 'Fortaleza-catedral románica del siglo XII con claustro decorado con azulejos. Vistas panorámicas desde la explanada.',
    category: 'ver',
    lat: 41.1430,
    lng: -8.6113,
    imageUrl: 'https://images.unsplash.com/photo-1599057841498-3c05d3f23a24?w=800&q=80',
  },
  {
    id: 'foz-douro',
    name: 'Foz do Douro y Faro de Felgueiras',
    description: 'Paseo marítimo donde el Duero se encuentra con el Atlántico. Caminata romántica junto al mar hasta el faro histórico.',
    category: 'ver',
    lat: 41.1488,
    lng: -8.6760,
    imageUrl: 'https://images.unsplash.com/photo-1593179357196-ea11a2e7c119?w=800&q=80',
    tip: 'Toma el autobús 500 desde Pza. de la Libertad, bordea todo el río y la costa.',
  },
  {
    id: 'miradouro-vitoria',
    name: 'Miradouro da Vitória',
    description: 'Visión descarnada y auténtica del Oporto histórico. Ideal para fotografía de arquitectura con vistas únicas.',
    category: 'ver',
    lat: 41.1445,
    lng: -8.6155,
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80',
    tip: 'Gratis. Perfecto para fotos al atardecer.',
  },
  {
    id: 'mercado-bolhao',
    name: 'Mercado de Bolhão',
    description: 'Mercado tradicional renovado con puestos de productos frescos, flores y gastronomía local. El bullicio auténtico de Oporto.',
    category: 'ver',
    lat: 41.1499,
    lng: -8.6063,
    imageUrl: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=800&q=80',
    tip: 'Sube a la segunda planta para un café con vistas al mercado.',
  },

  // ── HACER ──
  {
    id: 'crucero-6-puentes',
    name: 'Crucero de los 6 Puentes',
    description: 'Paseo en barco por el río Duero pasando bajo los 6 puentes históricos de Oporto. Duración: ~50 min.',
    category: 'hacer',
    lat: 41.1403,
    lng: -8.6160,
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80',
    tip: 'Reserva para la mañana, hay menos gente',
  },
  {
    id: 'bodega-ramos-pinto',
    name: 'Bodega Ramos Pinto',
    description: 'Destaca por su valor histórico y cultural. Incluye museo con oficinas del s.XIX y colección de arte publicitario del vino de Oporto.',
    category: 'hacer',
    lat: 41.1372,
    lng: -8.6100,
    imageUrl: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80',
    tip: 'Cata de 2-3 vinos incluida (~20-25€/persona)',
    priceRange: '20-25€/persona',
  },
  {
    id: 'bodega-taylors',
    name: "Bodega Taylor's",
    description: "Audioguía autoguiada para ir a tu ritmo. Jardines y terraza con las mejores vistas de Gaia. Una de las experiencias más completas.",
    category: 'hacer',
    lat: 41.1365,
    lng: -8.6110,
    imageUrl: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80',
    tip: "Terraza con vistas 360° al río y al Puente Luis I",
    priceRange: '20-25€/persona',
  },
  {
    id: 'bodega-ferreira',
    name: 'Caves Ferreira',
    description: 'Herencia puramente portuguesa, consolidada por Doña Antónia Adelaide Ferreira. Explicaciones profundas sobre Ruby, Tawny y Vintage.',
    category: 'hacer',
    lat: 41.1370,
    lng: -8.6125,
    imageUrl: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80',
    tip: 'La más auténtica y respetada por los locales',
    priceRange: '20-25€/persona',
  },
  {
    id: 'bodega-cockburns',
    name: "Cockburn's",
    description: "Posee la mayor tonelería operativa. Observa el mantenimiento manual de barriles, un oficio casi desaparecido. Excelente relación calidad-precio.",
    category: 'hacer',
    lat: 41.1368,
    lng: -8.6140,
    imageUrl: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80',
    tip: 'Cata de 3 vinos por ~20€. Evita Cálem (demasiado comercial).',
    priceRange: '~20€/persona',
  },
  {
    id: 'jardim-do-morro',
    name: 'Atardecer en Jardim do Morro',
    description: 'Epicentro del ritual social del atardecer. Cientos de personas con música y bebidas ven el sol iluminar la Ribeira.',
    category: 'hacer',
    lat: 41.1375,
    lng: -8.6098,
    imageUrl: 'https://images.unsplash.com/photo-1609868828687-c9fc7612fcb5?w=800&q=80',
    tip: 'Compra una botella de vino verde en un supermercado y haz picnic',
  },
  {
    id: 'jardim-virtudes',
    name: 'Picnic en Jardim das Virtudes',
    description: 'Espacio escalonado con vistas privilegiadas a la desembocadura del Duero y al puente de la Arrábida. Más íntimo que Jardim do Morro.',
    category: 'hacer',
    lat: 41.1440,
    lng: -8.6210,
    imageUrl: 'https://images.unsplash.com/photo-1609868828687-c9fc7612fcb5?w=800&q=80',
    tip: 'Lleva productos del mercado o supermercado. Perfecto para parejas.',
  },
  {
    id: 'rua-bombarda',
    name: 'Galerías de Rua Miguel Bombarda',
    description: 'Barrio de las artes con inauguraciones simultáneas de galerías. Arte contemporáneo portugués en espacios independientes.',
    category: 'hacer',
    lat: 41.1490,
    lng: -8.6230,
    imageUrl: 'https://images.unsplash.com/photo-1578926288207-a90a5366759d?w=800&q=80',
    tip: 'Los sábados hay inauguraciones simultáneas. Entrada libre.',
  },
  {
    id: 'feira-vandoma',
    name: 'Feira da Vandoma',
    description: 'Mercadillo de tesoros vintage y antigüedades en la Avenida 25 de Abril. Inmersión en la cultura popular portuense.',
    category: 'hacer',
    lat: 41.1460,
    lng: -8.5950,
    imageUrl: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=800&q=80',
    tip: 'Solo sábados. Llega temprano para las mejores piezas.',
  },
  {
    id: 'bus-500',
    name: 'Ruta del Autobús 500',
    description: 'Bus de dos pisos desde Plaza de la Libertad hasta Matosinhos bordeando el Duero y la costa atlántica. Alternativa económica al tranvía.',
    category: 'hacer',
    lat: 41.1490,
    lng: -8.6100,
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80',
    tip: 'Se paga con Andante. Vistas espectaculares de Foz do Douro.',
  },

  // ── COMER ──
  {
    id: 'cafe-santiago',
    name: 'Francesinha – Café Santiago',
    description: 'Venerado por su salsa secreta. La francesinha es una estructura arquitectónica de carnes, queso y salsa picante que define Oporto.',
    category: 'comer',
    lat: 41.1488,
    lng: -8.6052,
    imageUrl: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&q=80',
    tip: 'Pide la Francesinha especial con huevo y patatas',
    priceRange: '25-30€/pareja',
  },
  {
    id: 'lado-b',
    name: 'Francesinha – Lado B',
    description: '"La mejor francesinha del mundo". Versión moderna con oferta vegetariana de alto nivel. Ideal para paladares contemporáneos.',
    category: 'comer',
    lat: 41.1485,
    lng: -8.6055,
    imageUrl: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&q=80',
    tip: 'Tienen opción vegetariana excelente',
    priceRange: '25-30€/pareja',
  },
  {
    id: 'brasao',
    name: 'Brasão Cervejaria',
    description: 'Francesinha refinada horneada en horno de leña. Queso fundido con textura elevada. Ideal para una cita nocturna.',
    category: 'comer',
    lat: 41.1460,
    lng: -8.6080,
    imageUrl: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&q=80',
    tip: 'Versión al horno de leña única',
    priceRange: '30-40€/pareja',
  },
  {
    id: 'bufete-fase',
    name: 'Bufete Fase',
    description: 'Enclave de resistencia gastronómica. Preparación artesanal y espacio limitado, experiencia auténtica alejada del turismo de masas.',
    category: 'comer',
    lat: 41.1475,
    lng: -8.6070,
    imageUrl: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&q=80',
    priceRange: '20-25€/pareja',
  },
  {
    id: 'manteigaria',
    name: 'Pastéis de Nata – Manteigaria',
    description: 'Pasteles de nata recién horneados, crujientes y cremosos. Los mejores de Oporto, hechos a la vista.',
    category: 'comer',
    lat: 41.1466,
    lng: -8.6123,
    imageUrl: 'https://images.unsplash.com/photo-1611293388250-580b08c4a145?w=800&q=80',
    tip: 'Pídelos calientes, recién salidos del horno',
  },
  {
    id: 'bacalhau',
    name: 'Bacalhau à Brás',
    description: 'Plato tradicional de bacalao desmenuzado con patatas paja, huevo y aceitunas. Imprescindible de la cocina lusa.',
    category: 'comer',
    lat: 41.1445,
    lng: -8.6130,
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
    tip: 'Pruébalo en Abadia do Porto o A Cozinha de Manel',
  },
  {
    id: 'conga',
    name: 'Bifanas – Conga',
    description: 'La máxima expresión de la eficiencia alimentaria: bocadillos de cerdo marinado por ~2.50€. El almuerzo más económico de la ciudad.',
    category: 'comer',
    lat: 41.1480,
    lng: -8.6090,
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
    tip: 'Solo 2.50€ cada bifana. Pide con mostaza.',
    priceRange: '10-15€/pareja',
  },
  {
    id: 'casa-guedes',
    name: 'Sandes de Pernil – Casa Guedes',
    description: 'Famoso sándwich de pernil (jamón asado) con queso de la Sierra. Institución portuense desde hace décadas.',
    category: 'comer',
    lat: 41.1470,
    lng: -8.6040,
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
    tip: 'En Praça dos Poveiros. Pide el sandes con queso.',
    priceRange: '15-20€/pareja',
  },
  {
    id: 'tasquinha-paula',
    name: 'Tasquinha da Paula',
    description: 'Cocina casera portuguesa auténtica cerca de la Ribeira. Menú del día generoso con excelente relación calidad-precio.',
    category: 'comer',
    lat: 41.1415,
    lng: -8.6140,
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
    priceRange: '20-25€/pareja',
  },
  {
    id: 'matosinhos-pescado',
    name: 'Pescado en Matosinhos',
    description: 'Restaurantes de pescado fresco a la brasa a precios económicos. Tito I y Teresa son referencias locales. El mejor marisco de la zona.',
    category: 'comer',
    lat: 41.1850,
    lng: -8.6900,
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
    tip: 'Metro línea A hasta Matosinhos Sul. Pide sardinas o robalo a la brasa.',
    priceRange: '25-35€/pareja',
  },
  {
    id: 'lareira',
    name: 'Lareira',
    description: 'Raciones y cocina portuguesa moderna en la zona del Coliseu. Perfecto para cenar tras un espectáculo.',
    category: 'comer',
    lat: 41.1480,
    lng: -8.6065,
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
    priceRange: '25-35€/pareja',
  },
];

// ─── EVENTOS CULTURALES ──────────────────────────────────

export const EVENTS: CulturalEvent[] = [
  {
    id: 'gregorio-duvivier',
    name: 'O Céu da Língua – Gregório Duvivier',
    date: '2026-03-18',
    dateLabel: 'Miércoles 18',
    location: 'Coliseu Porto Ageas',
    description: 'Stand-up comedy + poesía lingüística. Explora los nexos del portugués a ambos lados del Atlántico. Humor inteligente en un recinto Art Déco.',
    price: '32-42€',
    relevance: 'Ideal para parejas interesadas en cultura y humor',
  },
  {
    id: 'dia-del-padre',
    name: 'Día del Padre (Dia do Pai)',
    date: '2026-03-19',
    dateLabel: 'Jueves 19',
    location: 'Toda la ciudad',
    description: 'No es festivo en Portugal, los servicios funcionan normalmente. Pero hay alta demanda en cenas: las familias salen a cenar.',
    relevance: '⚠️ Reserva restaurantes con antelación o cena en la zona de Cedofeita',
  },
  {
    id: 'europa-league',
    name: 'FC Porto – Europa League',
    date: '2026-03-19',
    dateLabel: 'Jueves 19',
    location: 'Estádio do Dragão',
    description: 'Partido de competición europea. Ambiente vibrante en la ciudad, posibles restricciones de tráfico cerca de Campanhã.',
    relevance: 'Ambiente festivo; evita el metro hacia Campanhã a las 18-19h',
  },
  {
    id: 'rita-rocha',
    name: 'Rita Rocha – Concierto "8 al 80"',
    date: '2026-03-20',
    dateLabel: 'Viernes 20',
    location: 'Coliseu Porto Ageas',
    description: 'Nueva generación del pop portugués. Con solo 19 años, una de las voces emergentes más potentes del país.',
    price: 'Desde 15€',
    relevance: 'Experiencia emocionalmente cargada en un entorno histórico',
  },
  {
    id: 'festival-mula',
    name: 'Festival Mula – Artes Performativas',
    date: '2026-03-20',
    dateLabel: '20-22 marzo',
    location: 'Sismógrafo, Mala Voadora, Passos Manuel y más',
    description: '36 horas ininterrumpidas de danza contemporánea y artes híbridas coincidiendo con el equinoccio. 22 artistas de 13 nacionalidades.',
    price: 'GRATIS',
    relevance: '🎭 Toda la programación es gratuita y abierta. Espacios culturales alternativos.',
  },
  {
    id: 'feira-vandoma-event',
    name: 'Feira da Vandoma',
    date: '2026-03-21',
    dateLabel: 'Sábado 21',
    location: 'Avenida 25 de Abril',
    description: 'Mercadillo de antigüedades y vintage. Compras únicas e inmersión en la cultura popular portuense.',
    relevance: 'Tesoros vintage a buen precio',
  },
  {
    id: 'museos-gratis',
    name: 'Museos gratuitos (fin de semana)',
    date: '2026-03-21',
    dateLabel: 'Sáb 21 y Dom 22',
    location: 'Museo Romántico (Jardines Palacio de Cristal)',
    description: 'Entrada gratuita al Museo Romántico los sábados y domingos. Conoce la vida de la burguesía portuense del siglo XIX.',
    price: 'GRATIS',
    relevance: 'Cultura gratis dentro de los Jardines del Palacio de Cristal',
  },
];

// ─── TRANSPORTE ──────────────────────────────────────────

export const TRANSPORT_OPTIONS: TransportOption[] = [
  { name: 'Andante Azul (individual)', price: '1.40€ (Z2) + 0.60€ tarjeta', description: 'Ideal para trayectos puntuales si camináis mucho.' },
  { name: 'Andante 24h', price: 'Desde 5.15€', description: 'Viajes ilimitados 24h en zonas seleccionadas.' },
  { name: 'Andante Tour 72h', price: '15€', description: 'Ilimitado en TODAS las zonas, incluido aeropuerto (Z4).' },
  { name: 'Porto Card 3 días', price: '32€', description: 'Transporte ilimitado + descuentos en >130 museos y tours.' },
  { name: 'Autobús 500', price: 'Con Andante', description: 'Ruta escénica: Pza. Libertad → Foz → Matosinhos por la costa.' },
  { name: 'Tranvía Histórico (Línea 1)', price: '6€/viaje', description: 'Solo si buscas el factor romántico. No es funcional para transporte diario.' },
];

// ─── TIPS DE VINO ────────────────────────────────────────

export const WINE_TIPS = [
  { type: 'Ruby', description: 'Joven, afrutado. Envejecido en grandes toneles, mínimo contacto con madera.' },
  { type: 'Tawny', description: 'Envejecido en barricas pequeñas. Notas de frutos secos y especias (oxidación controlada).' },
  { type: 'Vintage', description: 'Cosecha excepcional. Embotellado tras 2 años, destinado a envejecer décadas.' },
  { type: 'Lágrima', description: 'Blanco dulce. Ideal como aperitivo servido muy frío.' },
];

// ─── ITINERARIO POR DÍAS ─────────────────────────────────

export const DAY_PLANS: DayPlan[] = [
  {
    date: '2026-03-18',
    label: 'Miér 18 – Baixa y Teatro',
    subtitle: 'Inmersión en el centro histórico',
    places: ['sao-bento', 'libreria-lello', 'torre-clerigos', 'capela-almas', 'mercado-bolhao', 'manteigaria'],
    events: ['gregorio-duvivier'],
    tips: [
      'Visita Lello temprano para evitar colas',
      'Café en la 2ª planta del Mercado de Bolhão',
      'Cena de raciones en Lareira tras el Coliseu',
    ],
  },
  {
    date: '2026-03-19',
    label: 'Jue 19 – Duero y Bodegas',
    subtitle: 'Día del Padre + Europa League',
    places: ['ribeira', 'san-francisco', 'puente-luis-i', 'bodega-ramos-pinto', 'conga'],
    events: ['dia-del-padre', 'europa-league'],
    tips: [
      '⚠️ Día del Padre: reserva restaurante con antelación',
      'Desciende por los callejones de Barredo hacia la Ribeira',
      'Cruza el Puente Luis I por el nivel inferior hacia Gaia',
      'Cena en zona Cedofeita para evitar aglomeraciones familiares',
    ],
  },
  {
    date: '2026-03-20',
    label: 'Vie 20 – Vanguardia y Equinoccio',
    subtitle: 'Festival Mula + Rita Rocha',
    places: ['jardines-cristal', 'jardim-do-morro', 'cafe-santiago'],
    events: ['rita-rocha', 'festival-mula'],
    tips: [
      'Disfruta las vistas de la desembocadura desde los Jardines',
      'Explora instalaciones gratuitas de Mula en Sismógrafo',
      'Concierto de Rita Rocha en el Coliseu o performances nocturnas',
    ],
  },
  {
    date: '2026-03-21',
    label: 'Sáb 21 – Mercados y Bohemia',
    subtitle: 'Feira da Vandoma + Galerías de arte',
    places: ['feira-vandoma', 'rua-bombarda', 'jardim-virtudes', 'lado-b'],
    events: ['feira-vandoma-event', 'museos-gratis'],
    tips: [
      'Llega temprano a la Feira da Vandoma para las mejores piezas',
      'Inauguraciones simultáneas en las galerías de Rua Bombarda',
      'Picnic romántico al atardecer en Jardim das Virtudes',
    ],
  },
  {
    date: '2026-03-22',
    label: 'Dom 22 – Costa y Despedida',
    subtitle: 'Foz do Douro + Matosinhos',
    places: ['bus-500', 'foz-douro', 'matosinhos-pescado', 'catedral-se'],
    events: ['museos-gratis'],
    tips: [
      'Autobús 500 para la ruta escénica por la costa',
      'Almuerzo de pescado en Matosinhos (Tito I o Teresa)',
      'Museo Romántico gratis hoy (dentro de los Jardines)',
      'Visita la Catedral (Sé) antes de partir',
    ],
  },
];

export const CATEGORY_CONFIG: Record<PlaceCategory, { label: string; color: string; mapColor: string }> = {
  ver: { label: 'Ver', color: 'bg-primary text-primary-foreground', mapColor: '#0B4C86' },
  hacer: { label: 'Hacer', color: 'bg-amber-500 text-white', mapColor: '#F59E0B' },
  comer: { label: 'Comer', color: 'bg-accent text-accent-foreground', mapColor: '#CC5500' },
};

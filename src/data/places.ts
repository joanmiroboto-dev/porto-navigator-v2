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
}

export interface DayPlan {
  date: string;
  label: string;
  places: string[]; // place ids
}

export const PLACES: Place[] = [
  // VER
  {
    id: 'ribeira',
    name: 'Ribeira',
    description: 'El pintoresco barrio ribereño, Patrimonio de la Humanidad por la UNESCO. Pasea por sus callejuelas y disfruta de las vistas al río Duero.',
    category: 'ver',
    lat: 41.1408,
    lng: -8.6132,
    imageUrl: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&q=80',
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
  },
  {
    id: 'sao-bento',
    name: 'Estación São Bento',
    description: 'Estación de tren con más de 20.000 azulejos que narran la historia de Portugal. Una joya del arte portugués.',
    category: 'ver',
    lat: 41.1456,
    lng: -8.6102,
    imageUrl: 'https://images.unsplash.com/photo-1613861615547-f1da86f0c7eb?w=800&q=80',
    tip: 'Entrada libre, visítala temprano para evitar multitudes',
  },
  {
    id: 'libreria-lello',
    name: 'Librería Lello',
    description: 'Una de las librerías más bellas del mundo, con su famosa escalera roja. Inspiración para J.K. Rowling.',
    category: 'ver',
    lat: 41.1468,
    lng: -8.6148,
    imageUrl: 'https://images.unsplash.com/photo-1571167530149-c1105da4c2c7?w=800&q=80',
    tip: 'Compra entrada online (5€, descontables en libros)',
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
  // HACER
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
    id: 'bodegas-gaia',
    name: 'Cata en Bodegas de Gaia',
    description: "Visita las bodegas de vino de Oporto en Vila Nova de Gaia. Taylor's y Sandeman son las más populares.",
    category: 'hacer',
    lat: 41.1372,
    lng: -8.6117,
    imageUrl: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80',
    tip: "Taylor's tiene las mejores vistas, Sandeman la mejor visita guiada",
  },
  {
    id: 'jardim-do-morro',
    name: 'Atardecer en Jardim do Morro',
    description: 'Mirador en la ribera sur con vistas panorámicas al casco antiguo. El lugar perfecto para ver el atardecer.',
    category: 'hacer',
    lat: 41.1375,
    lng: -8.6098,
    imageUrl: 'https://images.unsplash.com/photo-1609868828687-c9fc7612fcb5?w=800&q=80',
    tip: 'Lleva algo para sentarte y una botella de vino',
  },
  // COMER
  {
    id: 'cafe-santiago',
    name: 'Francesinha – Café Santiago',
    description: 'El mejor lugar para probar la Francesinha, el sándwich más famoso de Oporto con salsa picante especial.',
    category: 'comer',
    lat: 41.1488,
    lng: -8.6052,
    imageUrl: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&q=80',
    tip: 'Pide la Francesinha especial con huevo y patatas',
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
    description: 'Plato tradicional de bacalao desmenuzado con patatas paja, huevo y aceitunas. Imprescindible.',
    category: 'comer',
    lat: 41.1445,
    lng: -8.6130,
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
  },
];

export const DAY_PLANS: DayPlan[] = [
  {
    date: '2025-03-18',
    label: 'Mar 18 – Llegada y Ribeira',
    places: ['sao-bento', 'ribeira', 'manteigaria'],
  },
  {
    date: '2025-03-19',
    label: 'Mar 19 – Centro Histórico',
    places: ['torre-clerigos', 'libreria-lello', 'cafe-santiago'],
  },
  {
    date: '2025-03-20',
    label: 'Mar 20 – Río y Bodegas',
    places: ['crucero-6-puentes', 'bodegas-gaia', 'bacalhau'],
  },
  {
    date: '2025-03-21',
    label: 'Mar 21 – Puente y Atardecer',
    places: ['puente-luis-i', 'jardim-do-morro'],
  },
  {
    date: '2025-03-22',
    label: 'Mar 22 – Último Día',
    places: ['ribeira', 'manteigaria'],
  },
];

export const CATEGORY_CONFIG: Record<PlaceCategory, { label: string; color: string; mapColor: string }> = {
  ver: { label: 'Ver', color: 'bg-primary text-primary-foreground', mapColor: '#0B4C86' },
  hacer: { label: 'Hacer', color: 'bg-amber-500 text-white', mapColor: '#F59E0B' },
  comer: { label: 'Comer', color: 'bg-accent text-accent-foreground', mapColor: '#CC5500' },
};

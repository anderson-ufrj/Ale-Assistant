// Configuration for region-specific images
export interface BuildingImage {
  src: string
  title: string
  location: string
  architect: string
  year: string
}

export interface ProfessionalImage {
  src: string
  alt: string
  category: 'architect' | 'engineer' | 'office' | 'hero'
}

// Professional Images (shared across all locales - as requested by user)
export const professionalImages: ProfessionalImage[] = [
  {
    src: '/images/brazil/architect.jpg',
    alt: 'Professional architect',
    category: 'architect'
  },
  {
    src: '/images/brazil/architectoncomputer.webp',
    alt: 'Architect working on computer',
    category: 'architect'
  },
  {
    src: '/images/brazil/archtectplanningoncomputer.jpg',
    alt: 'Architect planning on computer',
    category: 'architect'
  },
  {
    src: '/images/brazil/image-architect.webp',
    alt: 'Professional architect in office',
    category: 'architect'
  },
  {
    src: '/images/brazil/civil-engineer.jpg',
    alt: 'Civil engineer',
    category: 'engineer'
  },
  {
    src: '/images/brazil/Civil-Engineering-Hero-1600x900.jpg',
    alt: 'Civil engineering hero image',
    category: 'hero'
  },
  {
    src: '/images/brazil/studio.jpeg',
    alt: 'Architecture studio',
    category: 'office'
  }
]

// Brazilian Architecture (Portuguese)
export const brazilianBuildings: BuildingImage[] = [
  {
    src: '/images/brazil/Catedral-Metropolitana-Nossa-Senhora-Aparecida-Cathedral-of-Brasilia-28.5.2024.jpg',
    title: 'Catedral de Brasília',
    location: 'Brasília, DF',
    architect: 'Oscar Niemeyer',
    year: '1970'
  },
  {
    src: '/images/brazil/Museum-of-Tomorrow-Museu-do-Amanha-28.5.2024.jpg',
    title: 'Museu do Amanhã',
    location: 'Rio de Janeiro, RJ',
    architect: 'Santiago Calatrava',
    year: '2015'
  },
  {
    src: '/images/brazil/Niteroi-Contemporary-Art-Museum-Museu-de-Arte-Contemporanea-de-Niteroi-28.5.2024.jpg',
    title: 'MAC Niterói',
    location: 'Niterói, RJ',
    architect: 'Oscar Niemeyer',
    year: '1996'
  },
  {
    src: '/images/brazil/igreja-pampulha-BH.jpg',
    title: 'Igreja da Pampulha',
    location: 'Belo Horizonte, MG',
    architect: 'Oscar Niemeyer',
    year: '1943'
  },
  {
    src: '/images/brazil/Brazilian-Congress-Building-Palacio-do-Congresso-Nacional-28.5.2024.jpg',
    title: 'Congresso Nacional',
    location: 'Brasília, DF',
    architect: 'Oscar Niemeyer',
    year: '1960'
  },
  {
    src: '/images/brazil/masp.png',
    title: 'MASP',
    location: 'São Paulo, SP',
    architect: 'Lina Bo Bardi',
    year: '1968'
  },
  {
    src: '/images/brazil/teatroamazonas.jpg',
    title: 'Teatro Amazonas',
    location: 'Manaus, AM',
    architect: 'Gabinete Português de Engenharia',
    year: '1896'
  },
  {
    src: '/images/brazil/parque-ibirapuera-1140x675.png',
    title: 'Parque Ibirapuera',
    location: 'São Paulo, SP',
    architect: 'Oscar Niemeyer & equipe',
    year: '1954'
  },
  {
    src: '/images/brazil/Palacio-Itamaraty-Itamaraty-Palace-28.5.2024.jpg',
    title: 'Palácio Itamaraty',
    location: 'Brasília, DF',
    architect: 'Oscar Niemeyer',
    year: '1967'
  },
  {
    src: '/images/brazil/brumadinho-inhotim-museu-mg.jpg',
    title: 'Inhotim',
    location: 'Brumadinho, MG',
    architect: 'Vários arquitetos',
    year: '2006'
  }
]

// USA Architecture (English)
export const usaBuildings: BuildingImage[] = [
  {
    src: '/images/usa/golden_gate_bridge-min.webp',
    title: 'Golden Gate Bridge',
    location: 'San Francisco, CA',
    architect: 'Joseph Strauss',
    year: '1937'
  },
  {
    src: '/images/usa/Painted-ladies-12.7.2024.jpg',
    title: 'Painted Ladies',
    location: 'San Francisco, CA',
    architect: 'Victorian Architecture',
    year: '1890s'
  },
  {
    src: '/images/usa/studio-gang-mira-tower-apartments-archello.1601636723.033.1693561243.2183.jpg',
    title: 'St. Regis Chicago',
    location: 'Chicago, IL',
    architect: 'Studio Gang',
    year: '2020'
  },
  {
    src: '/images/usa/nascar-hall-of-fame-by-pei-cobb-freed-3.jpg',
    title: 'NASCAR Hall of Fame',
    location: 'Charlotte, NC',
    architect: 'Pei Cobb Freed & Partners',
    year: '2010'
  },
  {
    src: '/images/usa/Building_at_408_S._Spring_St._(Top),_Los_Angeles.jpeg',
    title: 'Spring Street Building',
    location: 'Los Angeles, CA',
    architect: 'Historic Downtown LA',
    year: '1920s'
  },
  {
    src: '/images/usa/skidmore--owings--amp--merrill-kansas-city-international-airport-new-terminal-airports-archello.1677838845.3008.1693560397.3721.jpg',
    title: 'Kansas City Airport',
    location: 'Kansas City, MO',
    architect: 'Skidmore, Owings & Merrill',
    year: '2023'
  },
  {
    src: '/images/usa/1280px-Washington\'s_Headquarters_Valley_Forge.jpg',
    title: 'Washington\'s Headquarters',
    location: 'Valley Forge, PA',
    architect: 'Colonial Architecture',
    year: '1770s'
  },
  {
    src: '/images/usa/perkins-amp-will-willow-wood-elementary-school-primary-schools-archello.1638462121.8896.1693560807.9843.jpg',
    title: 'Willow Wood Elementary',
    location: 'Modern Educational Design',
    architect: 'Perkins&Will',
    year: '2021'
  },
  {
    src: '/images/usa/cayetano-gil-518367-unsplash.jpg',
    title: 'Modern American Architecture',
    location: 'Contemporary Design',
    architect: 'Various Architects',
    year: 'Modern Era'
  },
  {
    src: '/images/usa/stephen-walker-yJrMIG0VriI-unsplash.jpg',
    title: 'American Skyline',
    location: 'Urban Architecture',
    architect: 'Various Architects',
    year: 'Contemporary'
  }
]

// Hispanic Architecture (Spanish)
export const hispanicBuildings: BuildingImage[] = [
  {
    src: '/images/hispanic/Antoni-Gaudi-Expiatory-Temple-Holy-Family-Spain(2).jpg',
    title: 'Sagrada Familia',
    location: 'Barcelona, España',
    architect: 'Antoni Gaudí',
    year: '1882-presente'
  },
  {
    src: '/images/hispanic/City-of-Arts-and-Sciences.jpg.webp',
    title: 'Ciudad de las Artes y las Ciencias',
    location: 'Valencia, España',
    architect: 'Santiago Calatrava',
    year: '1998'
  },
  {
    src: '/images/hispanic/Metropolitan-Cathedral-Mexico-City.webp',
    title: 'Catedral Metropolitana',
    location: 'Ciudad de México, México',
    architect: 'Claudio de Arciniega',
    year: '1573-1813'
  },
  {
    src: '/images/hispanic/buenos-aires-Architecture-24.jpg',
    title: 'Teatro Colón',
    location: 'Buenos Aires, Argentina',
    architect: 'Francesco Tamburini',
    year: '1908'
  },
  {
    src: '/images/hispanic/centro-botin-santander-001-c-illan-riestra-nava-1171666.jpg_1911827709.jpg',
    title: 'Centro Botín',
    location: 'Santander, España',
    architect: 'Renzo Piano',
    year: '2017'
  },
  {
    src: '/images/hispanic/Bellas_Artes_01.jpg',
    title: 'Palacio de Bellas Artes',
    location: 'Ciudad de México, México',
    architect: 'Adamo Boari',
    year: '1934'
  },
  {
    src: '/images/hispanic/centro-cultural-internacional-oscar-niemeyer-c-turismo-asturias-nardo-villaboy-03720.jpg_1911827709.jpg',
    title: 'Centro Niemeyer',
    location: 'Avilés, España',
    architect: 'Oscar Niemeyer',
    year: '2011'
  },
  {
    src: '/images/hispanic/ciudad-de-la-cultura-santiago-compostela-004-c-grupo-ciudades-patrimonio.jpg_1911827709.jpg',
    title: 'Ciudad de la Cultura',
    location: 'Santiago de Compostela, España',
    architect: 'Peter Eisenman',
    year: '2011'
  },
  {
    src: '/images/hispanic/buenos-aires-Architecture-23.jpg',
    title: 'Arquitectura Porteña',
    location: 'Buenos Aires, Argentina',
    architect: 'Arquitectura Histórica',
    year: 'Siglo XIX-XX'
  },
  {
    src: '/images/hispanic/historic-buildings-Granada.jpg.webp',
    title: 'Edificios Históricos Granada',
    location: 'Granada, España',
    architect: 'Arquitectura Andaluza',
    year: 'Medieval-Renacentista'
  }
]

// Function to get buildings based on locale
export function getBuildingsByLocale(locale: string): BuildingImage[] {
  switch (locale) {
    case 'en':
      return usaBuildings
    case 'es':
      return hispanicBuildings
    case 'pt':
    default:
      return brazilianBuildings
  }
}

// Function to get professional images (shared across all locales)
export function getProfessionalImages(category?: ProfessionalImage['category']): ProfessionalImage[] {
  if (category) {
    return professionalImages.filter(img => img.category === category)
  }
  return professionalImages
}

// Fallback images (Brazilian) for missing regional images
export function getBuildingsWithFallback(locale: string): BuildingImage[] {
  return getBuildingsByLocale(locale)
}
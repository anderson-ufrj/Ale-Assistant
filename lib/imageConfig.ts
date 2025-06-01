// Configuration for region-specific images
export interface BuildingImage {
  src: string
  title: string
  location: string
  architect: string
  year: string
}

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
    src: '/images/brazil/parque-ibirapuera-1140x675.png',
    title: 'Parque Ibirapuera',
    location: 'São Paulo, SP',
    architect: 'Oscar Niemeyer',
    year: '1954'
  },
  {
    src: '/images/brazil/masp.png',
    title: 'MASP',
    location: 'São Paulo, SP',
    architect: 'Lina Bo Bardi',
    year: '1968'
  },
  {
    src: '/images/brazil/brumadinho-inhotim-museu-mg.jpg',
    title: 'Inhotim',
    location: 'Brumadinho, MG',
    architect: 'Arte & Natureza',
    year: '2006'
  },
  {
    src: '/images/brazil/architect.jpg',
    title: 'Arquiteto Brasileiro',
    location: 'Brasil',
    architect: 'Profissional',
    year: '2024'
  }
]

// USA Architecture (English) - Placeholder structure
export const usaBuildings: BuildingImage[] = [
  {
    src: '/images/usa/fallingwater-frank-lloyd-wright.jpg',
    title: 'Fallingwater',
    location: 'Pennsylvania, USA',
    architect: 'Frank Lloyd Wright',
    year: '1939'
  },
  {
    src: '/images/usa/guggenheim-museum-nyc.jpg',
    title: 'Guggenheim Museum',
    location: 'New York, USA',
    architect: 'Frank Lloyd Wright',
    year: '1959'
  },
  {
    src: '/images/usa/central-park-nyc.jpg',
    title: 'Central Park',
    location: 'New York, USA',
    architect: 'Frederick Law Olmsted',
    year: '1873'
  },
  {
    src: '/images/usa/walt-disney-concert-hall.jpg',
    title: 'Walt Disney Concert Hall',
    location: 'Los Angeles, USA',
    architect: 'Frank Gehry',
    year: '2003'
  },
  {
    src: '/images/usa/american-architect-working.jpg',
    title: 'American Architect',
    location: 'USA',
    architect: 'Professional',
    year: '2024'
  }
]

// Hispanic Architecture (Spanish) - Placeholder structure
export const hispanicBuildings: BuildingImage[] = [
  {
    src: '/images/hispanic/sagrada-familia-gaudi-barcelona.jpg',
    title: 'Sagrada Familia',
    location: 'Barcelona, España',
    architect: 'Antoni Gaudí',
    year: '1882'
  },
  {
    src: '/images/hispanic/guggenheim-bilbao.jpg',
    title: 'Guggenheim Bilbao',
    location: 'Bilbao, España',
    architect: 'Frank Gehry',
    year: '1997'
  },
  {
    src: '/images/hispanic/parque-guell-barcelona.jpg',
    title: 'Park Güell',
    location: 'Barcelona, España',
    architect: 'Antoni Gaudí',
    year: '1914'
  },
  {
    src: '/images/hispanic/museo-soumaya-mexico.jpg',
    title: 'Museo Soumaya',
    location: 'Ciudad de México, México',
    architect: 'Fernando Romero',
    year: '2011'
  },
  {
    src: '/images/hispanic/arquitecto-hispanico-trabajando.jpg',
    title: 'Arquitecto Hispánico',
    location: 'España/México',
    architect: 'Profesional',
    year: '2024'
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

// Fallback images (Brazilian) for missing regional images
export function getBuildingsWithFallback(locale: string): BuildingImage[] {
  const regionalBuildings = getBuildingsByLocale(locale)
  
  // For now, if locale is not 'pt', fallback to Brazilian images
  // This ensures the site works until you add the specific regional images
  if (locale === 'pt') {
    return regionalBuildings
  }
  
  // Return Brazilian buildings as fallback for en/es until images are added
  return brazilianBuildings.map((building, index) => {
    const regionalBuilding = regionalBuildings[index]
    return {
      // Use regional structure but Brazilian image paths as fallback
      src: building.src, // Brazilian image path
      title: regionalBuilding?.title || building.title,
      location: regionalBuilding?.location || building.location,
      architect: regionalBuilding?.architect || building.architect,
      year: regionalBuilding?.year || building.year
    }
  })
}
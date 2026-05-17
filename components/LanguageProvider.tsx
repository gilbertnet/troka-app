'use client'

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

type Language = 'en' | 'es' | 'pt' | 'fr' | 'de' | 'it'

type Dictionary = Record<string, string>

const dictionaries: Record<Language, Dictionary> = {
  en: {
    'nav.search': 'Search...',
    'nav.login': 'Login',
    'nav.profile': 'Profile',
    'nav.logout': 'Logout',
    'nav.language': 'Language',
    'nav.languageAria': 'Select language',
  },
  es: {
    'nav.search': 'Buscar...',
    'nav.login': 'Iniciar sesi\u00f3n',
    'nav.profile': 'Perfil',
    'nav.logout': 'Cerrar sesi\u00f3n',
    'nav.language': 'Idioma',
    'nav.languageAria': 'Seleccionar idioma',
  },
  pt: {
    'nav.search': 'Pesquisar...',
    'nav.login': 'Entrar',
    'nav.profile': 'Perfil',
    'nav.logout': 'Sair',
    'nav.language': 'Idioma',
    'nav.languageAria': 'Selecionar idioma',
  },
  fr: {
    'nav.search': 'Rechercher...',
    'nav.login': 'Connexion',
    'nav.profile': 'Profil',
    'nav.logout': 'D\u00e9connexion',
    'nav.language': 'Langue',
    'nav.languageAria': 'S\u00e9lectionner la langue',
  },
  de: {
    'nav.search': 'Suchen...',
    'nav.login': 'Anmelden',
    'nav.profile': 'Profil',
    'nav.logout': 'Abmelden',
    'nav.language': 'Sprache',
    'nav.languageAria': 'Sprache ausw\u00e4hlen',
  },
  it: {
    'nav.search': 'Cerca...',
    'nav.login': 'Accedi',
    'nav.profile': 'Profilo',
    'nav.logout': 'Disconnetti',
    'nav.language': 'Lingua',
    'nav.languageAria': 'Seleziona lingua',
  },
}

const countryOfficialLanguage: Record<string, Language> = {
  US: 'en',
  GB: 'en',
  CA: 'en',
  AU: 'en',
  MX: 'es',
  ES: 'es',
  AR: 'es',
  CO: 'es',
  CL: 'es',
  PE: 'es',
  DO: 'es',
  BR: 'pt',
  PT: 'pt',
  FR: 'fr',
  BE: 'fr',
  DE: 'de',
  AT: 'de',
  CH: 'de',
  IT: 'it',
}

const languageNames: Record<Language, string> = {
  en: 'English',
  es: 'Espa\u00f1ol',
  pt: 'Portugu\u00eas',
  fr: 'Fran\u00e7ais',
  de: 'Deutsch',
  it: 'Italiano',
}

interface LanguageContextValue {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
  localizeCategory: (category: string) => string
  localizeStatus: (status: string) => string
  languageNames: Record<Language, string>
}

const LanguageContext =
  createContext<LanguageContextValue | null>(
    null
  )

function inferLanguageFromCountry(): Language {
  if (
    typeof navigator === 'undefined' ||
    typeof Intl === 'undefined'
  ) {
    return 'en'
  }

  const localeCandidates = [
    navigator.language,
    ...(navigator.languages || []),
  ].filter(Boolean)

  for (const locale of localeCandidates) {
    const region =
      locale.split('-')[1]?.toUpperCase() || ''

    if (region && countryOfficialLanguage[region]) {
      return countryOfficialLanguage[region]
    }
  }

  // Fallback by timezone when locale has no region.
  const timeZone =
    Intl.DateTimeFormat().resolvedOptions()
      .timeZone || ''

  const tzCountryHints: Record<string, Language> = {
    'America/Santo_Domingo': 'es',
    'America/Mexico_City': 'es',
    'America/Bogota': 'es',
    'America/Lima': 'es',
    'America/Santiago': 'es',
    'America/Argentina': 'es',
    'Europe/Madrid': 'es',
    'America/Sao_Paulo': 'pt',
    'Europe/Lisbon': 'pt',
    'Europe/Paris': 'fr',
    'Europe/Berlin': 'de',
    'Europe/Rome': 'it',
  }

  for (const [tzPrefix, lang] of Object.entries(
    tzCountryHints
  )) {
    if (timeZone.startsWith(tzPrefix)) {
      return lang
    }
  }

  const baseLanguage =
    (navigator.language || 'en')
      .split('-')[0]
      ?.toLowerCase()

  if (
    baseLanguage === 'es' ||
    baseLanguage === 'pt' ||
    baseLanguage === 'fr' ||
    baseLanguage === 'de' ||
    baseLanguage === 'it'
  ) {
    return baseLanguage
  }

  return 'en'
}

export function LanguageProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [language, setLanguageState] =
    useState<Language>('en')

  useEffect(() => {
    const savedLanguage =
      localStorage.getItem('troka-language')
    const source =
      localStorage.getItem(
        'troka-language-source'
      )

    if (
      source === 'manual' &&
      savedLanguage &&
      ['en', 'es', 'pt', 'fr', 'de', 'it'].includes(
        savedLanguage
      )
    ) {
      setLanguageState(savedLanguage as Language)
      return
    }

    const inferred = inferLanguageFromCountry()
    setLanguageState(inferred)
    localStorage.setItem('troka-language', inferred)
    localStorage.setItem(
      'troka-language-source',
      'auto'
    )
  }, [])

  function setLanguage(languageToSet: Language) {
    setLanguageState(languageToSet)
    localStorage.setItem(
      'troka-language',
      languageToSet
    )
    localStorage.setItem(
      'troka-language-source',
      'manual'
    )
  }

  const categoryTranslations: Record<
    string,
    Record<Language, string>
  > = {
    Electronics: {
      en: 'Electronics',
      es: 'Electronica',
      pt: 'Eletronicos',
      fr: 'Electronique',
      de: 'Elektronik',
      it: 'Elettronica',
    },
    Vehicles: {
      en: 'Vehicles',
      es: 'Vehiculos',
      pt: 'Veiculos',
      fr: 'Vehicules',
      de: 'Fahrzeuge',
      it: 'Veicoli',
    },
    'Real Estate': {
      en: 'Real Estate',
      es: 'Bienes Raices',
      pt: 'Imoveis',
      fr: 'Immobilier',
      de: 'Immobilien',
      it: 'Immobili',
    },
    Services: {
      en: 'Services',
      es: 'Servicios',
      pt: 'Servicos',
      fr: 'Services',
      de: 'Dienstleistungen',
      it: 'Servizi',
    },
    Fashion: {
      en: 'Fashion',
      es: 'Moda',
      pt: 'Moda',
      fr: 'Mode',
      de: 'Mode',
      it: 'Moda',
    },
    Home: {
      en: 'Home',
      es: 'Hogar',
      pt: 'Casa',
      fr: 'Maison',
      de: 'Zuhause',
      it: 'Casa',
    },
    Technology: {
      en: 'Technology',
      es: 'Tecnologia',
      pt: 'Tecnologia',
      fr: 'Technologie',
      de: 'Technologie',
      it: 'Tecnologia',
    },
    Phones: {
      en: 'Phones',
      es: 'Telefonos',
      pt: 'Telefones',
      fr: 'Telephones',
      de: 'Telefone',
      it: 'Telefoni',
    },
    Computers: {
      en: 'Computers',
      es: 'Computadoras',
      pt: 'Computadores',
      fr: 'Ordinateurs',
      de: 'Computer',
      it: 'Computer',
    },
    Gaming: {
      en: 'Gaming',
      es: 'Videojuegos',
      pt: 'Jogos',
      fr: 'Jeux video',
      de: 'Gaming',
      it: 'Gaming',
    },
    Furniture: {
      en: 'Furniture',
      es: 'Muebles',
      pt: 'Moveis',
      fr: 'Meubles',
      de: 'Mobel',
      it: 'Mobili',
    },
    Sports: {
      en: 'Sports',
      es: 'Deportes',
      pt: 'Esportes',
      fr: 'Sports',
      de: 'Sport',
      it: 'Sport',
    },
    Tools: {
      en: 'Tools',
      es: 'Herramientas',
      pt: 'Ferramentas',
      fr: 'Outils',
      de: 'Werkzeuge',
      it: 'Strumenti',
    },
    Music: {
      en: 'Music',
      es: 'Musica',
      pt: 'Musica',
      fr: 'Musique',
      de: 'Musik',
      it: 'Musica',
    },
    Collectibles: {
      en: 'Collectibles',
      es: 'Coleccionables',
      pt: 'Colecionaveis',
      fr: 'Objets de collection',
      de: 'Sammlerstucke',
      it: 'Collezionabili',
    },
    Other: {
      en: 'Other',
      es: 'Otros',
      pt: 'Outros',
      fr: 'Autres',
      de: 'Andere',
      it: 'Altro',
    },
  }

  function localizeCategory(category: string) {
    return (
      categoryTranslations[category]?.[language] ||
      category
    )
  }

  const statusTranslations: Record<
    string,
    Record<Language, string>
  > = {
    available: {
      en: 'available',
      es: 'disponible',
      pt: 'disponivel',
      fr: 'disponible',
      de: 'verfugbar',
      it: 'disponibile',
    },
    reserved: {
      en: 'reserved',
      es: 'reservado',
      pt: 'reservado',
      fr: 'reserve',
      de: 'reserviert',
      it: 'riservato',
    },
    traded: {
      en: 'traded',
      es: 'intercambiado',
      pt: 'trocado',
      fr: 'echange',
      de: 'getauscht',
      it: 'scambiato',
    },
    pending: {
      en: 'pending',
      es: 'pendiente',
      pt: 'pendente',
      fr: 'en attente',
      de: 'ausstehend',
      it: 'in attesa',
    },
    accepted: {
      en: 'accepted',
      es: 'aceptado',
      pt: 'aceito',
      fr: 'accepte',
      de: 'akzeptiert',
      it: 'accettato',
    },
    rejected: {
      en: 'rejected',
      es: 'rechazado',
      pt: 'rejeitado',
      fr: 'refuse',
      de: 'abgelehnt',
      it: 'rifiutato',
    },
  }

  function localizeStatus(status: string) {
    const key = status.toLowerCase()
    return (
      statusTranslations[key]?.[language] ||
      status
    )
  }

  const t = useMemo(() => {
    return (key: string) =>
      dictionaries[language][key] ||
      dictionaries.en[key] ||
      key
  }, [language])

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        localizeCategory,
        localizeStatus,
        languageNames,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)

  if (!context) {
    throw new Error(
      'useLanguage must be used inside LanguageProvider'
    )
  }

  return context
}

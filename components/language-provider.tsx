"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "pt" | "es"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  en: {
    // Navigation
    "nav.features": "Features",
    "nav.integrations": "Integrations",
    "nav.pricing": "Pricing",
    "nav.reviews": "Reviews",
    "nav.signin": "Sign In",
    "nav.getstarted": "Get Started",

    // Hero Section
    "hero.badge": "New: Crunchyroll Integration",
    "hero.title": "Organize Your YouTube Channels Like a Pro",
    "hero.subtitle":
      "Create smart groups, collaborate with your team, and get powerful analytics for all your YouTube channels in one beautiful dashboard.",
    "hero.starttrial": "Start Free Trial",
    "hero.watchdemo": "Watch Demo",
    "hero.freetrial": "Free 14-day trial",
    "hero.nocreditcard": "No credit card required",
    "hero.cancelanytime": "Cancel anytime",

    // Stats
    "stats.activeusers": "Active Users",
    "stats.channelsmanaged": "Channels Managed",
    "stats.groupscreated": "Groups Created",
    "stats.uptime": "Uptime",

    // Features
    "features.badge": "Features",
    "features.title": "Everything You Need",
    "features.subtitle":
      "Powerful features designed to help you manage, organize, and grow your YouTube channel portfolio.",
    "features.smartorg.title": "Smart Group Organization",
    "features.smartorg.desc":
      "Create hierarchical groups with custom icons and organize your YouTube channels efficiently.",
    "features.collaboration.title": "Collaboration & Sharing",
    "features.collaboration.desc":
      "Share groups with team members, set permissions, and collaborate on channel management.",
    "features.analytics.title": "Advanced Analytics",
    "features.analytics.desc":
      "Track subscriber growth, view statistics, and analyze channel performance with detailed charts.",
    "features.youtube.title": "YouTube API Integration",
    "features.youtube.desc": "Automatically sync channel data, subscriber counts, and video statistics in real-time.",
    "features.team.title": "Team Management",
    "features.team.desc": "Invite collaborators with different permission levels and manage access to your groups.",
    "features.responsive.title": "Responsive Design",
    "features.responsive.desc":
      "Access your dashboard from any device with our fully responsive and mobile-optimized interface.",

    // Integrations
    "integrations.badge": "Integrations",
    "integrations.title": "Powerful Integrations",
    "integrations.subtitle": "Connect with your favorite platforms and tools to supercharge your workflow.",
    "integrations.crunchyroll.desc": "Track anime content across platforms",
    "integrations.youtube.desc": "Real-time channel data synchronization",
    "integrations.export.desc": "Export data in JSON, CSV formats",

    // Testimonials
    "testimonials.badge": "Testimonials",
    "testimonials.title": "Loved by Creators",
    "testimonials.subtitle": "See what content creators and agencies are saying about Groupify.",
    "testimonials.alex.content":
      "This tool has revolutionized how I manage my 50+ YouTube channels. The grouping feature is a game-changer!",
    "testimonials.sarah.content":
      "Perfect for our agency. We can now organize client channels efficiently and share access with team members.",
    "testimonials.mike.content":
      "The analytics dashboard gives me insights I never had before. Highly recommend for serious creators.",

    // Pricing
    "pricing.badge": "Pricing",
    "pricing.title": "Simple, Transparent Pricing",
    "pricing.subtitle": "Choose the plan that's right for you. Upgrade or downgrade at any time.",
    "pricing.popular": "Most Popular",
    "pricing.free.name": "Free",
    "pricing.free.desc": "Perfect for getting started",
    "pricing.pro.name": "Pro",
    "pricing.pro.desc": "For serious content creators",
    "pricing.business.name": "Business",
    "pricing.business.desc": "For agencies and teams",
    "pricing.getstarted": "Get Started",
    "pricing.starttrial": "Start Free Trial",
    "pricing.contactsales": "Contact Sales",

    // CTA
    "cta.badge": "Ready to Launch",
    "cta.title": "Ready to Get Started?",
    "cta.subtitle":
      "Join thousands of content creators who are already using Groupify to organize and grow their YouTube presence.",

    // Footer
    "footer.description":
      "The ultimate tool for organizing and managing your YouTube channel portfolio with modern design and powerful features.",
    "footer.product": "Product",
    "footer.support": "Support",
    "footer.company": "Company",
    "footer.copyright": "All rights reserved. Built with ❤️ for content creators.",
  },
  pt: {
    // Navigation
    "nav.features": "Recursos",
    "nav.integrations": "Integrações",
    "nav.pricing": "Preços",
    "nav.reviews": "Avaliações",
    "nav.signin": "Entrar",
    "nav.getstarted": "Começar",

    // Hero Section
    "hero.badge": "Novo: Integração Crunchyroll",
    "hero.title": "Organize Seus Canais do YouTube Como um Profissional",
    "hero.subtitle":
      "Crie grupos inteligentes, colabore com sua equipe e obtenha análises poderosas para todos os seus canais do YouTube em um painel bonito.",
    "hero.starttrial": "Iniciar Teste Grátis",
    "hero.watchdemo": "Ver Demo",
    "hero.freetrial": "Teste grátis de 14 dias",
    "hero.nocreditcard": "Não precisa de cartão de crédito",
    "hero.cancelanytime": "Cancele a qualquer momento",

    // Stats
    "stats.activeusers": "Usuários Ativos",
    "stats.channelsmanaged": "Canais Gerenciados",
    "stats.groupscreated": "Grupos Criados",
    "stats.uptime": "Tempo Ativo",

    // Features
    "features.badge": "Recursos",
    "features.title": "Tudo Que Você Precisa",
    "features.subtitle":
      "Recursos poderosos projetados para ajudá-lo a gerenciar, organizar e expandir seu portfólio de canais do YouTube.",
    "features.smartorg.title": "Organização Inteligente de Grupos",
    "features.smartorg.desc":
      "Crie grupos hierárquicos com ícones personalizados e organize seus canais do YouTube de forma eficiente.",
    "features.collaboration.title": "Colaboração e Compartilhamento",
    "features.collaboration.desc":
      "Compartilhe grupos com membros da equipe, defina permissões e colabore no gerenciamento de canais.",
    "features.analytics.title": "Análises Avançadas",
    "features.analytics.desc":
      "Acompanhe o crescimento de inscritos, visualize estatísticas e analise o desempenho dos canais com gráficos detalhados.",
    "features.youtube.title": "Integração com API do YouTube",
    "features.youtube.desc":
      "Sincronize automaticamente dados de canais, contagem de inscritos e estatísticas de vídeos em tempo real.",
    "features.team.title": "Gerenciamento de Equipe",
    "features.team.desc":
      "Convide colaboradores com diferentes níveis de permissão e gerencie o acesso aos seus grupos.",
    "features.responsive.title": "Design Responsivo",
    "features.responsive.desc":
      "Acesse seu painel de qualquer dispositivo com nossa interface totalmente responsiva e otimizada para mobile.",

    // Integrations
    "integrations.badge": "Integrações",
    "integrations.title": "Integrações Poderosas",
    "integrations.subtitle":
      "Conecte-se com suas plataformas e ferramentas favoritas para turbinar seu fluxo de trabalho.",
    "integrations.crunchyroll.desc": "Acompanhe conteúdo de anime em plataformas",
    "integrations.youtube.desc": "Sincronização de dados de canal em tempo real",
    "integrations.export.desc": "Exporte dados em formatos JSON, CSV",

    // Testimonials
    "testimonials.badge": "Depoimentos",
    "testimonials.title": "Amado por Criadores",
    "testimonials.subtitle": "Veja o que criadores de conteúdo e agências estão dizendo sobre o Groupify.",
    "testimonials.alex.content":
      "Esta ferramenta revolucionou como gerencio meus mais de 50 canais do YouTube. O recurso de agrupamento é revolucionário!",
    "testimonials.sarah.content":
      "Perfeito para nossa agência. Agora podemos organizar canais de clientes de forma eficiente e compartilhar acesso com membros da equipe.",
    "testimonials.mike.content":
      "O painel de análises me dá insights que nunca tive antes. Altamente recomendado para criadores sérios.",

    // Pricing
    "pricing.badge": "Preços",
    "pricing.title": "Preços Simples e Transparentes",
    "pricing.subtitle": "Escolha o plano certo para você. Faça upgrade ou downgrade a qualquer momento.",
    "pricing.popular": "Mais Popular",
    "pricing.free.name": "Grátis",
    "pricing.free.desc": "Perfeito para começar",
    "pricing.pro.name": "Pro",
    "pricing.pro.desc": "Para criadores de conteúdo sérios",
    "pricing.business.name": "Empresarial",
    "pricing.business.desc": "Para agências e equipes",
    "pricing.getstarted": "Começar",
    "pricing.starttrial": "Iniciar Teste Grátis",
    "pricing.contactsales": "Contatar Vendas",

    // CTA
    "cta.badge": "Pronto para Lançar",
    "cta.title": "Pronto para Começar?",
    "cta.subtitle":
      "Junte-se a milhares de criadores de conteúdo que já estão usando o Groupify para organizar e expandir sua presença no YouTube.",

    // Footer
    "footer.description":
      "A ferramenta definitiva para organizar e gerenciar seu portfólio de canais do YouTube com design moderno e recursos poderosos.",
    "footer.product": "Produto",
    "footer.support": "Suporte",
    "footer.company": "Empresa",
    "footer.copyright": "Todos os direitos reservados. Feito com ❤️ para criadores de conteúdo.",
  },
  es: {
    // Navigation
    "nav.features": "Características",
    "nav.integrations": "Integraciones",
    "nav.pricing": "Precios",
    "nav.reviews": "Reseñas",
    "nav.signin": "Iniciar Sesión",
    "nav.getstarted": "Comenzar",

    // Hero Section
    "hero.badge": "Nuevo: Integración Crunchyroll",
    "hero.title": "Organiza Tus Canales de YouTube Como un Profesional",
    "hero.subtitle":
      "Crea grupos inteligentes, colabora con tu equipo y obtén análisis poderosos para todos tus canales de YouTube en un hermoso panel.",
    "hero.starttrial": "Iniciar Prueba Gratuita",
    "hero.watchdemo": "Ver Demo",
    "hero.freetrial": "Prueba gratuita de 14 días",
    "hero.nocreditcard": "No se requiere tarjeta de crédito",
    "hero.cancelanytime": "Cancela en cualquier momento",

    // Stats
    "stats.activeusers": "Usuarios Activos",
    "stats.channelsmanaged": "Canales Gestionados",
    "stats.groupscreated": "Grupos Creados",
    "stats.uptime": "Tiempo Activo",

    // Features
    "features.badge": "Características",
    "features.title": "Todo Lo Que Necesitas",
    "features.subtitle":
      "Características poderosas diseñadas para ayudarte a gestionar, organizar y hacer crecer tu portafolio de canales de YouTube.",
    "features.smartorg.title": "Organización Inteligente de Grupos",
    "features.smartorg.desc":
      "Crea grupos jerárquicos con iconos personalizados y organiza tus canales de YouTube de manera eficiente.",
    "features.collaboration.title": "Colaboración y Compartir",
    "features.collaboration.desc":
      "Comparte grupos con miembros del equipo, establece permisos y colabora en la gestión de canales.",
    "features.analytics.title": "Análisis Avanzados",
    "features.analytics.desc":
      "Rastrea el crecimiento de suscriptores, ve estadísticas y analiza el rendimiento de canales con gráficos detallados.",
    "features.youtube.title": "Integración API de YouTube",
    "features.youtube.desc":
      "Sincroniza automáticamente datos de canales, conteo de suscriptores y estadísticas de videos en tiempo real.",
    "features.team.title": "Gestión de Equipo",
    "features.team.desc": "Invita colaboradores con diferentes niveles de permisos y gestiona el acceso a tus grupos.",
    "features.responsive.title": "Diseño Responsivo",
    "features.responsive.desc":
      "Accede a tu panel desde cualquier dispositivo con nuestra interfaz completamente responsiva y optimizada para móviles.",

    // Integrations
    "integrations.badge": "Integraciones",
    "integrations.title": "Integraciones Poderosas",
    "integrations.subtitle": "Conecta con tus plataformas y herramientas favoritas para potenciar tu flujo de trabajo.",
    "integrations.crunchyroll.desc": "Rastrea contenido de anime en plataformas",
    "integrations.youtube.desc": "Sincronización de datos de canal en tiempo real",
    "integrations.export.desc": "Exporta datos en formatos JSON, CSV",

    // Testimonials
    "testimonials.badge": "Testimonios",
    "testimonials.title": "Amado por Creadores",
    "testimonials.subtitle": "Ve lo que creadores de contenido y agencias están diciendo sobre Groupify.",
    "testimonials.alex.content":
      "Esta herramienta ha revolucionado cómo gestiono mis más de 50 canales de YouTube. ¡La función de agrupación es revolucionaria!",
    "testimonials.sarah.content":
      "Perfecto para nuestra agencia. Ahora podemos organizar canales de clientes de manera eficiente y compartir acceso con miembros del equipo.",
    "testimonials.mike.content":
      "El panel de análisis me da insights que nunca tuve antes. Altamente recomendado para creadores serios.",

    // Pricing
    "pricing.badge": "Precios",
    "pricing.title": "Precios Simples y Transparentes",
    "pricing.subtitle": "Elige el plan adecuado para ti. Actualiza o degrada en cualquier momento.",
    "pricing.popular": "Más Popular",
    "pricing.free.name": "Gratis",
    "pricing.free.desc": "Perfecto para comenzar",
    "pricing.pro.name": "Pro",
    "pricing.pro.desc": "Para creadores de contenido serios",
    "pricing.business.name": "Empresarial",
    "pricing.business.desc": "Para agencias y equipos",
    "pricing.getstarted": "Comenzar",
    "pricing.starttrial": "Iniciar Prueba Gratuita",
    "pricing.contactsales": "Contactar Ventas",

    // CTA
    "cta.badge": "Listo para Lanzar",
    "cta.title": "¿Listo para Comenzar?",
    "cta.subtitle":
      "Únete a miles de creadores de contenido que ya están usando Groupify para organizar y hacer crecer su presencia en YouTube.",

    // Footer
    "footer.description":
      "La herramienta definitiva para organizar y gestionar tu portafolio de canales de YouTube con diseño moderno y características poderosas.",
    "footer.product": "Producto",
    "footer.support": "Soporte",
    "footer.company": "Empresa",
    "footer.copyright": "Todos los derechos reservados. Hecho con ❤️ para creadores de contenido.",
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && ["en", "pt", "es"].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    }
  }, [])

  const changeLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>{children}</LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

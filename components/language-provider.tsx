"use client";

import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";

type Language = "en" | "pt" | "es";

interface LanguageContextType {
	language: Language;
	setLanguage: (lang: Language) => void;
	t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
	undefined,
);

const translations = {
	en: {
		// Navigation
		"nav.features": "Features",
		"nav.integrations": "Integrations",
		"nav.pricing": "Pricing",
		"nav.reviews": "Reviews",
		"nav.signin": "Sign In",
		"nav.getstarted": "Get Started",

		// Login Page
		"login.welcome": "Welcome back! Please sign in to your account.",
		"login.title": "Sign In",
		"login.description":
			"Enter your email and password to access your dashboard",
		"login.email": "Email",
		"login.email.placeholder": "Enter your email",
		"login.password": "Password",
		"login.password.placeholder": "Enter your password",
		"login.forgot": "Forgot your password?",
		"login.signin": "Sign In",
		"login.signing": "Signing in...",
		"login.or": "Or continue with",
		"login.google": "Google",
		"login.github": "GitHub",
		"login.noaccount": "Don't have an account?",
		"login.signup": "Sign up",
		"login.backhome": "Back to home",
		"login.demo": "Demo credentials:",
		"login.demo.email": "Email: demo@example.com",
		"login.demo.password": "Password: password",
		"login.validation.email.required": "Email is required",
		"login.validation.email.invalid": "Please enter a valid email address",
		"login.validation.password.required": "Password is required",
		"login.validation.password.min":
			"Password must be at least 6 characters long",

		// Forgot Password Page
		"forgot.title": "Reset Password",
		"forgot.description":
			"Enter your email address and we'll send you a link to reset your password.",
		"forgot.email": "Email",
		"forgot.email.placeholder": "Enter your email address",
		"forgot.send": "Send Reset Link",
		"forgot.sending": "Sending...",
		"forgot.error": "Failed to send reset email. Please try again.",
		"forgot.backsignin": "Back to Sign In",
		"forgot.success.title": "Check Your Email",
		"forgot.success.description": "We've sent a password reset link to",
		"forgot.success.next.title": "What's next?",
		"forgot.success.next.step1": "1. Check your email inbox",
		"forgot.success.next.step2": "2. Click the reset link in the email",
		"forgot.success.next.step3": "3. Create a new password",
		"forgot.success.noemail.title": "Didn't receive the email?",
		"forgot.success.noemail.description":
			"Check your spam folder or try resending the email.",
		"forgot.success.resend": "Resend Email",
		"forgot.success.backsignin": "Back to Sign In",

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
		"features.youtube.desc":
			"Automatically sync channel data, subscriber counts, and video statistics in real-time.",
		"features.team.title": "Team Management",
		"features.team.desc":
			"Invite collaborators with different permission levels and manage access to your groups.",
		"features.responsive.title": "Responsive Design",
		"features.responsive.desc":
			"Access your dashboard from any device with our fully responsive and mobile-optimized interface.",

		"register.welcome":
			"Create your account and start organizing your YouTube channels.",
		"register.title": "Create Account",
		"register.description": "Enter your details to create your account",
		"register.name": "Full Name",
		"register.name.placeholder": "Enter your full name",
		"register.email": "Email",
		"register.email.placeholder": "Enter your email",
		"register.password": "Password",
		"register.password.placeholder": "Create a password",
		"register.confirmpassword": "Confirm Password",
		"register.confirmpassword.placeholder": "Confirm your password",
		"register.terms": "I agree to the",
		"register.terms.link": "Terms of Service",
		"register.privacy": "and",
		"register.privacy.link": "Privacy Policy",
		"register.signup": "Sign Up",
		"register.signing": "Creating account...",
		"register.or": "Or continue with",
		"register.google": "Google",
		"register.github": "GitHub",
		"register.hasaccount": "Already have an account?",
		"register.signin": "Sign In",
		"register.backhome": "Back to Home",
		"register.validation.name.required": "Full name is required",
		"register.validation.name.min": "Name must be at least 2 characters long",
		"register.validation.email.required": "Email is required",
		"register.validation.email.invalid": "Please enter a valid email address",
		"register.validation.password.required": "Password is required",
		"register.validation.password.min":
			"Password must be at least 6 characters long",
		"register.validation.confirmpassword.required":
			"Please confirm your password",
		"register.validation.confirmpassword.match": "Passwords do not match",

		// Integrations
		"integrations.badge": "Integrations",
		"integrations.title": "Powerful Integrations",
		"integrations.subtitle":
			"Connect with your favorite platforms and tools to supercharge your workflow.",
		"integrations.crunchyroll.desc": "Track anime content across platforms",
		"integrations.youtube.desc": "Real-time channel data synchronization",
		"integrations.export.desc": "Export data in JSON, CSV formats",

		// Testimonials
		"testimonials.badge": "Testimonials",
		"testimonials.title": "Loved by Creators",
		"testimonials.subtitle":
			"See what content creators and agencies are saying about Groupify.",
		"testimonials.alex.content":
			"This tool has revolutionized how I manage my 50+ YouTube channels. The grouping feature is a game-changer!",
		"testimonials.sarah.content":
			"Perfect for our agency. We can now organize client channels efficiently and share access with team members.",
		"testimonials.mike.content":
			"The analytics dashboard gives me insights I never had before. Highly recommend for serious creators.",

		// Pricing
		"pricing.badge": "Pricing",
		"pricing.title": "Simple, Transparent Pricing",
		"pricing.subtitle":
			"Choose the plan that's right for you. Upgrade or downgrade at any time.",
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
		"footer.copyright":
			"All rights reserved. Built with ❤️ for content creators.",
	},
	pt: {
		// Navigation
		"nav.features": "Recursos",
		"nav.integrations": "Integrações",
		"nav.pricing": "Preços",
		"nav.reviews": "Avaliações",
		"nav.signin": "Entrar",
		"nav.getstarted": "Começar",

		// Login Page
		"login.welcome": "Bem-vindo de volta! Faça login em sua conta.",
		"login.title": "Entrar",
		"login.description": "Digite seu email e senha para acessar seu painel",
		"login.email": "Email",
		"login.email.placeholder": "Digite seu email",
		"login.password": "Senha",
		"login.password.placeholder": "Digite sua senha",
		"login.forgot": "Esqueceu sua senha?",
		"login.signin": "Entrar",
		"login.signing": "Entrando...",
		"login.or": "Ou continue com",
		"login.google": "Google",
		"login.github": "GitHub",
		"login.noaccount": "Não tem uma conta?",
		"login.signup": "Cadastre-se",
		"login.backhome": "Voltar ao início",
		"login.demo": "Credenciais de demonstração:",
		"login.demo.email": "Email: demo@example.com",
		"login.demo.password": "Senha: password",
		"login.validation.email.required": "Email é obrigatório",
		"login.validation.email.invalid":
			"Por favor, digite um endereço de email válido",
		"login.validation.password.required": "Senha é obrigatória",
		"login.validation.password.min": "A senha deve ter pelo menos 6 caracteres",

		// Forgot Password Page
		"forgot.title": "Redefinir Senha",
		"forgot.description":
			"Digite seu endereço de email e enviaremos um link para redefinir sua senha.",
		"forgot.email": "Email",
		"forgot.email.placeholder": "Digite seu endereço de email",
		"forgot.send": "Enviar Link de Redefinição",
		"forgot.sending": "Enviando...",
		"forgot.error": "Falha ao enviar email de redefinição. Tente novamente.",
		"forgot.backsignin": "Voltar ao Login",
		"forgot.success.title": "Verifique Seu Email",
		"forgot.success.description":
			"Enviamos um link de redefinição de senha para",
		"forgot.success.next.title": "O que fazer agora?",
		"forgot.success.next.step1": "1. Verifique sua caixa de entrada",
		"forgot.success.next.step2": "2. Clique no link de redefinição no email",
		"forgot.success.next.step3": "3. Crie uma nova senha",
		"forgot.success.noemail.title": "Não recebeu o email?",
		"forgot.success.noemail.description":
			"Verifique sua pasta de spam ou tente reenviar o email.",
		"forgot.success.resend": "Reenviar Email",
		"forgot.success.backsignin": "Voltar ao Login",

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
		// Register Page
		"register.welcome":
			"Crie sua conta e comece a organizar seus canais do YouTube.",
		"register.title": "Criar Conta",
		"register.description": "Digite seus dados para criar sua conta",
		"register.name": "Nome Completo",
		"register.name.placeholder": "Digite seu nome completo",
		"register.email": "Email",
		"register.email.placeholder": "Digite seu email",
		"register.password": "Senha",
		"register.password.placeholder": "Crie uma senha",
		"register.confirmpassword": "Confirmar Senha",
		"register.confirmpassword.placeholder": "Confirme sua senha",
		"register.terms": "Eu concordo com os",
		"register.terms.link": "Termos de Serviço",
		"register.privacy": "e",
		"register.privacy.link": "Política de Privacidade",
		"register.signup": "Criar Conta",
		"register.signing": "Criando conta...",
		"register.or": "Ou continue com",
		"register.google": "Google",
		"register.github": "GitHub",
		"register.hasaccount": "Já tem uma conta?",
		"register.signin": "Entrar",
		"register.backhome": "Voltar ao início",
		"register.validation.name.required": "Nome completo é obrigatório",
		"register.validation.name.min": "Nome deve ter pelo menos 2 caracteres",
		"register.validation.email.required": "Email é obrigatório",
		"register.validation.email.invalid":
			"Por favor, digite um endereço de email válido",
		"register.validation.password.required": "Senha é obrigatória",
		"register.validation.password.min":
			"A senha deve ter pelo menos 6 caracteres",
		"register.validation.confirmpassword.required":
			"Por favor, confirme sua senha",
		"register.validation.confirmpassword.match": "As senhas não coincidem",

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
			"Compartilhe grupos com membros da equipe, establece permisos e colabore no gerenciamento de canais.",
		"features.analytics.title": "Análises Avançadas",
		"features.analytics.desc":
			"Acompanhe o crescimento de inscritos, visualize estatísticas e analise o desempenho dos canais com gráficos detalhados.",
		"features.youtube.title": "Integração com API do YouTube",
		"features.youtube.desc":
			"Sincronize automaticamente dados de canais, contagem de inscritos e estatísticas de vídeos em tempo real.",
		"features.team.title": "Gerenciamento de Equipe",
		"features.team.desc":
			"Convide colaboradores com diferentes níveis de permisos e gerencie o acesso aos seus grupos.",
		"features.responsive.title": "Design Responsivo",
		"features.responsive.desc":
			"Acesse seu painel de qualquer dispositivo com nossa interface totalmente responsiva e otimizada para mobile.",

		// Integrations
		"integrations.badge": "Integrações",
		"integrations.title": "Integrações Poderosas",
		"integrations.subtitle":
			"Conecte-se com suas plataformas e ferramentas favoritas para turbinar seu fluxo de trabalho.",
		"integrations.crunchyroll.desc":
			"Acompanhe conteúdo de anime em plataformas",
		"integrations.youtube.desc":
			"Sincronização de dados de canal em tempo real",
		"integrations.export.desc": "Exporta dados em formatos JSON, CSV",

		// Testimonials
		"testimonials.badge": "Depoimentos",
		"testimonials.title": "Amado por Criadores",
		"testimonials.subtitle":
			"Veja o que criadores de conteúdo e agências estão dizendo sobre o Groupify.",
		"testimonials.alex.content":
			"Esta ferramenta revolucionou como gestiono mis más de 50 canales de YouTube. ¡La función de agrupación es revolucionária!",
		"testimonials.sarah.content":
			"Perfecto para nuestra agencia. Ahora podemos organizar canales de clientes de forma eficiente y compartir acceso con miembros del equipo.",
		"testimonials.mike.content":
			"El panel de análisis me dá insights que nunca tuve antes. Altamente recomendado para creadores serios.",

		// Pricing
		"pricing.badge": "Preços",
		"pricing.title": "Preços Simples e Transparentes",
		"pricing.subtitle":
			"Escolha o plano certo para você. Faça upgrade ou downgrade a qualquer momento.",
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
		"cta.badge": "Pronto para Lanzar",
		"cta.title": "¿Listo para Comenzar?",
		"cta.subtitle":
			"Únete a miles de creadores de contenido que já estão usando o Groupify para organizar e expandir sua presença no YouTube.",

		// Footer
		"footer.description":
			"La herramienta definitiva para organizar y gestionar tu portafolio de canales de YouTube con diseño moderno y características poderosas.",
		"footer.product": "Producto",
		"footer.support": "Soporte",
		"footer.company": "Empresa",
		"footer.copyright":
			"Todos los derechos reservados. Hecho con ❤️ para creadores de contenido.",
	},
	es: {
		// Navigation
		"nav.features": "Características",
		"nav.integrations": "Integraciones",
		"nav.pricing": "Precios",
		"nav.reviews": "Reseñas",
		"nav.signin": "Iniciar Sesión",
		"nav.getstarted": "Comenzar",

		// Login Page
		"login.welcome":
			"¡Bienvenido de vuelta! Por favor, inicia sesión en tu cuenta.",
		"login.title": "Iniciar Sesión",
		"login.description":
			"Ingresa tu email y contraseña para acceder a tu panel",
		"login.email": "Email",
		"login.email.placeholder": "Ingresa tu email",
		"login.password": "Contraseña",
		"login.password.placeholder": "Ingresa tu contraseña",
		"login.forgot": "¿Olvidaste tu contraseña?",
		"login.signin": "Iniciar Sesión",
		"login.signing": "Iniciando sesión...",
		"login.or": "O continúa con",
		"login.google": "Google",
		"login.github": "GitHub",
		"login.noaccount": "¿No tienes una cuenta?",
		"login.signup": "Regístrate",
		"login.backhome": "Volver al inicio",
		"login.demo": "Credenciales de demostración:",
		"login.demo.email": "Email: demo@example.com",
		"login.demo.password": "Contraseña: password",
		"login.validation.email.required": "El email es requerido",
		"login.validation.email.invalid":
			"Por favor, ingresa una dirección de email válida",
		"login.validation.password.required": "La contraseña es requerida",
		"login.validation.password.min":
			"La contraseña debe tener al menos 6 caracteres",

		// Register Page
		"register.welcome":
			"Crea tu cuenta y comienza a organizar tus canales de YouTube.",
		"register.title": "Crear Cuenta",
		"register.description": "Ingresa tus datos para crear tu cuenta",
		"register.name": "Nombre Completo",
		"register.name.placeholder": "Ingresa tu nombre completo",
		"register.email": "Email",
		"register.email.placeholder": "Ingresa tu email",
		"register.password": "Contraseña",
		"register.password.placeholder": "Crea una contraseña",
		"register.confirmpassword": "Confirmar Contraseña",
		"register.confirmpassword.placeholder": "Confirma tu contraseña",
		"register.terms": "Acepto los",
		"register.terms.link": "Términos de Servicio",
		"register.privacy": "y",
		"register.privacy.link": "Política de Privacidad",
		"register.signup": "Crear Cuenta",
		"register.signing": "Creando cuenta...",
		"register.or": "O continúa con",
		"register.google": "Google",
		"register.github": "GitHub",
		"register.hasaccount": "¿Ya tienes una cuenta?",
		"register.signin": "Iniciar sesión",
		"register.backhome": "Volver al inicio",
		"register.validation.name.required": "El nombre completo es requerido",
		"register.validation.name.min":
			"El nombre debe tener al menos 2 caracteres",
		"register.validation.email.required": "El email es requerido",
		"register.validation.email.invalid":
			"Por favor, ingresa una dirección de email válida",
		"register.validation.password.required": "La contraseña es requerida",
		"register.validation.password.min":
			"La contraseña debe tener al menos 6 caracteres",
		"register.validation.confirmpassword.required":
			"Por favor, confirma tu contraseña",
		"register.validation.confirmpassword.match": "Las contraseñas no coinciden",

		// Página de Olvidé mi Contraseña
		"forgot.title": "Restablecer Contraseña",
		"forgot.description":
			"Ingresa tu dirección de correo electrónico y te enviaremos un enlace para restablecer tu contraseña.",
		"forgot.email": "Correo Electrónico",
		"forgot.email.placeholder": "Ingresa tu dirección de correo electrónico",
		"forgot.send": "Enviar Enlace de Restablecimiento",
		"forgot.sending": "Enviando...",
		"forgot.error":
			"No se pudo enviar el correo de restablecimiento. Inténtalo de nuevo.",
		"forgot.backsignin": "Volver al Inicio de Sesión",
		"forgot.success.title": "Revisa tu Correo",
		"forgot.success.description":
			"Te hemos enviado un enlace para restablecer tu contraseña a",
		"forgot.success.next.title": "¿Qué hacer ahora?",
		"forgot.success.next.step1": "1. Revisa tu bandeja de entrada",
		"forgot.success.next.step2":
			"2. Haz clic en el enlace de restablecimiento en el correo",
		"forgot.success.next.step3": "3. Crea una nueva contraseña",
		"forgot.success.noemail.title": "¿No recibiste el correo?",
		"forgot.success.noemail.description":
			"Revisa tu carpeta de spam o intenta reenviar el correo.",
		"forgot.success.resend": "Reenviar Correo",
		"forgot.success.backsignin": "Volver al Inicio de Sesión",

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
			"Rastrea el crecimiento de suscriptores, ve estatísticas y analiza el rendimiento de canales con gráficos detallados.",
		"features.youtube.title": "Integración API de YouTube",
		"features.youtube.desc":
			"Sincroniza automáticamente datos de canales, conteo de suscriptores y estatísticas de videos en tiempo real.",
		"features.team.title": "Gestión de Equipo",
		"features.team.desc":
			"Invita colaboradores con diferentes niveles de permisos y gestiona el acceso a tus grupos.",
		"features.responsive.title": "Diseño Responsivo",
		"features.responsive.desc":
			"Accede a tu panel desde cualquier dispositivo con nuestra interfaz completamente responsiva y optimizada para móviles.",

		// Integrations
		"integrations.badge": "Integraciones",
		"integrations.title": "Integraciones Poderosas",
		"integrations.subtitle":
			"Conecta con tus plataformas y herramientas favoritas para potenciar tu flujo de trabajo.",
		"integrations.crunchyroll.desc": "Rastrea conteúdo de anime em plataformas",
		"integrations.youtube.desc":
			"Sincronización de datos de canal em tempo real",
		"integrations.export.desc": "Exporta dados em formatos JSON, CSV",

		// Testimonials
		"testimonials.badge": "Testimonios",
		"testimonials.title": "Amado por Creadores",
		"testimonials.subtitle":
			"Ve lo que creadores de contenido y agencias están diciendo sobre Groupify.",
		"testimonials.alex.content":
			"Esta herramienta ha revolucionado cómo gestiono mis más de 50 canales de YouTube. ¡La función de agrupación es revolucionária!",
		"testimonials.sarah.content":
			"Perfecto para nuestra agencia. Ahora podemos organizar canales de clientes de manera eficiente y compartir acceso con miembros del equipo.",
		"testimonials.mike.content":
			"El panel de análisis me da insights que nunca tuve antes. Altamente recomendado para creadores serios.",

		// Pricing
		"pricing.badge": "Precios",
		"pricing.title": "Precios Simples y Transparentes",
		"pricing.subtitle":
			"Elige el plan adecuado para ti. Actualiza o degrada en cualquier momento.",
		"pricing.popular": "Más Popular",
		"pricing.free.name": "Grátis",
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
			"Únete a miles de creadores de contenido que já están usando o Groupify para organizar y hacer crecer su presencia en YouTube.",

		// Footer
		"footer.description":
			"La herramienta definitiva para organizar y gestionar tu portafolio de canales de YouTube con diseño moderno y características poderosas.",
		"footer.product": "Producto",
		"footer.support": "Soporte",
		"footer.company": "Empresa",
		"footer.copyright":
			"Todos los derechos reservados. Hecho con ❤️ para creadores de contenido.",
	},
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
	const [language, setLanguage] = useState<Language>("en");

	useEffect(() => {
		const savedLanguage = localStorage.getItem("language") as Language;
		if (savedLanguage && ["en", "pt", "es"].includes(savedLanguage)) {
			setLanguage(savedLanguage);
		}
	}, []);

	const changeLanguage = (lang: Language) => {
		setLanguage(lang);
		localStorage.setItem("language", lang);
	};

	const t = (key: string): string => {
		return (
			translations[language][
				key as keyof (typeof translations)[typeof language]
			] || key
		);
	};

	return (
		<LanguageContext.Provider
			value={{ language, setLanguage: changeLanguage, t }}
		>
			{children}
		</LanguageContext.Provider>
	);
}

export function useLanguage() {
	const context = useContext(LanguageContext);
	if (context === undefined) {
		throw new Error("useLanguage must be used within a LanguageProvider");
	}
	return context;
}

"use client";

import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";

type Language = "en" | "pt" | "es";

interface LanguageContextType {
	language: Language;
	setLanguage: (lang: Language) => void;
	t: (key: string, params?: Record<string, string>) => string;
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
		"login.subtitle": "Enter your email and password to access your dashboard",
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
		"login.google": "Sign in with Google",
		"login.discord": "Sign In with Discord",
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
			"Organize your YouTube channels with custom groups, collaborate with your team, and access powerful analytics — all in one sleek dashboard.",
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
		"features.integrated.title": "Integrated UI",
		"features.integrated.desc":
			"Access the groups directly from the Youtube and Crunchyroll website",

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
		"register.discord": "Discord",
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
		"integrations.export.desc":
			"A place to export your groups and channels to the community",

		// Landing Page - New Content
		"landing.hero.badge": "Now with Browser Extension",
		"landing.hero.title": "Organize Your YouTube Like Never Before",
		"landing.hero.subtitle":
			"Groupify helps you organize, manage, and share your YouTube subscriptions. Create custom groups, collaborate with teams, and never lose track of your favorite channels again.",
		"landing.hero.cta.primary": "Start Free Trial",
		"landing.hero.cta.secondary": "Watch Demo",
		"landing.hero.trust1": "No credit card required",
		"landing.hero.trust2": "14-day free trial",
		"landing.hero.trust3": "Cancel anytime",
		"landing.hero.preview": "Groupify Dashboard",

		// Landing Page - Features Section
		"landing.features.title": "Everything You Need to Organize YouTube",
		"landing.features.subtitle":
			"Powerful features designed for content creators, teams, and YouTube enthusiasts",
		"landing.features.smart.title": "Smart Organization",
		"landing.features.smart.desc":
			"Create unlimited groups with custom categories. Nest groups within groups for ultimate flexibility in managing your YouTube subscriptions.",
		"landing.features.share.title": "Share & Collaborate",
		"landing.features.share.desc":
			"Generate shareable links to let others view or copy your groups. Perfect for content creators, teams, and communities.",
		"landing.features.permissions.title": "Team Permissions",
		"landing.features.permissions.desc":
			"Control access with granular permissions. Assign view-only, editor, or admin roles to manage who can modify your groups.",
		"landing.features.bulk.title": "Bulk Operations",
		"landing.features.bulk.desc":
			"Save time with powerful batch actions. Add, remove, or move multiple channels across groups in seconds.",
		"landing.features.extension.title": "Extension Integration",
		"landing.features.extension.desc":
			"Our browser extension lets you add channels directly from YouTube. One-click organization while you browse.",
		"landing.features.everywhere.title": "Works Everywhere",
		"landing.features.everywhere.desc":
			"Access your organized channels from any device. Web app and browser extensions for Chrome, Firefox, and Safari.",

		// Landing Page - Browser Extension Section
		"landing.extension.badge": "Browser Extension",
		"landing.extension.title": "Add Channels While You Browse",
		"landing.extension.subtitle":
			"Our browser extension seamlessly integrates with YouTube. When you find a channel you want to save, just click the Groupify icon and add it to any group instantly.",
		"landing.extension.success": "Channel added to group",
		"landing.extension.subscribers": "subscribers",

		// Landing Page - Testimonials Section
		"landing.testimonials.title": "Loved by Content Creators",
		"landing.testimonials.subtitle":
			"See what our users are saying about Groupify",
		"landing.testimonials.alex.content":
			"Groupify has completely transformed how I manage my YouTube subscriptions. I can finally keep my educational content separate from entertainment!",
		"landing.testimonials.sarah.content":
			"The ability to share curated groups with my team has been a game-changer. We can quickly share industry insights and competitor analysis.",
		"landing.testimonials.mike.content":
			"I have tried many tools, but Groupify is the only one that actually understands how content creators work. The nested groups feature is brilliant!",

		// Landing Page - Pricing Section
		"landing.pricing.title": "Simple, Transparent Pricing",
		"landing.pricing.subtitle":
			"Choose the plan that fits your needs. All plans include a 14-day free trial.",
		"landing.pricing.free.name": "Free",
		"landing.pricing.free.desc": "Perfect for getting started",
		"landing.pricing.pro.name": "Pro",
		"landing.pricing.pro.desc": "Best for content creators",
		"landing.pricing.business.name": "Business",
		"landing.pricing.business.desc": "For teams and agencies",
		"landing.pricing.cta.free": "Get Started Free",
		"landing.pricing.cta.pro": "Start Pro Trial",
		"landing.pricing.cta.business": "Get Business",
		"landing.pricing.mostpopular": "MOST POPULAR",

		// Landing Page - CTA Section
		"landing.cta.title": "Ready to Organize Your YouTube?",
		"landing.cta.subtitle":
			"Join thousands of content creators and teams who trust Groupify to manage their YouTube subscriptions.",
		"landing.cta.primary": "Get Started Free",
		"landing.cta.secondary": "Join Community",

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
		"pricing.pro.name": "Basic",
		"pricing.pro.desc": "For serious content creators",
		"pricing.business.name": "Pro",
		"pricing.business.desc": "For agencies and teams",
		"pricing.getstarted": "Get Started",
		"pricing.starttrial": "Start Free Trial",
		"pricing.contactsales": "Contact Sales",

		// CTA
		"cta.badge": "Ready to Launch",
		"cta.title": "Ready to Get Started?",
		"cta.subtitle":
			"Join thousands of content creators who are already using Groupify to organize and grow their YouTube presence.",

		share_link_generated_success_description:
			"Share link generated successfully",

		// Footer

		// Collaborate Invite
		collaborate_invite_title: "Invite Collaborators",
		default_permission_title: "Default Permission",
		share_link_title: "Share Link",
		join_as: "Anyone with this link will join as a {role} permission.",
		copy_link_title: "Copy Group Link",
		copy_link_desc:
			"Share this link with others to allow them to copy this group's channels.",
		copy_destination_title: "Copy Destination",
		copy_destination_new: "A new group",
		copy_destination_existing: "An existing group",
		copy_alert_desc:
			"This will copy {count} channels to the selected destination.",
		copy_alert_info:
			"This link allows others to copy the channels to their own groups.",
		generate_copy_link: "Generate Copy Link",
		group_details_title: "Group Details",
		channels: "Channels",
		share_settings_title: "Share Settings",
		share_settings_collab:
			"Collaborators will have {permission} access to this group.",
		share_settings_copy:
			"Recipients will be able to copy all channels to {destination}.",
		destination_new: "a new group",
		destination_existing: "an existing group",
		share_group_title: "Share Group",
		share_group_description: "Share your group with others",
		back_to_group: "Back to Group",
		collaborate_tab_title: "Collaborate",
		copy_group_tab_title: "Copy Group",
		collaborate_invite_desc:
			"Invite collaborators to this group by entering their email address and assigning a role.",
		input_email_placeholder: "Enter collaborator's email",
		collaborators_label: "Collaborators",
		collaborators_empty: "No collaborators yet.",
		role_viewer: "Viewer",
		role_editor: "Editor",
		role_admin: "Admin",
		perm_view: "Can view group content",
		perm_edit: "Can edit group content",
		perm_admin: "Full administrative access",
		allow_comments_label: "Allow comments",
		share_link_desc:
			"Share this link with others to allow them to view or copy this group.",
		copied: "Copied!",
		copy: "Copy",
		generating: "Generating...",
		generate_link: "Generate Copy Link",
		add: "Add",
		"footer.description":
			"The ultimate tool for organizing and managing your YouTube channel portfolio with modern design and powerful features.",
		"footer.product": "Product",
		"footer.support": "Support",
		"footer.company": "Company",
		"footer.copyright":
			"All rights reserved. Built with ❤️ for content creators.",
	},
	pt: {
		collaborate_invite_title: "Convidar Colaboradores",
		collaborate_invite_desc:
			"Convide colaboradores para este grupo inserindo o endereço de e-mail e atribuindo uma função.",
		input_email_placeholder: "Digite o e-mail do colaborador",
		collaborators_label: "Colaboradores",
		collaborators_empty: "Nenhum colaborador ainda.",
		role_viewer: "Visualizador",
		role_editor: "Editor",
		role_admin: "Administrador",
		perm_view: "Pode visualizar o conteúdo do grupo",
		perm_edit: "Pode editar o conteúdo do grupo",
		perm_admin: "Acesso administrativo total",
		allow_comments_label: "Permitir comentários",
		share_link_desc:
			"Compartilhe este link com outras pessoas para permitir que visualizem ou copiem este grupo.",
		copied: "Copiado!",
		copy: "Copiar",
		generating: "Gerando...",
		generate_link: "Gerar Link de Cópia",
		add: "Adicionar",
		default_permission_title: "Permissão Padrão",
		share_link_title: "Link de Compartilhamento",
		join_as: "Qualquer pessoa com este link entrará permissão de {role}.",
		copy_link_title: "Link para Copiar Grupo",
		copy_link_desc:
			"Compartilhe este link com outras pessoas para permitir que copiem os canais deste grupo.",
		copy_destination_title: "Destino da Cópia",
		copy_destination_new: "Um novo grupo",
		copy_destination_existing: "Um grupo existente",
		copy_alert_desc: "Isso copiará {count} canais para o destino selecionado.",
		copy_alert_info:
			"Este link permite que outros copiem os canais para seus próprios grupos.",
		generate_copy_link: "Gerar Link para Copiar",
		group_details_title: "Detalhes do Grupo",
		channels: "Canais",
		share_settings_title: "Configurações de Compartilhamento",
		share_settings_collab:
			"Colaboradores terão acesso de {permission} a este grupo.",
		share_settings_copy:
			"Os destinatários poderão copiar todos os canais para {destination}.",
		destination_new: "um novo grupo",
		destination_existing: "um grupo existente",
		share_group_title: "Compartilhar Grupo",
		share_group_description: "Compartilhe seu grupo com outras pessoas",
		back_to_group: "Voltar para o Grupo",
		collaborate_tab_title: "Colaborar",
		copy_group_tab_title: "Copiar Grupo",
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
		"login.subtitle": "Digite seu email e senha para acessar seu painel",
		"login.description": "Digite seu email e senha para acessar seu painel",
		"login.email": "Email",
		"login.email.placeholder": "Digite seu email",
		"login.password": "Senha",
		"login.password.placeholder": "Digite sua senha",
		"login.forgot": "Esqueceu sua senha?",
		"login.signin": "Entrar",
		"login.signing": "Entrando...",
		"login.or": "Ou continue com",
		"login.google": "Entre com o Google",
		"login.discord": "Sign In with Discord",
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
			"Organize seus canais do YouTube com grupos personalizados, colabore com sua equipe e acesse análises avançadas — tudo em um painel intuitivo.",
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
		"register.discord": "Discord",
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
		"integrations.export.desc": "Um lugar para encontrar grupos da comunidade",

		// Landing Page - New Content
		"landing.hero.badge": "Agora com Extensão de Navegador",
		"landing.hero.title": "Organize Seu YouTube Como Nunca Antes",
		"landing.hero.subtitle":
			"O Groupify ajuda você a organizar, gerenciar e compartilhar suas inscrições do YouTube. Crie grupos personalizados, colabore com equipes e nunca perca o controle de seus canais favoritos novamente.",
		"landing.hero.cta.primary": "Iniciar Teste Grátis",
		"landing.hero.cta.secondary": "Ver Demo",
		"landing.hero.trust1": "Não requer cartão de crédito",
		"landing.hero.trust2": "Teste grátis de 14 dias",
		"landing.hero.trust3": "Cancele a qualquer momento",
		"landing.hero.preview": "Painel do Groupify",

		// Landing Page - Features Section
		"landing.features.title": "Tudo Que Você Precisa para Organizar o YouTube",
		"landing.features.subtitle":
			"Recursos poderosos projetados para criadores de conteúdo, equipes e entusiastas do YouTube",
		"landing.features.smart.title": "Organização Inteligente",
		"landing.features.smart.desc":
			"Crie grupos ilimitados com categorias personalizadas. Aninhe grupos dentro de grupos para máxima flexibilidade na gestão de suas inscrições do YouTube.",
		"landing.features.share.title": "Compartilhar e Colaborar",
		"landing.features.share.desc":
			"Gere links compartilháveis para permitir que outros visualizem ou copiem seus grupos. Perfeito para criadores de conteúdo, equipes e comunidades.",
		"landing.features.permissions.title": "Permissões de Equipe",
		"landing.features.permissions.desc":
			"Controle o acesso com permissões granulares. Atribua funções de somente visualização, editor ou administrador para gerenciar quem pode modificar seus grupos.",
		"landing.features.bulk.title": "Operações em Massa",
		"landing.features.bulk.desc":
			"Economize tempo com ações em lote poderosas. Adicione, remova ou mova vários canais entre grupos em segundos.",
		"landing.features.extension.title": "Integração com Extensão",
		"landing.features.extension.desc":
			"Nossa extensão de navegador permite adicionar canais diretamente do YouTube. Organização com um clique enquanto você navega.",
		"landing.features.everywhere.title": "Funciona em Qualquer Lugar",
		"landing.features.everywhere.desc":
			"Acesse seus canais organizados de qualquer dispositivo. Aplicativo web e extensões de navegador para Chrome, Firefox e Safari.",

		// Landing Page - Browser Extension Section
		"landing.extension.badge": "Extensão de Navegador",
		"landing.extension.title": "Adicione Canais Enquanto Navega",
		"landing.extension.subtitle":
			"Nossa extensão de navegador se integra perfeitamente com o YouTube. Quando encontrar um canal que deseja salvar, basta clicar no ícone do Groupify e adicioná-lo a qualquer grupo instantaneamente.",
		"landing.extension.success": "Canal adicionado ao grupo",
		"landing.extension.subscribers": "inscritos",

		// Landing Page - Testimonials Section
		"landing.testimonials.title": "Adorado por Criadores de Conteúdo",
		"landing.testimonials.subtitle":
			"Veja o que nossos usuários estão dizendo sobre o Groupify",
		"landing.testimonials.alex.content":
			"O Groupify transformou completamente como eu gerencio minhas inscrições do YouTube. Finalmente posso manter meu conteúdo educacional separado do entretenimento!",
		"landing.testimonials.sarah.content":
			"A capacidade de compartilhar grupos curados com minha equipe foi uma revolução. Podemos compartilhar rapidamente insights do setor e análises de concorrentes.",
		"landing.testimonials.mike.content":
			"Já experimentei muitas ferramentas, mas o Groupify é a única que realmente entende como os criadores de conteúdo trabalham. O recurso de grupos aninhados é brilhante!",

		// Landing Page - Pricing Section
		"landing.pricing.title": "Preços Simples e Transparentes",
		"landing.pricing.subtitle":
			"Escolha o plano que se adapta às suas necessidades. Todos os planos incluem um teste grátis de 14 dias.",
		"landing.pricing.free.name": "Grátis",
		"landing.pricing.free.desc": "Perfeito para começar",
		"landing.pricing.pro.name": "Pro",
		"landing.pricing.pro.desc": "Melhor para criadores de conteúdo",
		"landing.pricing.business.name": "Business",
		"landing.pricing.business.desc": "Para equipes e agências",
		"landing.pricing.cta.free": "Começar Grátis",
		"landing.pricing.cta.pro": "Iniciar Teste Pro",
		"landing.pricing.cta.business": "Obter Business",
		"landing.pricing.mostpopular": "MAIS POPULAR",

		// Landing Page - CTA Section
		"landing.cta.title": "Pronto para Organizar Seu YouTube?",
		"landing.cta.subtitle":
			"Junte-se a milhares de criadores de conteúdo e equipes que confiam no Groupify para gerenciar suas inscrições do YouTube.",
		"landing.cta.primary": "Começar Grátis",
		"landing.cta.secondary": "Juntar-se à Comunidade",

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

		share_link_generated_success_description:
			"Share link generated successfully",
	},
	es: {
		collaborate_invite_title: "Invitar Colaboradores",
		collaborate_invite_desc:
			"Invita colaboradores a este grupo ingresando su dirección de correo electrónico y asignando un rol.",
		input_email_placeholder: "Ingresar correo electrónico del colaborador",
		collaborators_label: "Colaboradores",
		collaborators_empty: "Aún no hay colaboradores.",
		role_viewer: "Espectador",
		role_editor: "Editor",
		role_admin: "Administrador",
		perm_view: "Puede ver el contenido del grupo",
		perm_edit: "Puede editar el contenido del grupo",
		perm_admin: "Acceso administrativo total",
		allow_comments_label: "Permitir comentarios",
		share_link_desc:
			"Comparte este enlace con otros para permitirles ver o copiar este grupo.",
		copied: "¡Copiado!",
		copy: "Copiar",
		generating: "Generando...",
		generate_link: "Generar Enlace para Copiar",
		add: "Agregar",
		default_permission_title: "Permiso Predeterminado",
		share_link_title: "Enlace para Compartir",
		join_as: "Cualquiera con este enlace se unirá como {role}.",
		copy_link_title: "Enlace para Copiar Grupo",
		copy_link_desc:
			"Comparte este enlace con otros para permitirles copiar los canales de este grupo.",
		copy_destination_title: "Destino de Copia",
		copy_destination_new: "Un nuevo grupo",
		copy_destination_existing: "Un grupo existente",
		copy_alert_desc: "Esto copiará {count} canales al destino seleccionado.",
		copy_alert_info:
			"Este enlace permite a otros copiar los canales a sus propios grupos.",
		generate_copy_link: "Generar Enlace para Copiar",
		group_details_title: "Detalles del Grupo",
		channels: "Canales",
		share_settings_title: "Configuración de Compartir",
		share_settings_collab:
			"Los colaboradores tendrán acceso de {permission} a este grupo.",
		share_settings_copy:
			"Los destinatarios podrán copiar todos los canales a {destination}.",
		destination_new: "un nuevo grupo",
		destination_existing: "un grupo existente",
		share_group_title: "Compartir Grupo",
		share_group_description: "Comparte tu grupo con otros",
		back_to_group: "Volver al Grupo",
		collaborate_tab_title: "Colaborar",
		copy_group_tab_title: "Copiar Grupo",
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
		"login.subtitle": "Ingresa tu email y contraseña para acceder a tu panel",
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
		"login.google": "Entra con Google",
		"login.discord": "Entra con Discord",
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
		"register.discord": "Discord",
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
			"Organiza tus canales de YouTube con grupos personalizados, colabora con tu equipo y accede a análisis detallados — todo en un panel intuitivo.",
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
		"features.responsive.title": "Design Responsivo",
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
		"integrations.export.desc":
			"Exporta seus grupos e canais para a comunidade",

		// Landing Page - New Content
		"landing.hero.badge": "Ahora con Extensión de Navegador",
		"landing.hero.title": "Organiza Tu YouTube Como Nunca Antes",
		"landing.hero.subtitle":
			"Groupify te ayuda a organizar, gestionar y compartir tus suscripciones de YouTube. Crea grupos personalizados, colabora con equipos y nunca pierdas el control de tus canales favoritos.",
		"landing.hero.cta.primary": "Iniciar Prueba Gratuita",
		"landing.hero.cta.secondary": "Ver Demo",
		"landing.hero.trust1": "No se requiere tarjeta de crédito",
		"landing.hero.trust2": "Prueba gratuita de 14 días",
		"landing.hero.trust3": "Cancela en cualquier momento",
		"landing.hero.preview": "Panel de Groupify",

		// Landing Page - Features Section
		"landing.features.title": "Todo Lo Que Necesitas para Organizar YouTube",
		"landing.features.subtitle":
			"Características poderosas diseñadas para creadores de contenido, equipos y entusiastas de YouTube",
		"landing.features.smart.title": "Organización Inteligente",
		"landing.features.smart.desc":
			"Crea grupos ilimitados con categorías personalizadas. Anida grupos dentro de grupos para máxima flexibilidad en la gestión de tus suscripciones de YouTube.",
		"landing.features.share.title": "Compartir y Colaborar",
		"landing.features.share.desc":
			"Genera enlaces compartibles para permitir que otros vean o copien tus grupos. Perfecto para creadores de contenido, equipos y comunidades.",
		"landing.features.permissions.title": "Permisos de Equipo",
		"landing.features.permissions.desc":
			"Controla el acceso con permisos granulares. Asigna roles de solo visualización, editor o administrador para gestionar quién puede modificar tus grupos.",
		"landing.features.bulk.title": "Operaciones Masivas",
		"landing.features.bulk.desc":
			"Ahorra tiempo con acciones por lotes poderosas. Agrega, elimina o mueve varios canales entre grupos en segundos.",
		"landing.features.extension.title": "Integración con Extensión",
		"landing.features.extension.desc":
			"Nuestra extensión de navegador te permite agregar canales directamente desde YouTube. Organización con un clic mientras navegas.",
		"landing.features.everywhere.title": "Funciona en Cualquier Lugar",
		"landing.features.everywhere.desc":
			"Accede a tus canales organizados desde cualquier dispositivo. Aplicación web y extensiones de navegador para Chrome, Firefox y Safari.",

		// Landing Page - Browser Extension Section
		"landing.extension.badge": "Extensión de Navegador",
		"landing.extension.title": "Agrega Canales Mientras Navegas",
		"landing.extension.subtitle":
			"Nuestra extensión de navegador se integra perfectamente con YouTube. Cuando encuentres un canal que quieras guardar, solo haz clic en el icono de Groupify y agrégalo a cualquier grupo instantáneamente.",
		"landing.extension.success": "Canal agregado al grupo",
		"landing.extension.subscribers": "suscriptores",

		// Landing Page - Testimonials Section
		"landing.testimonials.title": "Amado por Creadores de Contenido",
		"landing.testimonials.subtitle":
			"Mira lo que nuestros usuarios están diciendo sobre Groupify",
		"landing.testimonials.alex.content":
			"Groupify ha transformado completamente cómo gestiono mis suscripciones de YouTube. ¡Finalmente puedo mantener mi contenido educativo separado del entretenimiento!",
		"landing.testimonials.sarah.content":
			"La capacidad de compartir grupos curados con mi equipo ha sido un cambio radical. Podemos compartir rápidamente insights de la industria y análisis de competidores.",
		"landing.testimonials.mike.content":
			"He probado muchas herramientas, pero Groupify es la única que realmente entiende cómo trabajan los creadores de contenido. ¡La función de grupos anidados es brillante!",

		// Landing Page - Pricing Section
		"landing.pricing.title": "Precios Simples y Transparentes",
		"landing.pricing.subtitle":
			"Elige el plan que se adapte a tus necesidades. Todos los planes incluyen una prueba gratuita de 14 días.",
		"landing.pricing.free.name": "Gratis",
		"landing.pricing.free.desc": "Perfecto para comenzar",
		"landing.pricing.pro.name": "Pro",
		"landing.pricing.pro.desc": "Mejor para creadores de contenido",
		"landing.pricing.business.name": "Business",
		"landing.pricing.business.desc": "Para equipos y agencias",
		"landing.pricing.cta.free": "Comenzar Gratis",
		"landing.pricing.cta.pro": "Iniciar Prueba Pro",
		"landing.pricing.cta.business": "Obtener Business",
		"landing.pricing.mostpopular": "MÁS POPULAR",

		// Landing Page - CTA Section
		"landing.cta.title": "¿Listo para Organizar Tu YouTube?",
		"landing.cta.subtitle":
			"Únete a miles de creadores de contenido y equipos que confían en Groupify para gestionar sus suscripciones de YouTube.",
		"landing.cta.primary": "Comenzar Gratis",
		"landing.cta.secondary": "Unirse a la Comunidad",

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
		"pricing.free.desc": "Perfeito para começar",
		"pricing.pro.name": "Pro",
		"pricing.pro.desc": "Para criadores de contenido serios",
		"pricing.business.name": "Empresarial",
		"pricing.business.desc": "Para agências e equipes",
		"pricing.getstarted": "Começar",
		"pricing.starttrial": "Iniciar Prueba Gratuita",
		"pricing.contactsales": "Contactar Ventas",

		// CTA
		"cta.badge": "Listo para Lanzar",
		"cta.title": "¿Listo para Comenzar?",
		"cta.subtitle":
			"Únete a miles de creadores de contenido que já estão usando o Groupify para organizar y hacer crecer su presencia en YouTube.",

		// Footer
		"footer.description":
			"La herramienta definitiva para organizar y gestionar tu portafolio de canales de YouTube con diseño moderno y características poderosas.",
		"footer.product": "Producto",
		"footer.support": "Soporte",
		"footer.company": "Empresa",
		"footer.copyright":
			"Todos los derechos reservados. Hecho con ❤️ para creadores de contenido.",

		share_link_generated_success_description:
			"El link de compartilhamento foi gerado com sucesso.",
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

	const t = (key: string, params?: Record<string, string>): string => {
		const translation =
			translations[language][
				key as keyof (typeof translations)[typeof language]
			];
		if (translation && params) {
			return Object.keys(params).reduce((acc, paramKey) => {
				const placeholder = `{${paramKey}}`;
				return acc.replace(new RegExp(placeholder, "g"), params[paramKey]);
			}, translation);
		}
		return translation || key;
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

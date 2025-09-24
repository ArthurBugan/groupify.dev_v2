"use client";

import { Link } from "@tanstack/react-router";
import {
	ArrowRight,
	BarChart3,
	CheckCircle,
	ChevronRight,
	Dumbbell,
	FolderKanban,
	Gamepad2,
	Laptop,
	Menu,
	Plane,
	Play,
	Rocket,
	Share2,
	Smartphone,
	Sparkles,
	Star,
	TrendingUp,
	Users,
	Utensils,
	X,
	Youtube,
	Zap,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useLanguage } from "./language-provider";
import { LanguageSelector } from "./language-selector";

export function LandingPage() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const { t } = useLanguage();

	const features = [
		{
			icon: FolderKanban,
			title: t("features.smartorg.title"),
			description: t("features.smartorg.desc"),
			color: "from-blue-500 to-cyan-500",
			bgColor:
				"bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20",
		},
		{
			icon: Share2,
			title: t("features.collaboration.title"),
			description: t("features.collaboration.desc"),
			color: "from-green-500 to-emerald-500",
			bgColor:
				"bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20",
		},
		{
			icon: BarChart3,
			title: t("features.analytics.title"),
			description: t("features.analytics.desc"),
			color: "from-purple-500 to-violet-500",
			bgColor:
				"bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20",
		},
		{
			icon: Zap,
			title: t("features.youtube.title"),
			description: t("features.youtube.desc"),
			color: "from-yellow-500 to-orange-500",
			bgColor:
				"bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20",
		},
		{
			icon: Users,
			title: t("features.team.title"),
			description: t("features.team.desc"),
			color: "from-red-500 to-pink-500",
			bgColor:
				"bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20",
		},
		{
			icon: Smartphone,
			title: t("features.responsive.title"),
			description: t("features.responsive.desc"),
			color: "from-indigo-500 to-blue-500",
			bgColor:
				"bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/20 dark:to-blue-950/20",
		},
	];

	const integrations = [
		{
			name: "Crunchyroll",
			description: t("integrations.crunchyroll.desc"),
			icon: "🍥",
			badge: "New",
			color: "from-orange-500 to-red-500",
		},
		{
			name: "YouTube API",
			description: t("integrations.youtube.desc"),
			icon: Youtube,
			badge: "Active",
			color: "from-red-500 to-red-600",
		},
		{
			name: "Export Tools",
			description: t("integrations.export.desc"),
			icon: "📊",
			badge: "Pro",
			color: "from-blue-500 to-indigo-500",
		},
	];

	const testimonials = [
		{
			name: "Alex Johnson",
			role: "Content Creator",
			avatar: "/placeholder.svg?height=40&width=40",
			content: t("testimonials.alex.content"),
			rating: 5,
			company: "@alexcreates",
		},
		{
			name: "Sarah Chen",
			role: "Digital Marketing Manager",
			avatar: "/placeholder.svg?height=40&width=40",
			content: t("testimonials.sarah.content"),
			rating: 5,
			company: "Digital Boost Agency",
		},
		{
			name: "Mike Rodriguez",
			role: "YouTube Strategist",
			avatar: "/placeholder.svg?height=40&width=40",
			content: t("testimonials.mike.content"),
			rating: 5,
			company: "Growth Labs",
		},
	];

	const pricingPlans = [
		{
			name: t("pricing.free.name"),
			price: "$0",
			period: "forever",
			description: t("pricing.free.desc"),
			features: [
				"Up to 3 groups",
				"Up to 20 channels",
				"Basic analytics",
				"1,000 API calls/month",
				"Community support",
			],
			cta: t("pricing.getstarted"),
			popular: false,
			color: "border-border",
		},
		{
			name: t("pricing.pro.name"),
			price: "$9",
			period: "month",
			description: t("pricing.pro.desc"),
			features: [
				"Up to 50 groups",
				"Up to 500 channels",
				"Advanced analytics",
				"100,000 API calls/month",
				"Priority support",
				"Export data",
				"Team collaboration",
			],
			cta: t("pricing.starttrial"),
			popular: true,
			color: "border-primary shadow-lg shadow-primary/25",
		},
		{
			name: t("pricing.business.name"),
			price: "$29",
			period: "month",
			description: t("pricing.business.desc"),
			features: [
				"Unlimited groups",
				"Unlimited channels",
				"Advanced analytics",
				"1,000,000 API calls/month",
				"Priority support",
				"API access",
				"Custom integrations",
				"White-label options",
			],
			cta: t("pricing.contactsales"),
			popular: false,
			color: "border-border",
		},
	];

	const stats = [
		{ label: t("stats.activeusers"), value: "10,000+", icon: Users },
		{ label: t("stats.channelsmanaged"), value: "500K+", icon: Youtube },
		{ label: t("stats.groupscreated"), value: "50K+", icon: FolderKanban },
		{ label: t("stats.uptime"), value: "99.9%", icon: TrendingUp },
	];

	return (
		<div className="min-h-screen bg-background">
			{/* Navigation */}
			<nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
				<div className="container mx-auto px-4">
					<div className="flex h-16 items-center justify-between">
						<div className="flex items-center gap-2">
							<div className="relative">
								<Youtube className="h-8 w-8 text-red-500" />
								<div className="absolute -top-1 -right-1 h-3 w-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse"></div>
							</div>
							<span className="text-xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
								Groupify
							</span>
						</div>

						{/* Desktop Navigation */}
						<div className="hidden md:flex items-center gap-8">
							<Link
								to="#features"
								className="text-sm font-medium hover:text-primary transition-colors group"
							>
								{t("nav.features")}
								<div className="h-0.5 w-0 bg-primary transition-all group-hover:w-full"></div>
							</Link>
							<Link
								to="#integrations"
								className="text-sm font-medium hover:text-primary transition-colors group"
							>
								{t("nav.integrations")}
								<div className="h-0.5 w-0 bg-primary transition-all group-hover:w-full"></div>
							</Link>
							<Link
								to="#pricing"
								className="text-sm font-medium hover:text-primary transition-colors group"
							>
								{t("nav.pricing")}
								<div className="h-0.5 w-0 bg-primary transition-all group-hover:w-full"></div>
							</Link>
							<Link
								to="#testimonials"
								className="text-sm font-medium hover:text-primary transition-colors group"
							>
								{t("nav.reviews")}
								<div className="h-0.5 w-0 bg-primary transition-all group-hover:w-full"></div>
							</Link>
						</div>

						<div className="hidden md:flex items-center gap-4">
							<LanguageSelector />
							<Button variant="ghost" asChild className="hover:bg-accent">
								<Link to="/login">{t("nav.signin")}</Link>
							</Button>
							<Button
								asChild
								className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 shadow-lg shadow-red-500/25"
							>
								<Link to="/register">{t("nav.getstarted")}</Link>
							</Button>
						</div>

						{/* Mobile Menu Button */}
						<Button
							variant="ghost"
							size="icon"
							className="md:hidden"
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						>
							{mobileMenuOpen ? (
								<X className="h-5 w-5" />
							) : (
								<Menu className="h-5 w-5" />
							)}
						</Button>
					</div>

					{/* Mobile Navigation */}
					{mobileMenuOpen && (
						<div className="md:hidden border-t py-4 bg-background/95 backdrop-blur-xl">
							<div className="flex flex-col gap-4">
								<Link
									to="#features"
									className="text-sm font-medium hover:text-primary transition-colors"
								>
									{t("nav.features")}
								</Link>
								<Link
									to="#integrations"
									className="text-sm font-medium hover:text-primary transition-colors"
								>
									{t("nav.integrations")}
								</Link>
								<Link
									to="#pricing"
									className="text-sm font-medium hover:text-primary transition-colors"
								>
									{t("nav.pricing")}
								</Link>
								<Link
									to="#testimonials"
									className="text-sm font-medium hover:text-primary transition-colors"
								>
									{t("nav.reviews")}
								</Link>
								<div className="flex flex-col gap-2 pt-4 border-t">
									<LanguageSelector />
									<Button variant="ghost" asChild>
										<Link to="/login">{t("nav.signin")}</Link>
									</Button>
									<Button
										asChild
										className="bg-gradient-to-r from-red-500 to-pink-500"
									>
										<Link to="/register">{t("nav.getstarted")}</Link>
									</Button>
								</div>
							</div>
						</div>
					)}
				</div>
			</nav>

			{/* Hero Section */}
			<section className="relative py-20 lg:py-32 overflow-hidden">
				{/* Background Elements */}
				<div className="absolute inset-0 bg-gradient-to-br from-red-50/50 via-pink-50/50 to-orange-50/50 dark:from-red-950/20 dark:via-pink-950/20 dark:to-orange-950/20"></div>
				<div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-red-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
				<div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>

				<div className="container mx-auto px-4 relative">
					<div className="grid lg:grid-cols-2 gap-12 items-center">
						<div className="space-y-8">
							<div className="space-y-6">
								<Badge
									variant="outline"
									className="w-fit border-red-200 bg-red-50 text-red-700 hover:bg-red-900 dark:border-red-800 dark:bg-red-950 dark:text-red-300"
								>
									<Sparkles className="mr-2 h-3 w-3" />
									{t("hero.badge")}
								</Badge>
								<h1 className="text-4xl lg:text-7xl font-bold tracking-tight">
									{t("hero.title")
										.split("YouTube")
										.map((part, index) => (
											<span key={index}>
												{part}
												{index === 0 && (
													<span className="bg-gradient-to-r from-red-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">
														YouTube
													</span>
												)}
											</span>
										))}
								</h1>
								<p className="text-xl lg:text-2xl text-muted-foreground max-w-[600px] leading-relaxed">
									{t("hero.subtitle")}
								</p>
							</div>

							<div className="flex flex-col sm:flex-row gap-4">
								<Button
									size="lg"
									asChild
									className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 shadow-lg shadow-red-500/25 text-lg px-8 py-6"
								>
									<Link to="/register">
										{t("hero.starttrial")}
										<ArrowRight className="ml-2 h-5 w-5" />
									</Link>
								</Button>
								<Button
									size="lg"
									variant="outline"
									asChild
									className="border-2 text-lg px-8 py-6 hover:bg-accent"
								>
									<Link to="/demo">
										<Play className="mr-2 h-5 w-5" />
										{t("hero.watchdemo")}
									</Link>
								</Button>
							</div>

							<div className="flex items-center gap-8 text-sm text-muted-foreground">
								<div className="flex items-center gap-2">
									<CheckCircle className="h-4 w-4 text-green-500" />
									{t("hero.freetrial")}
								</div>
								<div className="flex items-center gap-2">
									<CheckCircle className="h-4 w-4 text-green-500" />
									{t("hero.nocreditcard")}
								</div>
								<div className="flex items-center gap-2">
									<CheckCircle className="h-4 w-4 text-green-500" />
									{t("hero.cancelanytime")}
								</div>
							</div>

							{/* Stats */}
							<div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
								{stats.map((stat, index) => (
									<div key={index} className="text-center">
										<div className="flex items-center justify-center mb-2">
											<stat.icon className="h-5 w-5 text-muted-foreground" />
										</div>
										<div className="text-2xl font-bold text-foreground">
											{stat.value}
										</div>
										<div className="text-sm text-muted-foreground">
											{stat.label}
										</div>
									</div>
								))}
							</div>
						</div>

						<div className="relative">
							<div className="relative rounded-2xl border bg-card/80 backdrop-blur-xl p-8 shadow-2xl shadow-black/10 dark:shadow-black/20">
								<div className="space-y-6">
									<div className="flex items-center gap-3">
										<div className="h-12 w-12 rounded-xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center shadow-lg">
											<Gamepad2 className="h-6 w-6 text-white" />
										</div>
										<div>
											<h3 className="font-semibold text-lg">Gaming Channels</h3>
											<p className="text-sm text-muted-foreground">
												8 channels • 2.4M subscribers
											</p>
										</div>
									</div>
									<div className="grid grid-cols-2 gap-4">
										{[
											{
												icon: Laptop,
												name: "Tech Reviews",
												count: 12,
												color: "from-blue-500 to-cyan-500",
											},
											{
												icon: Utensils,
												name: "Cooking",
												count: 6,
												color: "from-green-500 to-emerald-500",
											},
											{
												icon: Dumbbell,
												name: "Fitness",
												count: 9,
												color: "from-purple-500 to-violet-500",
											},
											{
												icon: Plane,
												name: "Travel",
												count: 7,
												color: "from-orange-500 to-red-500",
											},
										].map((group, index) => (
											<div key={index} className="group cursor-pointer">
												<div className="flex items-center gap-3 p-4 rounded-xl bg-card border hover:shadow-lg transition-all duration-300 hover:scale-105">
													<div
														className={`h-10 w-10 rounded-lg bg-gradient-to-br ${group.color} flex items-center justify-center shadow-lg`}
													>
														<group.icon className="h-5 w-5 text-white" />
													</div>
													<div>
														<p className="text-sm font-medium">{group.name}</p>
														<p className="text-xs text-muted-foreground">
															{group.count} channels
														</p>
													</div>
												</div>
											</div>
										))}
									</div>
								</div>
							</div>
							<div className="absolute -top-6 -right-6 h-32 w-32 bg-gradient-to-br from-red-500/30 to-pink-500/30 rounded-full blur-2xl animate-pulse"></div>
							<div className="absolute -bottom-6 -left-6 h-40 w-40 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full blur-2xl animate-pulse delay-1000"></div>
						</div>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section id="features" className="py-20 lg:py-32">
				<div className="container mx-auto px-4">
					<div className="text-center space-y-4 mb-16">
						<Badge variant="outline" className="mb-4">
							{t("features.badge")}
						</Badge>
						<h2 className="text-3xl lg:text-5xl font-bold">
							{t("features.title")}
						</h2>
						<p className="text-xl text-muted-foreground max-w-[600px] mx-auto">
							{t("features.subtitle")}
						</p>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{features.map((feature, index) => (
							<Card
								key={index}
								className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden"
							>
								<div className={`h-2 ${feature.bgColor}`}></div>
								<CardHeader className="pb-4">
									<div
										className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
									>
										<feature.icon className="h-7 w-7 text-white" />
									</div>
									<CardTitle className="text-xl group-hover:text-primary transition-colors">
										{feature.title}
									</CardTitle>
								</CardHeader>
								<CardContent>
									<CardDescription className="text-base leading-relaxed">
										{feature.description}
									</CardDescription>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Integrations Section */}
			<section id="integrations" className="py-20 lg:py-32 bg-muted/50">
				<div className="container mx-auto px-4">
					<div className="text-center space-y-4 mb-16">
						<Badge variant="outline" className="mb-4">
							{t("integrations.badge")}
						</Badge>
						<h2 className="text-3xl lg:text-5xl font-bold">
							{t("integrations.title")}
						</h2>
						<p className="text-xl text-muted-foreground max-w-[600px] mx-auto">
							{t("integrations.subtitle")}
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8">
						{integrations.map((integration, index) => (
							<Card
								key={index}
								className="text-center group hover:shadow-2xl transition-all duration-300 hover:scale-105 border-0 shadow-lg overflow-hidden"
							>
								<div
									className={`h-2 bg-gradient-to-r ${integration.color}`}
								></div>
								<CardHeader className="pb-4">
									<div className="mx-auto w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
										{typeof integration.icon === "string" ? (
											<span className="text-3xl">{integration.icon}</span>
										) : (
											<integration.icon className="h-8 w-8" />
										)}
									</div>
									<div className="flex items-center justify-center gap-2">
										<CardTitle className="group-hover:text-primary transition-colors">
											{integration.name}
										</CardTitle>
										<Badge
											variant={
												integration.badge === "New" ? "default" : "secondary"
											}
											className="shadow-sm"
										>
											{integration.badge}
										</Badge>
									</div>
								</CardHeader>
								<CardContent>
									<CardDescription className="text-base">
										{integration.description}
									</CardDescription>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Testimonials Section */}
			<section id="testimonials" className="py-20 lg:py-32">
				<div className="container mx-auto px-4">
					<div className="text-center space-y-4 mb-16">
						<Badge variant="outline" className="mb-4">
							{t("testimonials.badge")}
						</Badge>
						<h2 className="text-3xl lg:text-5xl font-bold">
							{t("testimonials.title")}
						</h2>
						<p className="text-xl text-muted-foreground max-w-[600px] mx-auto">
							{t("testimonials.subtitle")}
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8">
						{testimonials.map((testimonial, index) => (
							<Card
								key={index}
								className="group hover:shadow-2xl transition-all duration-300 hover:scale-105 border-0 shadow-lg"
							>
								<CardHeader className="pb-4">
									<div className="flex items-center gap-4 mb-4">
										<div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center shadow-lg">
											<span className="text-lg font-medium text-white">
												{testimonial.name.charAt(0)}
											</span>
										</div>
										<div>
											<CardTitle className="text-base group-hover:text-primary transition-colors">
												{testimonial.name}
											</CardTitle>
											<CardDescription className="text-sm">
												{testimonial.role}
											</CardDescription>
											<CardDescription className="text-xs text-primary">
												{testimonial.company}
											</CardDescription>
										</div>
									</div>
									<div className="flex gap-1">
										{Array.from({ length: testimonial.rating }).map((_, i) => (
											<Star
												key={i}
												className="h-4 w-4 fill-yellow-400 text-yellow-400"
											/>
										))}
									</div>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground italic leading-relaxed">
										"{testimonial.content}"
									</p>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Pricing Section */}
			<section id="pricing" className="py-20 lg:py-32 bg-muted/50">
				<div className="container mx-auto px-4">
					<div className="text-center space-y-4 mb-16">
						<Badge variant="outline" className="mb-4">
							{t("pricing.badge")}
						</Badge>
						<h2 className="text-3xl lg:text-5xl font-bold">
							{t("pricing.title")}
						</h2>
						<p className="text-xl text-muted-foreground max-w-[600px] mx-auto">
							{t("pricing.subtitle")}
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
						{pricingPlans.map((plan, index) => (
							<Card
								key={index}
								className={cn(
									"relative group hover:scale-105 transition-all duration-300 border-2",
									plan.color,
								)}
							>
								{plan.popular && (
									<div className="absolute -top-4 left-1/2 -translate-x-1/2">
										<Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg">
											{t("pricing.popular")}
										</Badge>
									</div>
								)}
								<CardHeader className="text-center pb-4">
									<CardTitle className="text-2xl group-hover:text-primary transition-colors">
										{plan.name}
									</CardTitle>
									<div className="space-y-2">
										<div className="text-4xl lg:text-5xl font-bold">
											{plan.price}
											<span className="text-lg font-normal text-muted-foreground">
												/{plan.period}
											</span>
										</div>
										<CardDescription className="text-base">
											{plan.description}
										</CardDescription>
									</div>
								</CardHeader>
								<CardContent className="space-y-6">
									<ul className="space-y-3">
										{plan.features.map((feature, featureIndex) => (
											<li
												key={featureIndex}
												className="flex items-center gap-3"
											>
												<CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
												<span className="text-sm">{feature}</span>
											</li>
										))}
									</ul>
									<Button
										className={cn(
											"w-full text-base py-6",
											plan.popular
												? "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 shadow-lg shadow-red-500/25"
												: "",
										)}
										variant={plan.popular ? "default" : "outline"}
										asChild
									>
										<Link to="/register">
											{plan.cta}
											<ChevronRight className="ml-2 h-4 w-4" />
										</Link>
									</Button>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-20 lg:py-32 bg-gradient-to-br from-red-500 via-pink-500 to-orange-500 text-white relative overflow-hidden">
				<div className="absolute inset-0 bg-black/10"></div>
				<div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
				<div className="absolute bottom-20 right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>

				<div className="container mx-auto px-4 text-center relative">
					<div className="space-y-8 max-w-4xl mx-auto">
						<Badge
							variant="outline"
							className="border-white/20 bg-white/10 text-white mb-4"
						>
							<Rocket className="mr-2 h-3 w-3" />
							{t("cta.badge")}
						</Badge>
						<h2 className="text-3xl lg:text-6xl font-bold">{t("cta.title")}</h2>
						<p className="text-xl lg:text-2xl opacity-90 leading-relaxed">
							{t("cta.subtitle")}
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
							<Button
								size="lg"
								variant="secondary"
								asChild
								className="text-lg px-8 py-6 bg-white text-gray-900 hover:bg-gray-100 shadow-xl"
							>
								<Link to="/register">
									{t("hero.starttrial")}
									<ArrowRight className="ml-2 h-5 w-5" />
								</Link>
							</Button>
							<Button
								size="lg"
								variant="outline"
								className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-6 backdrop-blur-sm"
								asChild
							>
								<Link to="/demo">
									<Play className="mr-2 h-5 w-5" />
									{t("hero.watchdemo")}
								</Link>
							</Button>
						</div>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="py-16 border-t bg-muted/30">
				<div className="container mx-auto px-4">
					<div className="grid md:grid-cols-4 gap-8">
						<div className="space-y-4">
							<div className="flex items-center gap-2">
								<Youtube className="h-6 w-6 text-red-500" />
								<span className="text-lg font-bold">Groupify</span>
							</div>
							<p className="text-sm text-muted-foreground leading-relaxed">
								{t("footer.description")}
							</p>
							<div className="flex gap-4">
								<div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center hover:bg-muted-foreground/20 transition-colors cursor-pointer">
									<span className="text-xs">𝕏</span>
								</div>
								<div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center hover:bg-muted-foreground/20 transition-colors cursor-pointer">
									<span className="text-xs">in</span>
								</div>
								<div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center hover:bg-muted-foreground/20 transition-colors cursor-pointer">
									<span className="text-xs">gh</span>
								</div>
							</div>
						</div>

						<div className="space-y-4">
							<h3 className="font-semibold">{t("footer.product")}</h3>
							<ul className="space-y-2 text-sm text-muted-foreground">
								<li>
									<Link
										to="#features"
										className="hover:text-foreground transition-colors hover:underline"
									>
										{t("nav.features")}
									</Link>
								</li>
								<li>
									<Link
										to="#pricing"
										className="hover:text-foreground transition-colors hover:underline"
									>
										{t("nav.pricing")}
									</Link>
								</li>
								<li>
									<Link
										to="/demo"
										className="hover:text-foreground transition-colors hover:underline"
									>
										Demo
									</Link>
								</li>
								<li>
									<Link
										to="/api"
										className="hover:text-foreground transition-colors hover:underline"
									>
										API
									</Link>
								</li>
							</ul>
						</div>

						<div className="space-y-4">
							<h3 className="font-semibold">{t("footer.support")}</h3>
							<ul className="space-y-2 text-sm text-muted-foreground">
								<li>
									<Link
										to="/help"
										className="hover:text-foreground transition-colors hover:underline"
									>
										Help Center
									</Link>
								</li>
								<li>
									<Link
										to="/contact"
										className="hover:text-foreground transition-colors hover:underline"
									>
										Contact
									</Link>
								</li>
								<li>
									<Link
										to="/status"
										className="hover:text-foreground transition-colors hover:underline"
									>
										Status
									</Link>
								</li>
								<li>
									<Link
										to="/community"
										className="hover:text-foreground transition-colors hover:underline"
									>
										Community
									</Link>
								</li>
							</ul>
						</div>

						<div className="space-y-4">
							<h3 className="font-semibold">{t("footer.company")}</h3>
							<ul className="space-y-2 text-sm text-muted-foreground">
								<li>
									<Link
										to="/about"
										className="hover:text-foreground transition-colors hover:underline"
									>
										About
									</Link>
								</li>
								<li>
									<Link
										to="/blog"
										className="hover:text-foreground transition-colors hover:underline"
									>
										Blog
									</Link>
								</li>
								<li>
									<Link
										to="/careers"
										className="hover:text-foreground transition-colors hover:underline"
									>
										Careers
									</Link>
								</li>
								<li>
									<Link
										to="/privacy"
										className="hover:text-foreground transition-colors hover:underline"
									>
										Privacy
									</Link>
								</li>
							</ul>
						</div>
					</div>

					<div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
						<p>&copy; 2024 Groupify. {t("footer.copyright")}</p>
					</div>
				</div>
			</footer>
		</div>
	);
}

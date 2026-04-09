"use client";

import { Link } from "@tanstack/react-router";
import {
	ArrowRight,
	Check,
	Github,
	Play,
	Sparkles,
	Star,
	Youtube,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IconViewer } from "./icon-picker";
import { useLanguage } from "./language-provider";
import { CompactHeader } from "./compact-header";

function AnimatedBackground() {
	return (
		<div className="absolute inset-0 -z-10 overflow-hidden">
			<div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-red-500/5 blur-3xl" />
			<div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full bg-pink-500/5 blur-3xl" />
			<div className="absolute bottom-[10%] left-[20%] w-[30%] h-[30%] rounded-full bg-orange-500/5 blur-3xl" />
		</div>
	);
}

function CompactCard({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<div
			className={cn(
				"rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow duration-200",
				className,
			)}
		>
			{children}
		</div>
	);
}

export function LandingPage() {
	const { t } = useLanguage();

	const features = [
		{
			icon: "📁",
			title: t("landing.features.smart.title"),
			desc: t("landing.features.smart.desc"),
			tag: "Core",
		},
		{
			icon: "↗️",
			title: t("landing.features.share.title"),
			desc: t("landing.features.share.desc"),
			tag: "Popular",
		},
		{
			icon: "👥",
			title: t("landing.features.permissions.title"),
			desc: t("landing.features.permissions.desc"),
			tag: "Pro",
		},
		{
			icon: "📦",
			title: t("landing.features.bulk.title"),
			desc: t("landing.features.bulk.desc"),
		},
		{
			icon: "⚡",
			title: t("landing.features.extension.title"),
			desc: t("landing.features.extension.desc"),
			tag: "New",
		},
		{
			icon: "🌐",
			title: t("landing.features.everywhere.title"),
			desc: t("landing.features.everywhere.desc"),
		},
	];

	const testimonials = [
		{
			name: "Alex Johnson",
			role: "Content Creator",
			content: t("landing.testimonials.alex.content"),
		},
		{
			name: "Sarah Chen",
			role: "Marketing Manager",
			content: t("landing.testimonials.sarah.content"),
		},
		{
			name: "Mike Rodriguez",
			role: "YouTube Strategist",
			content: t("landing.testimonials.mike.content"),
		},
	];

	const stats = [
		{ value: "10K+", label: "Users" },
		{ value: "500K+", label: "Channels" },
		{ value: "50K+", label: "Groups" },
		{ value: "99.9%", label: "Uptime" },
	];

	const pricing = [
		{
			name: t("landing.pricing.free.name"),
			price: "$0",
			period: "forever",
			desc: t("pricing.free.desc"),
			features: ["Up to 3 groups", "Up to 20 channels", "Basic organization"],
			cta: t("landing.pricing.cta.free"),
		},
		{
			name: t("landing.pricing.pro.name"),
			price: "$3.99",
			period: "month",
			desc: t("pricing.pro.desc"),
			features: [
				"Up to 10 groups",
				"Up to 1,000 channels",
				"Subgroups",
				"Share groups",
			],
			cta: t("landing.pricing.cta.pro"),
			popular: true,
		},
		{
			name: t("landing.pricing.business.name"),
			price: "$9.99",
			period: "month",
			desc: t("pricing.business.desc"),
			features: [
				"Unlimited groups",
				"Unlimited channels",
				"Team collaboration",
				"API access",
			],
			cta: t("landing.pricing.cta.business"),
		},
	];

	return (
		<div className="min-h-screen bg-background">
			<AnimatedBackground />
			<CompactHeader />

			{/* Hero */}
			<section className="relative py-20 lg:py-28">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl mx-auto text-center space-y-6">
						<Badge
							variant="outline"
							className="gap-1 bg-red-50/50 border-red-200 dark:bg-red-950/20 dark:border-red-800"
						>
							<Sparkles className="h-3 w-3" /> {t("landing.hero.badge")}
						</Badge>
						<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
							{t("landing.hero.title")}
						</h1>
						<p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
							{t("landing.hero.subtitle")}
						</p>
						<div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
							<Button
								size="lg"
								className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 shadow-md"
								asChild
							>
								<Link to="/register">
									{t("landing.hero.cta.primary")}{" "}
									<ArrowRight className="ml-2 h-4 w-4" />
								</Link>
							</Button>
							<Button size="lg" variant="outline" asChild>
								<a
									href="https://youtu.be/Hz-F6q0SZqU"
									target="_blank"
									rel="noopener"
								>
									<Play className="mr-2 h-4 w-4" />{" "}
									{t("landing.hero.cta.secondary")}
								</a>
							</Button>
						</div>
						<div className="flex items-center justify-center gap-8 pt-6 text-sm text-muted-foreground">
							{stats.map((s) => (
								<div key={s.label} className="text-center">
									<div className="font-semibold text-foreground">{s.value}</div>
									<div>{s.label}</div>
								</div>
							))}
						</div>
					</div>

					{/* Preview */}
					<div className="mt-16 max-w-4xl mx-auto">
						<CompactCard className="border-muted/50">
							<div className="flex items-center gap-2 px-4 py-3 border-b bg-muted/30 rounded-t-xl">
								<div className="flex gap-1.5">
									<div className="w-2.5 h-2.5 rounded-full bg-red-500" />
									<div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
									<div className="w-2.5 h-2.5 rounded-full bg-green-500" />
								</div>
								<span className="text-xs text-muted-foreground ml-2">
									{t("landing.hero.preview")}
								</span>
							</div>
							<div className="p-4 space-y-2">
								{[
									{ name: "Tech Reviews", channels: 12 },
									{ name: "Cooking", channels: 8 },
									{ name: "Gaming", channels: 15 },
								].map((g) => (
									<div
										key={g.name}
										className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/40 hover:bg-muted/60 transition-colors"
									>
										<div className="w-8 h-8 rounded-md bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center">
											<Youtube className="h-4 w-4 text-white" />
										</div>
										<div className="flex-1">
											<div className="text-sm font-medium">{g.name}</div>
											<div className="text-xs text-muted-foreground">
												{g.channels} channels
											</div>
										</div>
									</div>
								))}
							</div>
						</CompactCard>
					</div>
				</div>
			</section>

			{/* Features */}
			{/** biome-ignore lint/correctness/useUniqueElementIds: <need to use explict id> */}
			<section id="features" className="py-16 lg:py-20">
				<div className="container mx-auto px-4">
					<div className="text-center mb-12 space-y-3">
						<Badge variant="outline" className="bg-muted/50">
							{t("features.badge")}
						</Badge>
						<h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
							{t("landing.features.title")}
						</h2>
						<p className="text-lg text-muted-foreground max-w-xl mx-auto">
							{t("landing.features.subtitle")}
						</p>
					</div>
					<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
						{features.map((f, i) => (
							<CompactCard
								key={i}
								className="p-4 hover:border-red-500/30 transition-colors"
							>
								<div className="flex items-start justify-between mb-3">
									<span className="text-2xl">{f.icon}</span>
									{f.tag && (
										<Badge variant="secondary" className="text-xs bg-muted/60">
											{f.tag}
										</Badge>
									)}
								</div>
								<h3 className="font-semibold text-base mb-1.5">{f.title}</h3>
								<p className="text-sm text-muted-foreground leading-relaxed">
									{f.desc}
								</p>
							</CompactCard>
						))}
					</div>
				</div>
			</section>

			{/* Extension */}
			<section id="integrations" className="py-16 bg-muted/20">
				<div className="container mx-auto px-4">
					<div className="grid md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
						<div className="space-y-4">
							<Badge
								variant="secondary"
								className="gap-1 bg-red-500/10 text-red-700 dark:text-red-300"
							>
								<Sparkles className="h-3 w-3" /> {t("landing.extension.badge")}
							</Badge>
							<h2 className="text-2xl lg:text-3xl font-bold tracking-tight">
								{t("landing.extension.title")}
							</h2>
							<p className="text-muted-foreground leading-relaxed">
								{t("landing.extension.subtitle")}
							</p>
							<div className="flex items-center gap-3">
								<Button
									variant="outline"
									size="icon"
									asChild
									className="h-12 w-12 rounded-xl border-muted-foreground/20 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
									title="Available on Chrome Web Store"
								>
									<a href="https://chromewebstore.google.com/detail/groupify-youtube-organize/dmdgaegnpjnnkcbdngfgkhlehlccbija">
										<IconViewer icon="logos:chrome" className="h-6 w-6" />
									</a>
								</Button>
								<Button
									variant="outline"
									size="icon"
									asChild
									className="h-12 w-12 rounded-xl border-muted-foreground/20 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
									title="Available on Firefox Add-ons"
								>
									<a href="https://addons.mozilla.org/en-US/firefox/addon/groupify-yt-organize">
										<IconViewer icon="logos:firefox" className="h-6 w-6" />
									</a>
								</Button>
								<Button
									variant="outline"
									size="icon"
									asChild
									className="h-12 w-12 rounded-xl border-muted-foreground/20 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
									title="Available on Safari Extensions"
								>
									<a href="https://apps.apple.com/us/app/groupify-yt-subscriptions/id6714452813?l=pt-BR">
										<IconViewer icon="logos:safari" className="h-6 w-6" />
									</a>
								</Button>
							</div>
						</div>
						<CompactCard className="p-4">
							<div className="flex items-center gap-3 mb-4">
								<div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center">
									<Youtube className="h-5 w-5 text-white" />
								</div>
								<div>
									<div className="font-medium text-sm">Marques Brownlee</div>
									<div className="text-xs text-muted-foreground">
										17.5M {t("landing.extension.subscribers")}
									</div>
								</div>
							</div>
							<div className="flex items-center gap-2 p-2 rounded-lg bg-red-500/10 border border-red-500/20">
								<Check className="h-4 w-4 text-green-600 flex-shrink-0" />
								<span className="text-sm font-medium">
									Added to Tech Reviews
								</span>
							</div>
						</CompactCard>
					</div>
				</div>
			</section>

			{/* GitHub Repos */}
			<section className="py-16 bg-muted/20">
				<div className="container mx-auto px-4">
					<div className="text-center mb-8 space-y-3">
						<Badge variant="outline" className="bg-muted/50">
							<Github className="h-3 w-3 mr-1" /> Open Source
						</Badge>
						<h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
							Star Us on GitHub
						</h2>
						<p className="text-lg text-muted-foreground max-w-xl mx-auto">
							Help us grow by starring our repositories!
						</p>
					</div>
					<div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
						<CompactCard className="p-4 hover:border-red-500/30 transition-colors">
							<div className="flex items-center gap-3 mb-3">
								<div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
									<Github className="h-5 w-5 text-red-500" />
								</div>
								<div className="font-medium">Browser Extension</div>
							</div>
							<p className="text-sm text-muted-foreground mb-3">
								Chrome, Firefox & Safari extension
							</p>
							<Button variant="outline" size="sm" className="w-full" asChild>
								<a
									href="https://github.com/ArthurBugan/groupify.extension"
									target="_blank"
									rel="noopener noreferrer"
								>
									<Star className="h-4 w-4 mr-2" /> Star Repository
								</a>
							</Button>
						</CompactCard>
						<CompactCard className="p-4 hover:border-red-500/30 transition-colors">
							<div className="flex items-center gap-3 mb-3">
								<div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
									<Github className="h-5 w-5 text-red-500" />
								</div>
								<div className="font-medium">API Server</div>
							</div>
							<p className="text-sm text-muted-foreground mb-3">
								Backend API built with Axum
							</p>
							<Button variant="outline" size="sm" className="w-full" asChild>
								<a
									href="https://github.com/ArthurBugan/api.groupify"
									target="_blank"
									rel="noopener noreferrer"
								>
									<Star className="h-4 w-4 mr-2" /> Star Repository
								</a>
							</Button>
						</CompactCard>
						<CompactCard className="p-4 hover:border-red-500/30 transition-colors">
							<div className="flex items-center gap-3 mb-3">
								<div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
									<Github className="h-5 w-5 text-red-500" />
								</div>
								<div className="font-medium">Website</div>
							</div>
							<p className="text-sm text-muted-foreground mb-3">
								React website with TanStack
							</p>
							<Button variant="outline" size="sm" className="w-full" asChild>
								<a
									href="https://github.com/ArthurBugan/groupify.dev_v2"
									target="_blank"
									rel="noopener noreferrer"
								>
									<Star className="h-4 w-4 mr-2" /> Star Repository
								</a>
							</Button>
						</CompactCard>
					</div>
				</div>
			</section>

			{/* Testimonials */}
			<section id="testimonials" className="py-16 lg:py-20">
				<div className="container mx-auto px-4">
					<div className="text-center mb-12 space-y-3">
						<Badge variant="outline">{t("testimonials.badge")}</Badge>
						<h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
							{t("landing.testimonials.title")}
						</h2>
					</div>
					<div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
						{testimonials.map((t, i) => (
							<CompactCard key={i} className="p-4 space-y-3">
								<div className="flex items-center gap-1 text-yellow-500">
									{[...Array(5)].map((_, j) => (
										<Star key={j} className="h-3.5 w-3.5 fill-current" />
									))}
								</div>
								<p className="text-sm leading-relaxed">"{t.content}"</p>
								<div className="flex items-center gap-2 pt-2 border-t">
									<Avatar className="h-6 w-6">
										<AvatarImage src="/placeholder.svg" />
										<AvatarFallback className="text-xs bg-muted text-muted-foreground">
											{t.name.charAt(0)}
										</AvatarFallback>
									</Avatar>
									<div>
										<div className="text-sm font-medium">{t.name}</div>
										<div className="text-xs text-muted-foreground">
											{t.role}
										</div>
									</div>
								</div>
							</CompactCard>
						))}
					</div>
				</div>
			</section>

			{/* Pricing */}
			<section id="pricing" className="py-16 lg:py-20 bg-muted/20">
				<div className="container mx-auto px-4">
					<div className="text-center mb-12 space-y-3">
						<Badge variant="outline">{t("pricing.badge")}</Badge>
						<h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
							{t("landing.pricing.title")}
						</h2>
					</div>
					<div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
						{pricing.map((p) => (
							<CompactCard
								key={p.name}
								className={cn(
									"p-4 flex flex-col",
									p.popular && "border-red-500/50 shadow-md",
								)}
							>
								<div className="text-center mb-4">
									<h3 className="font-semibold">{p.name}</h3>
									<div className="mt-1 flex items-baseline justify-center gap-1">
										<span className="text-2xl font-bold">{p.price}</span>
										<span className="text-sm text-muted-foreground">
											/{p.period}
										</span>
									</div>
									<p className="text-xs text-muted-foreground mt-1.5">
										{p.desc}
									</p>
								</div>
								<ul className="space-y-2 mb-4 flex-1">
									{p.features.map((f, i) => (
										<li key={i} className="flex items-center gap-2 text-sm">
											<Check className="h-3.5 w-3.5 text-green-600 flex-shrink-0" />{" "}
											{f}
										</li>
									))}
								</ul>
								<Button
									size="sm"
									variant={p.popular ? "default" : "outline"}
									className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
									asChild
								>
									<Link to="/register">{p.cta}</Link>
								</Button>
							</CompactCard>
						))}
					</div>
				</div>
			</section>

			{/* CTA */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					<CompactCard className="p-8 lg:p-12 bg-gradient-to-r from-red-500 via-pink-500 to-orange-500 text-white border-0">
						<div className="text-center max-w-2xl mx-auto space-y-4">
							<h2 className="text-2xl lg:text-3xl font-bold tracking-tight">
								{t("landing.cta.title")}
							</h2>
							<p className="text-white/90">{t("landing.cta.subtitle")}</p>
							<div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
								<Button size="lg" variant="secondary" asChild>
									<Link to="/register">
										{t("landing.cta.primary")}{" "}
										<ArrowRight className="ml-2 h-4 w-4" />
									</Link>
								</Button>
								<Button
									size="lg"
									variant="outline"
									className="border-white/30 text-white hover:bg-white/10"
									asChild
								>
									<a href="https://discord.gg/Hp4MvPanwr">
										{t("landing.cta.secondary")}
									</a>
								</Button>
							</div>
						</div>
					</CompactCard>
				</div>
			</section>

			{/* Footer */}
			<footer className="border-t py-12">
				<div className="container mx-auto px-4">
					<div className="grid md:grid-cols-4 gap-8 mb-8 max-w-5xl mx-auto">
						<div>
							<div className="flex items-center gap-2 mb-3">
								<Youtube className="h-4 w-4 text-red-500" />
								<span className="font-semibold">Groupify</span>
							</div>
							<p className="text-sm text-muted-foreground leading-relaxed">
								The best way to organize, manage, and share your YouTube
								subscriptions.
							</p>
						</div>
						<div>
							<h4 className="font-medium mb-3">Product</h4>
							<ul className="space-y-2 text-sm text-muted-foreground">
								<li>
									<Link to="/dashboard" className="hover:text-foreground">
										Dashboard
									</Link>
								</li>
								<li>
									<a href="#features" className="hover:text-foreground">
										Features
									</a>
								</li>
								<li>
									<a href="#pricing" className="hover:text-foreground">
										Pricing
									</a>
								</li>
							</ul>
						</div>
						<div>
							<h4 className="font-medium mb-3">Support</h4>
							<ul className="space-y-2 text-sm text-muted-foreground">
								<li>
									<a
										href="https://discord.gg/Hp4MvPanwr"
										target="_blank"
										className="hover:text-foreground"
									>
										Help Center
									</a>
								</li>
								<li>
									<a
										href="mailto:admin@groupify.dev"
										className="hover:text-foreground"
									>
										Contact
									</a>
								</li>
							</ul>
						</div>
						<div>
							<h4 className="font-medium mb-3">Legal</h4>
							<ul className="space-y-2 text-sm text-muted-foreground">
								<li>
									<Link to="/blog" className="hover:text-foreground">
										Blog
									</Link>
								</li>
								<li>
									<Link to="/privacy" className="hover:text-foreground">
										Privacy
									</Link>
								</li>
								<li>
									<Link to="/terms" className="hover:text-foreground">
										Terms
									</Link>
								</li>
							</ul>
						</div>
					</div>
					<div className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4 max-w-5xl mx-auto text-sm text-muted-foreground">
						<p>© 2025 Groupify. All rights reserved.</p>
						<a
							href="https://acidtools.com"
							target="_blank"
							rel="noopener noreferrer"
						>
							<img
								src="https://acidtools.com/assets/images/badge-dark.png"
								alt="Acid Tools"
								className="h-8"
							/>
						</a>
					</div>
				</div>
			</footer>
		</div>
	);
}

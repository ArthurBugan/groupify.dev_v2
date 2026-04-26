"use client";

import { Link } from "@tanstack/react-router";
import { motion, useInView } from "framer-motion";
import {
	ArrowRight,
	Check,
	Github,
	Play,
	Sparkles,
	Star,
	Youtube,
} from "lucide-react";
import { useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CompactHeader } from "./compact-header";
import { IconViewer } from "./icon-picker";
import { useLanguage } from "./language-provider";

// --- Animation variants ---
// biome-ignore lint/suspicious/noExplicitAny: framer-motion Variants type mismatch
const fadeInUp: any = {
	hidden: { opacity: 0, y: 32 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// biome-ignore lint/suspicious/noExplicitAny: framer-motion Variants type mismatch
const fadeIn: any = {
	hidden: { opacity: 0 },
	visible: { opacity: 1, transition: { duration: 0.6 } },
};

// biome-ignore lint/suspicious/noExplicitAny: framer-motion Variants type mismatch
const staggerContainer: any = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.1, delayChildren: 0.15 },
	},
};

// biome-ignore lint/suspicious/noExplicitAny: framer-motion Variants type mismatch
const scaleIn: any = {
	hidden: { opacity: 0, scale: 0.92 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: { duration: 0.6, ease: "easeOut" },
	},
};

// biome-ignore lint/suspicious/noExplicitAny: framer-motion Variants type mismatch
const slideInLeft: any = {
	hidden: { opacity: 0, x: -48 },
	visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

// biome-ignore lint/suspicious/noExplicitAny: framer-motion Variants type mismatch
const slideInRight: any = {
	hidden: { opacity: 0, x: 48 },
	visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

// Reusable section wrapper that animates on scroll
function AnimatedSection({
	children,
	variants = fadeInUp,
	className,
}: {
	children: React.ReactNode;
	// biome-ignore lint/suspicious/noExplicitAny: framer-motion Variants type is overly strict
	variants?: any;
	className?: string;
}) {
	const ref = useRef(null);
	const inView = useInView(ref, { once: true, margin: "-60px" });
	return (
		<motion.div
			ref={ref}
			initial="hidden"
			animate={inView ? "visible" : "hidden"}
			variants={variants}
			className={className}
		>
			{children}
		</motion.div>
	);
}

// Reusable staggered grid wrapper
function AnimatedGrid({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	const ref = useRef(null);
	const inView = useInView(ref, { once: true, margin: "-60px" });
	return (
		<motion.div
			ref={ref}
			initial="hidden"
			animate={inView ? "visible" : "hidden"}
			variants={staggerContainer}
			className={className}
		>
			{children}
		</motion.div>
	);
}

function AnimatedBackground() {
	return (
		<div className="absolute inset-0 -z-10 overflow-hidden">
			<motion.div
				className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-red-500/5 blur-3xl"
				animate={{
					y: [0, -30, 0],
					x: [0, 20, 0],
					scale: [1, 1.08, 1],
				}}
				transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
			/>
			<motion.div
				className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full bg-pink-500/5 blur-3xl"
				animate={{
					y: [0, 25, 0],
					x: [0, -15, 0],
					scale: [1, 1.06, 1],
				}}
				transition={{
					duration: 22,
					repeat: Infinity,
					ease: "easeInOut",
					delay: 2,
				}}
			/>
			<motion.div
				className="absolute bottom-[10%] left-[20%] w-[30%] h-[30%] rounded-full bg-orange-500/5 blur-3xl"
				animate={{
					y: [0, -20, 0],
					x: [0, 25, 0],
					scale: [1, 1.05, 1],
				}}
				transition={{
					duration: 20,
					repeat: Infinity,
					ease: "easeInOut",
					delay: 4,
				}}
			/>
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
		<motion.div
			whileHover={{ y: -2, transition: { duration: 0.2 } }}
			className={cn(
				"rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow duration-200",
				className,
			)}
		>
			{children}
		</motion.div>
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
						<AnimatedSection variants={fadeInUp}>
							<Badge
								variant="outline"
								className="gap-1 bg-red-50/50 border-red-200 dark:bg-red-950/20 dark:border-red-800"
							>
								<Sparkles className="h-3 w-3" /> {t("landing.hero.badge")}
							</Badge>
						</AnimatedSection>
						<AnimatedSection variants={fadeInUp}>
							<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
								{t("landing.hero.title")}
							</h1>
						</AnimatedSection>
						<AnimatedSection variants={fadeInUp}>
							<p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
								{t("landing.hero.subtitle")}
							</p>
						</AnimatedSection>
						<AnimatedSection variants={fadeInUp}>
							<div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
								<motion.div
									whileHover={{ scale: 1.03 }}
									whileTap={{ scale: 0.97 }}
								>
									<Button
										size="lg"
										className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 shadow-md"
										asChild
									>
										<Link to="/register">
											{t("landing.hero.cta.primary")}{" "}
											<motion.span
												animate={{ x: [0, 4, 0] }}
												transition={{
													duration: 1.5,
													repeat: Infinity,
													ease: "easeInOut",
												}}
											>
												<ArrowRight className="ml-2 h-4 w-4" />
											</motion.span>
										</Link>
									</Button>
								</motion.div>
								<motion.div
									whileHover={{ scale: 1.03 }}
									whileTap={{ scale: 0.97 }}
								>
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
								</motion.div>
							</div>
						</AnimatedSection>
						<AnimatedGrid className="flex items-center justify-center gap-8 pt-6 text-sm text-muted-foreground">
							{stats.map((s) => (
								<motion.div
									key={s.label}
									variants={fadeInUp}
									className="text-center"
								>
									<div className="font-semibold text-foreground">{s.value}</div>
									<div>{s.label}</div>
								</motion.div>
							))}
						</AnimatedGrid>
					</div>

					{/* Preview */}
					<div className="mt-16 max-w-4xl mx-auto">
						<AnimatedSection variants={scaleIn}>
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
									].map((g, idx) => (
										<motion.div
											key={g.name}
											initial={{ opacity: 0, x: -16 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{ delay: 0.4 + idx * 0.12, duration: 0.5 }}
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
										</motion.div>
									))}
								</div>
							</CompactCard>
						</AnimatedSection>
					</div>
				</div>
			</section>

			{/* Features */}
			{/** biome-ignore lint/correctness/useUniqueElementIds: <need to use explict id> */}
			<section id="features" className="py-16 lg:py-20">
				<div className="container mx-auto px-4">
					<AnimatedSection variants={fadeInUp}>
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
					</AnimatedSection>
					<AnimatedGrid className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
						{features.map((f, i) => (
							<motion.div key={i} variants={fadeInUp}>
								<CompactCard className="p-4 hover:border-red-500/30 transition-colors">
									<div className="flex items-start justify-between mb-3">
										<motion.span
											className="text-2xl"
											whileHover={{ scale: 1.3, rotate: 12 }}
											transition={{ type: "spring", stiffness: 300 }}
										>
											{f.icon}
										</motion.span>
										{f.tag && (
											<Badge
												variant="secondary"
												className="text-xs bg-muted/60"
											>
												{f.tag}
											</Badge>
										)}
									</div>
									<h3 className="font-semibold text-base mb-1.5">{f.title}</h3>
									<p className="text-sm text-muted-foreground leading-relaxed">
										{f.desc}
									</p>
								</CompactCard>
							</motion.div>
						))}
					</AnimatedGrid>
				</div>
			</section>

			{/* Extension */}
			<section id="integrations" className="py-16 bg-muted/20">
				<div className="container mx-auto px-4">
					<div className="grid md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
						<AnimatedSection variants={slideInLeft}>
							<div className="space-y-4">
								<Badge
									variant="secondary"
									className="gap-1 bg-red-500/10 text-red-700 dark:text-red-300"
								>
									<Sparkles className="h-3 w-3" />{" "}
									{t("landing.extension.badge")}
								</Badge>
								<h2 className="text-2xl lg:text-3xl font-bold tracking-tight">
									{t("landing.extension.title")}
								</h2>
								<p className="text-muted-foreground leading-relaxed">
									{t("landing.extension.subtitle")}
								</p>
								<div className="flex items-center gap-3">
									{[
										{
											href: "https://chromewebstore.google.com/detail/groupify-youtube-organize/dmdgaegnpjnnkcbdngfgkhlehlccbija",
											icon: "logos:chrome",
											title: "Available on Chrome Web Store",
										},
										{
											href: "https://addons.mozilla.org/en-US/firefox/addon/groupify-yt-organize",
											icon: "logos:firefox",
											title: "Available on Firefox Add-ons",
										},
										{
											href: "https://apps.apple.com/us/app/groupify-yt-subscriptions/id6714452813?l=pt-BR",
											icon: "logos:safari",
											title: "Available on Safari Extensions",
										},
									].map((browser, idx) => (
										<motion.div
											key={browser.title}
											initial={{ opacity: 0, y: 12 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ delay: 0.3 + idx * 0.1 }}
										>
											<Button
												variant="outline"
												size="icon"
												asChild
												className="h-12 w-12 rounded-xl border-muted-foreground/20 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
												title={browser.title}
											>
												<a href={browser.href}>
													<IconViewer icon={browser.icon} className="h-6 w-6" />
												</a>
											</Button>
										</motion.div>
									))}
								</div>
							</div>
						</AnimatedSection>
						<AnimatedSection variants={slideInRight}>
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
								<motion.div
									initial={{ opacity: 0, scale: 0.9 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
									className="flex items-center gap-2 p-2 rounded-lg bg-red-500/10 border border-red-500/20"
								>
									<Check className="h-4 w-4 text-green-600 flex-shrink-0" />
									<span className="text-sm font-medium">
										Added to Tech Reviews
									</span>
								</motion.div>
							</CompactCard>
						</AnimatedSection>
					</div>
				</div>
			</section>

			{/* GitHub Repos */}
			<section className="py-16 bg-muted/20">
				<div className="container mx-auto px-4">
					<AnimatedSection variants={fadeInUp}>
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
					</AnimatedSection>
					<AnimatedGrid className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
						{[
							{
								name: "Browser Extension",
								desc: "Chrome, Firefox & Safari extension",
								href: "https://github.com/ArthurBugan/groupify.extension",
							},
							{
								name: "API Server",
								desc: "Backend API built with Axum",
								href: "https://github.com/ArthurBugan/api.groupify",
							},
							{
								name: "Website",
								desc: "React website with TanStack",
								href: "https://github.com/ArthurBugan/groupify.dev_v2",
							},
						].map((repo) => (
							<motion.div key={repo.name} variants={fadeInUp}>
								<CompactCard className="p-4 hover:border-red-500/30 transition-colors">
									<div className="flex items-center gap-3 mb-3">
										<motion.div
											whileHover={{ rotate: 12, scale: 1.1 }}
											className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center"
										>
											<Github className="h-5 w-5 text-red-500" />
										</motion.div>
										<div className="font-medium">{repo.name}</div>
									</div>
									<p className="text-sm text-muted-foreground mb-3">
										{repo.desc}
									</p>
									<Button
										variant="outline"
										size="sm"
										className="w-full"
										asChild
									>
										<a
											href={repo.href}
											target="_blank"
											rel="noopener noreferrer"
										>
											<motion.span
												className="flex items-center gap-2"
												whileHover={{ scale: 1.05 }}
											>
												<Star className="h-4 w-4" /> Star Repository
											</motion.span>
										</a>
									</Button>
								</CompactCard>
							</motion.div>
						))}
					</AnimatedGrid>
				</div>
			</section>

			{/* Testimonials */}
			<section id="testimonials" className="py-16 lg:py-20">
				<div className="container mx-auto px-4">
					<AnimatedSection variants={fadeInUp}>
						<div className="text-center mb-12 space-y-3">
							<Badge variant="outline">{t("testimonials.badge")}</Badge>
							<h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
								{t("landing.testimonials.title")}
							</h2>
						</div>
					</AnimatedSection>
					<AnimatedGrid className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
						{testimonials.map((tm, i) => (
							<motion.div key={i} variants={fadeInUp}>
								<CompactCard className="p-4 space-y-3">
									<div className="flex items-center gap-1 text-yellow-500">
										{[...Array(5)].map((_, j) => (
											<motion.div
												key={j}
												initial={{ scale: 0 }}
												animate={{ scale: 1 }}
												transition={{ delay: 0.2 + j * 0.08, type: "spring" }}
											>
												<Star className="h-3.5 w-3.5 fill-current" />
											</motion.div>
										))}
									</div>
									<p className="text-sm leading-relaxed">"{tm.content}"</p>
									<div className="flex items-center gap-2 pt-2 border-t">
										<Avatar className="h-6 w-6">
											<AvatarImage src="/placeholder.svg" />
											<AvatarFallback className="text-xs bg-muted text-muted-foreground">
												{tm.name.charAt(0)}
											</AvatarFallback>
										</Avatar>
										<div>
											<div className="text-sm font-medium">{tm.name}</div>
											<div className="text-xs text-muted-foreground">
												{tm.role}
											</div>
										</div>
									</div>
								</CompactCard>
							</motion.div>
						))}
					</AnimatedGrid>
				</div>
			</section>

			{/* Pricing */}
			<section id="pricing" className="py-16 lg:py-20 bg-muted/20">
				<div className="container mx-auto px-4">
					<AnimatedSection variants={fadeInUp}>
						<div className="text-center mb-12 space-y-3">
							<Badge variant="outline">{t("pricing.badge")}</Badge>
							<h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
								{t("landing.pricing.title")}
							</h2>
						</div>
					</AnimatedSection>
					<AnimatedGrid className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
						{pricing.map((p) => (
							<motion.div
								key={p.name}
								variants={fadeInUp}
								whileHover={p.popular ? { scale: 1.02 } : {}}
								transition={{ type: "spring", stiffness: 300 }}
							>
								<CompactCard
									className={cn(
										"p-4 flex flex-col",
										p.popular && "border-red-500/50 shadow-md",
									)}
								>
									{p.popular && (
										<motion.div
											className="absolute -top-3 left-1/2 -translate-x-1/2"
											animate={{ scale: [1, 1.1, 1] }}
											transition={{ duration: 2, repeat: Infinity }}
										>
											<Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white border-0">
												<Sparkles className="h-3 w-3 mr-1" />
												Most Popular
											</Badge>
										</motion.div>
									)}
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
									<motion.div
										whileHover={{ scale: 1.03 }}
										whileTap={{ scale: 0.97 }}
									>
										<Button
											size="sm"
											variant={p.popular ? "default" : "outline"}
											className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
											asChild
										>
											<Link to="/register">{p.cta}</Link>
										</Button>
									</motion.div>
								</CompactCard>
							</motion.div>
						))}
					</AnimatedGrid>
				</div>
			</section>

			{/* CTA */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					<AnimatedSection variants={scaleIn}>
						<CompactCard className="p-8 lg:p-12 bg-gradient-to-r from-red-500 via-pink-500 to-orange-500 text-white border-0">
							<div className="text-center max-w-2xl mx-auto space-y-4">
								<h2 className="text-2xl lg:text-3xl font-bold tracking-tight">
									{t("landing.cta.title")}
								</h2>
								<p className="text-white/90">{t("landing.cta.subtitle")}</p>
								<div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
									<motion.div
										whileHover={{ scale: 1.03 }}
										whileTap={{ scale: 0.97 }}
									>
										<Button size="lg" variant="secondary" asChild>
											<Link to="/register">
												{t("landing.cta.primary")}{" "}
												<motion.span
													animate={{ x: [0, 4, 0] }}
													transition={{
														duration: 1.5,
														repeat: Infinity,
														ease: "easeInOut",
													}}
												>
													<ArrowRight className="ml-2 h-4 w-4" />
												</motion.span>
											</Link>
										</Button>
									</motion.div>
									<motion.div
										whileHover={{ scale: 1.03 }}
										whileTap={{ scale: 0.97 }}
									>
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
									</motion.div>
								</div>
							</div>
						</CompactCard>
					</AnimatedSection>
				</div>
			</section>

			{/* Footer */}
			<AnimatedSection variants={fadeIn}>
				<footer className="border-t py-12">
					<div className="container mx-auto px-4">
						<div className="grid md:grid-cols-4 gap-8 mb-8 max-w-5xl mx-auto">
							<div>
								<div className="flex items-center gap-2 mb-3">
									<motion.div whileHover={{ rotate: 12 }}>
										<Youtube className="h-4 w-4 text-red-500" />
									</motion.div>
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
											rel="noopener"
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
			</AnimatedSection>
		</div>
	);
}

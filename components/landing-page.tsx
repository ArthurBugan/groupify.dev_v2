"use client";

import { Link } from "@tanstack/react-router";
import {
	ArrowRight,
	CheckCircle,
	Clock,
	FolderKanban,
	Globe,
	Layers,
	Play,
	Share2,
	Sparkles,
	Star,
	Users,
	Youtube,
	Zap,
} from "lucide-react";
import { useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { IconViewer } from "./icon-picker";
import { useLanguage } from "./language-provider";
import { MainNavbar } from "./main-navbar";

// Animated background with floating particles
function AnimatedBackground() {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		let animationFrameId: number;
		let particles: Array<{
			x: number;
			y: number;
			size: number;
			speedX: number;
			speedY: number;
			opacity: number;
		}> = [];

		const resize = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};

		const createParticles = () => {
			particles = [];
			const particleCount = Math.min(50, Math.floor(window.innerWidth / 30));
			for (let i = 0; i < particleCount; i++) {
				particles.push({
					x: Math.random() * canvas.width,
					y: Math.random() * canvas.height,
					size: Math.random() * 2 + 1,
					speedX: (Math.random() - 0.5) * 0.5,
					speedY: (Math.random() - 0.5) * 0.5,
					opacity: Math.random() * 0.5 + 0.1,
				});
			}
		};

		const animate = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			particles.forEach((particle) => {
				particle.x += particle.speedX;
				particle.y += particle.speedY;

				if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
				if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

				ctx.beginPath();
				ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(239, 68, 68, ${particle.opacity})`;
				ctx.fill();
			});

			particles.forEach((p1, i) => {
				particles.slice(i + 1).forEach((p2) => {
					const distance = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
					if (distance < 150) {
						ctx.beginPath();
						ctx.moveTo(p1.x, p1.y);
						ctx.lineTo(p2.x, p2.y);
						ctx.strokeStyle = `rgba(239, 68, 68, ${0.1 * (1 - distance / 150)})`;
						ctx.stroke();
					}
				});
			});

			animationFrameId = requestAnimationFrame(animate);
		};

		resize();
		createParticles();
		animate();

		window.addEventListener("resize", () => {
			resize();
			createParticles();
		});

		return () => {
			cancelAnimationFrame(animationFrameId);
			window.removeEventListener("resize", resize);
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			className="absolute inset-0 pointer-events-none opacity-40"
		/>
	);
}

// Feature Card Component
function FeatureCard({
	feature,
	index,
}: {
	feature: {
		icon: React.ElementType;
		title: string;
		description: string;
		color: string;
		badge?: string;
	};
	index: number;
}) {
	return (
		<Card
			className={cn(
				"group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white dark:bg-slate-900",
				index % 3 === 0 && "lg:translate-y-0",
				index % 3 === 1 && "lg:translate-y-4",
				index % 3 === 2 && "lg:translate-y-8",
			)}
		>
			<div
				className={cn(
					"absolute top-0 left-0 w-full h-1 bg-gradient-to-r",
					feature.color,
				)}
			/>
			<div
				className={cn(
					"absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-500",
					feature.color,
				)}
			/>

			<CardHeader className="pb-4">
				<div className="flex items-start justify-between mb-4">
					<div
						className={cn(
							"w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300",
							feature.color,
						)}
					>
						<feature.icon className="h-7 w-7 text-white" />
					</div>
					{feature.badge && (
						<Badge
							variant="secondary"
							className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0"
						>
							{feature.badge}
						</Badge>
					)}
				</div>
				<CardTitle className="text-xl group-hover:text-red-600 transition-colors">
					{feature.title}
				</CardTitle>
			</CardHeader>
			<CardContent>
				<p className="text-muted-foreground leading-relaxed">
					{feature.description}
				</p>
			</CardContent>
		</Card>
	);
}

// Testimonial Card Component
function TestimonialCard({
	testimonial,
}: {
	testimonial: {
		name: string;
		role: string;
		content: string;
		rating: number;
		avatar: string;
	};
}) {
	return (
		<Card className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden bg-white dark:bg-slate-900">
			<div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-500/10 to-pink-500/10 rounded-bl-full" />

			<CardHeader className="relative">
				<div className="flex items-center gap-4">
					<Avatar className="h-12 w-12 border-2 border-red-100">
						<AvatarImage src={testimonial.avatar} />
						<AvatarFallback className="bg-gradient-to-br from-red-500 to-pink-500 text-white">
							{testimonial.name.charAt(0)}
						</AvatarFallback>
					</Avatar>
					<div>
						<CardTitle className="text-base">{testimonial.name}</CardTitle>
						<CardDescription>{testimonial.role}</CardDescription>
					</div>
				</div>
				<div className="flex gap-0.5 mt-4">
					{Array.from({ length: testimonial.rating }).map((_, i) => (
						<Star
							key={`star-${i}`}
							className="h-4 w-4 fill-yellow-400 text-yellow-400"
						/>
					))}
				</div>
			</CardHeader>
			<CardContent>
				<p className="text-muted-foreground italic leading-relaxed">
					{testimonial.content}
				</p>
			</CardContent>
		</Card>
	);
}

// Pricing Card Component
function PricingCard({
	plan,
	popularLabel,
}: {
	plan: {
		name: string;
		price: string;
		period: string;
		description: string;
		features: string[];
		cta: string;
		popular: boolean;
	};
	popularLabel?: string;
}) {
	return (
		<Card
			className={cn(
				"relative group overflow-hidden transition-all duration-300 hover:shadow-2xl",
				plan.popular
					? "border-2 border-red-500 shadow-xl shadow-red-500/10 scale-105 z-10"
					: "border shadow-lg hover:-translate-y-1",
				"flex flex-col h-full bg-white dark:bg-slate-900",
			)}
		>
			{plan.popular && popularLabel && (
				<div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-red-500 to-pink-500 text-white text-center py-1 text-xs font-semibold">
					{popularLabel}
				</div>
			)}

			<CardHeader className={cn("text-center pb-4", plan.popular && "pt-8")}>
				<CardTitle className="text-xl mb-2">{plan.name}</CardTitle>
				<div className="flex items-baseline justify-center gap-1">
					<span className="text-4xl font-bold">{plan.price}</span>
					<span className="text-muted-foreground">/{plan.period}</span>
				</div>
				<p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
			</CardHeader>

			<CardContent className="flex-1">
				<ul className="space-y-3">
					{plan.features.map((feature, i) => (
						<li
							key={`feature-${plan.name}-${i}`}
							className="flex items-start gap-2"
						>
							<CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
							<span className="text-sm">{feature}</span>
						</li>
					))}
				</ul>
			</CardContent>

			<CardFooter>
				<Button
					className={cn(
						"w-full py-6 text-base",
						plan.popular
							? "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 shadow-lg shadow-red-500/25"
							: "",
					)}
					variant={plan.popular ? "default" : "outline"}
					asChild
				>
					<Link to="/register">
						{plan.cta}
						<ArrowRight className="ml-2 h-4 w-4" />
					</Link>
				</Button>
			</CardFooter>
		</Card>
	);
}

export function LandingPage() {
	const { t } = useLanguage();

	const features = [
		{
			icon: FolderKanban,
			title: t("landing.features.smart.title"),
			description: t("landing.features.smart.desc"),
			color: "from-blue-500 to-cyan-500",
			badge: "Core",
		},
		{
			icon: Share2,
			title: t("landing.features.share.title"),
			description: t("landing.features.share.desc"),
			color: "from-purple-500 to-pink-500",
			badge: "Popular",
		},
		{
			icon: Users,
			title: t("landing.features.permissions.title"),
			description: t("landing.features.permissions.desc"),
			color: "from-green-500 to-emerald-500",
			badge: "Pro",
		},
		{
			icon: Layers,
			title: t("landing.features.bulk.title"),
			description: t("landing.features.bulk.desc"),
			color: "from-amber-500 to-orange-500",
		},
		{
			icon: Zap,
			title: t("landing.features.extension.title"),
			description: t("landing.features.extension.desc"),
			color: "from-red-500 to-pink-500",
			badge: "New",
		},
		{
			icon: Globe,
			title: t("landing.features.everywhere.title"),
			description: t("landing.features.everywhere.desc"),
			color: "from-indigo-500 to-blue-500",
		},
	];

	const testimonials = [
		{
			name: "Alex Johnson",
			role: "Content Creator",
			content: t("landing.testimonials.alex.content"),
			rating: 5,
			avatar: "/placeholder.svg",
		},
		{
			name: "Sarah Chen",
			role: "Marketing Manager",
			content: t("landing.testimonials.sarah.content"),
			rating: 5,
			avatar: "/placeholder.svg",
		},
		{
			name: "Mike Rodriguez",
			role: "YouTube Strategist",
			content: t("landing.testimonials.mike.content"),
			rating: 5,
			avatar: "/placeholder.svg",
		},
	];

	const pricingPlans = [
		{
			name: t("landing.pricing.free.name"),
			price: "$0",
			period: "forever",
			description: t("pricing.free.desc"),
			features: [
				"Up to 3 groups",
				"Up to 20 channels",
				"Basic organization",
				"Community support",
			],
			cta: t("landing.pricing.cta.free"),
			popular: false,
		},
		{
			name: t("landing.pricing.pro.name"),
			price: "$3.99",
			period: "month",
			description: t("pricing.pro.desc"),
			features: [
				"Up to 10 groups",
				"Up to 1,000 channels",
				"Create subgroups",
				"Share groups with others",
				"Priority support",
			],
			cta: t("landing.pricing.cta.pro"),
			popular: true,
		},
		{
			name: t("landing.pricing.business.name"),
			price: "$9.99",
			period: "month",
			description: t("pricing.business.desc"),
			features: [
				"Unlimited groups",
				"Unlimited channels",
				"Team collaboration",
				"Custom categories",
				"Priority support",
				"API access",
			],
			cta: t("landing.pricing.cta.business"),
			popular: false,
		},
	];

	const stats = [
		{ label: "Active Users", value: "10,000+", icon: Users },
		{ label: "Channels Managed", value: "500K+", icon: Youtube },
		{ label: "Groups Created", value: "50K+", icon: FolderKanban },
		{ label: "Uptime", value: "99.9%", icon: Clock },
	];

	return (
		<div className="min-h-screen bg-background relative overflow-hidden">
			<AnimatedBackground />

			<MainNavbar />

			{/* Hero Section */}
			<section className="relative min-h-screen flex items-center pt-20">
				<div className="absolute inset-0 bg-gradient-to-br from-red-50/50 via-white to-pink-50/50 dark:from-red-950/20 dark:via-background dark:to-pink-950/20" />

				<div className="container mx-auto px-4 relative">
					<div className="grid lg:grid-cols-2 gap-12 items-center">
						<div className="space-y-8 max-w-2xl">
							<div className="space-y-6">
								<Badge
									variant="outline"
									className="w-fit border-red-200 bg-red-50 text-red-700 hover:bg-red-100 dark:border-red-800 dark:bg-red-950 dark:text-red-300"
								>
									<Sparkles className="mr-1 h-3 w-3" />
									{t("landing.hero.badge")}
								</Badge>

								<h1 className="text-5xl lg:text-7xl font-bold tracking-tight">
									{t("landing.hero.title")}
								</h1>

								<p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
									{t("landing.hero.subtitle")}
								</p>
							</div>

							<div className="flex flex-col sm:flex-row gap-4">
								<Button
									size="lg"
									className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white shadow-lg shadow-red-500/25 px-8 py-6 text-lg"
									asChild
								>
									<Link to="/register">
										{t("landing.hero.cta.primary")}
										<ArrowRight className="ml-2 h-5 w-5" />
									</Link>
								</Button>
								<Button
									size="lg"
									variant="outline"
									className="px-8 py-6 text-lg"
									asChild
								>
									<a
										href="https://youtu.be/Hz-F6q0SZqU"
										target="_blank"
										rel="noopener noreferrer"
									>
										<Play className="mr-2 h-5 w-5" />
										{t("landing.hero.cta.secondary")}
									</a>
								</Button>
							</div>

							<div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
								<div className="flex items-center gap-2">
									<CheckCircle className="h-4 w-4 text-green-500" />
									<span>{t("landing.hero.trust1")}</span>
								</div>
								<div className="flex items-center gap-2">
									<CheckCircle className="h-4 w-4 text-green-500" />
									<span>{t("landing.hero.trust2")}</span>
								</div>
								<div className="flex items-center gap-2">
									<CheckCircle className="h-4 w-4 text-green-500" />
									<span>{t("landing.hero.trust3")}</span>
								</div>
							</div>

							{/* Stats */}
							<div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t">
								{stats.map((stat) => (
									<div key={stat.label} className="text-center">
										<div className="text-2xl font-bold text-foreground">
											{stat.value}
										</div>
										<div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
											<stat.icon className="h-3 w-3" />
											{stat.label}
										</div>
									</div>
								))}
							</div>
						</div>

						{/* Hero Visual */}
						<div className="hidden lg:block relative">
							<div className="relative">
								<div className="absolute -inset-4 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-3xl blur-2xl" />
								<div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-6 border">
									<div className="flex items-center gap-2 mb-6">
										<div className="flex gap-1.5">
											<div className="w-3 h-3 rounded-full bg-red-500" />
											<div className="w-3 h-3 rounded-full bg-yellow-500" />
											<div className="w-3 h-3 rounded-full bg-green-500" />
										</div>
										<div className="ml-4 text-sm text-muted-foreground">
											{t("landing.hero.preview")}
										</div>
									</div>

									{/* Mock Dashboard UI */}
									<div className="space-y-3">
										{[
											{
												name: "Tech Reviews",
												channels: 12,
												color: "bg-blue-500",
											},
											{
												name: "Cooking",
												channels: 8,
												color: "bg-orange-500",
											},
											{
												name: "Gaming",
												channels: 15,
												color: "bg-purple-500",
											},
										].map((group) => (
											<div
												key={group.name}
												className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
											>
												<div
													className={cn(
														"w-10 h-10 rounded-lg flex items-center justify-center",
														group.color,
													)}
												>
													<FolderKanban className="h-5 w-5 text-white" />
												</div>
												<div className="flex-1">
													<div className="font-medium">{group.name}</div>
													<div className="text-xs text-muted-foreground">
														{group.channels} channels
													</div>
												</div>
												<Share2 className="h-4 w-4 text-muted-foreground" />
											</div>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="py-24 lg:py-32 relative">
				<div className="container mx-auto px-4">
					<div className="text-center max-w-3xl mx-auto mb-16">
						<Badge
							variant="outline"
							className="mb-4 border-red-200 bg-red-50 text-red-700"
						>
							{t("features.badge")}
						</Badge>
						<h2 className="text-3xl lg:text-5xl font-bold mb-4">
							{t("landing.features.title")}
						</h2>
						<p className="text-xl text-muted-foreground">
							{t("landing.features.subtitle")}
						</p>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
						{features.map((feature, index) => (
							<FeatureCard
								key={feature.title}
								feature={feature}
								index={index}
							/>
						))}
					</div>
				</div>
			</section>

			{/* Browser Extension Section */}
			<section className="py-24 bg-gradient-to-br from-red-500/5 to-pink-500/5">
				<div className="container mx-auto px-4">
					<div className="grid lg:grid-cols-2 gap-12 items-center">
						<div className="space-y-6">
							<Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white border-0">
								<Zap className="mr-1 h-3 w-3" />
								{t("landing.extension.badge")}
							</Badge>
							<h2 className="text-3xl lg:text-4xl font-bold">
								{t("landing.extension.title")}
							</h2>
							<p className="text-lg text-muted-foreground">
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
						<div className="relative">
							<div className="absolute -inset-4 bg-gradient-to-r from-red-500/10 to-pink-500/10 rounded-3xl blur-2xl" />
							<div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 border">
								<div className="flex items-center gap-4 mb-6">
									<div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center">
										<Youtube className="h-6 w-6 text-white" />
									</div>
									<div>
										<div className="font-semibold">Marques Brownlee</div>
										<div className="text-sm text-muted-foreground">
											17.5M {t("landing.extension.subscribers")}
										</div>
									</div>
								</div>
								<div className="space-y-3">
									<div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-200">
										<FolderKanban className="h-5 w-5 text-red-500" />
										<span className="flex-1 font-medium">
											Add to Tech Reviews
										</span>
										<CheckCircle className="h-5 w-5 text-green-500" />
									</div>
								</div>
								<p className="text-sm text-muted-foreground mt-4 text-center">
									{t("landing.extension.success")}
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Testimonials Section */}
			<section className="py-24 lg:py-32">
				<div className="container mx-auto px-4">
					<div className="text-center max-w-3xl mx-auto mb-16">
						<Badge
							variant="outline"
							className="mb-4 border-red-200 bg-red-50 text-red-700"
						>
							{t("testimonials.badge")}
						</Badge>
						<h2 className="text-3xl lg:text-5xl font-bold mb-4">
							{t("landing.testimonials.title")}
						</h2>
						<p className="text-xl text-muted-foreground">
							{t("landing.testimonials.subtitle")}
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-6">
						{testimonials.map((testimonial) => (
							<TestimonialCard
								key={testimonial.name}
								testimonial={testimonial}
							/>
						))}
					</div>
				</div>
			</section>

			{/* Pricing Section */}
			<section className="py-24 bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-background">
				<div className="container mx-auto px-4">
					<div className="text-center max-w-3xl mx-auto mb-16">
						<Badge
							variant="outline"
							className="mb-4 border-red-200 bg-red-50 text-red-700"
						>
							{t("pricing.badge")}
						</Badge>
						<h2 className="text-3xl lg:text-5xl font-bold mb-4">
							{t("landing.pricing.title")}
						</h2>
						<p className="text-xl text-muted-foreground">
							{t("landing.pricing.subtitle")}
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
						{pricingPlans.map((plan) => (
							<PricingCard
								key={plan.name}
								plan={plan}
								popularLabel={t("landing.pricing.mostpopular")}
							/>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-24 relative overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-r from-red-500 via-pink-500 to-orange-500" />
				<div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZ2LTRoLTJ2NGgyem0tNiA2aC00djJoNHYtMnptMC02di00aC00djRoNHptLTYgNmgtNHYyaDR2LTJ6bTAtNnYtNGgtNHY0aDR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />

				<div className="container mx-auto px-4 relative">
					<div className="text-center max-w-3xl mx-auto">
						<h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
							{t("landing.cta.title")}
						</h2>
						<p className="text-xl text-white/80 mb-8">
							{t("landing.cta.subtitle")}
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Button
								size="lg"
								variant="secondary"
								className="bg-white text-gray-900 hover:bg-gray-100 shadow-xl px-8 py-6 text-lg"
								asChild
							>
								<Link to="/register">
									{t("landing.cta.primary")}
									<ArrowRight className="ml-2 h-5 w-5" />
								</Link>
							</Button>
							<Button
								size="lg"
								variant="outline"
								className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg"
								asChild
							>
								<a
									href="https://discord.gg/Hp4MvPanwr"
									target="_blank"
									rel="noopener noreferrer"
								>
									{t("landing.cta.secondary")}
								</a>
							</Button>
						</div>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="py-16 border-t bg-muted/30">
				<div className="container mx-auto px-4">
					<div className="grid md:grid-cols-4 gap-8 mb-12">
						<div className="space-y-4">
							<div className="flex items-center gap-2">
								<div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center">
									<Youtube className="h-4 w-4 text-white" />
								</div>
								<span className="text-lg font-bold">Groupify</span>
							</div>
							<p className="text-sm text-muted-foreground">
								The best way to organize, manage, and share your YouTube
								subscriptions.
							</p>
						</div>

						<div>
							<h3 className="font-semibold mb-4">Product</h3>
							<ul className="space-y-2 text-sm text-muted-foreground">
								<li>
									<Link
										to="/dashboard"
										className="hover:text-foreground transition-colors"
									>
										Dashboard
									</Link>
								</li>
								<li>
									<Link
										to="/dashboard/groups"
										className="hover:text-foreground transition-colors"
									>
										Groups
									</Link>
								</li>
								<li>
									<a
										href="#features"
										className="hover:text-foreground transition-colors"
									>
										Features
									</a>
								</li>
								<li>
									<a
										href="#pricing"
										className="hover:text-foreground transition-colors"
									>
										Pricing
									</a>
								</li>
							</ul>
						</div>

						<div>
							<h3 className="font-semibold mb-4">Support</h3>
							<ul className="space-y-2 text-sm text-muted-foreground">
								<li>
									<a
										href="https://discord.gg/Hp4MvPanwr"
										target="_blank"
										rel="noopener noreferrer"
										className="hover:text-foreground transition-colors"
									>
										Help Center
									</a>
								</li>
								<li>
									<a
										href="mailto:admin@groupify.dev"
										className="hover:text-foreground transition-colors"
									>
										Contact
									</a>
								</li>
								<li>
									<a
										href="https://discord.gg/Hp4MvPanwr"
										target="_blank"
										rel="noopener noreferrer"
										className="hover:text-foreground transition-colors"
									>
										Community
									</a>
								</li>
							</ul>
						</div>

						<div>
							<h3 className="font-semibold mb-4">Legal</h3>
							<ul className="space-y-2 text-sm text-muted-foreground">
								<li>
									<Link
										to="/blog"
										className="hover:text-foreground transition-colors"
									>
										Blog
									</Link>
								</li>
								<li>
									<Link
										to="/privacy"
										className="hover:text-foreground transition-colors"
									>
										Privacy Policy
									</Link>
								</li>
								<li>
									<Link
										to="/terms"
										className="hover:text-foreground transition-colors"
									>
										Terms of Service
									</Link>
								</li>
							</ul>
						</div>
					</div>

					<div className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4">
						<p className="text-sm text-muted-foreground">
							© 2025 Groupify. All rights reserved.
						</p>
						<a
							href="https://acidtools.com"
							target="_blank"
							rel="noopener noreferrer"
							className="opacity-80 hover:opacity-100 transition-opacity"
						>
							<img
								src="https://acidtools.com/assets/images/badge-dark.png"
								alt="Acid Tools"
								className="h-10"
							/>
						</a>
					</div>
				</div>
			</footer>
		</div>
	);
}

import { Link } from "@tanstack/react-router";
import {
	ArrowRight,
	BarChart3,
	BookAIcon,
	CheckCircle,
	ChevronRight,
	Code2,
	Database,
	FolderKanban,
	GitBranch,
	Github,
	Monitor,
	Play,
	Rocket,
	Server,
	Star,
	TrendingUp,
	Users,
	Youtube,
} from "lucide-react";
import { useId } from "react";
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
import { useLanguage } from "./language-provider";
import { MainNavbar } from "./main-navbar";
import { IconViewer } from "./icon-picker";
import { Icons } from "./ui/icons";

// Tech-inspired animated background component
function TechBackground() {
	return (
		<div className="absolute inset-0 overflow-hidden pointer-events-none">
			{/* Grid pattern */}
			<div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] dark:bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)]" />

			{/* Floating code elements */}
			<div className="absolute top-20 left-20 text-xs font-mono text-muted-foreground/30 animate-pulse">
				<div>const channels = await api.getChannels();</div>
			</div>
			<div className="absolute top-40 right-32 text-xs font-mono text-muted-foreground/30 animate-pulse delay-1000">
				<div>{"{ analytics: true, realTime: true }"}</div>
			</div>
			<div className="absolute bottom-32 left-32 text-xs font-mono text-muted-foreground/30 animate-pulse delay-2000">
				<div>npm install @groupify/sdk</div>
			</div>

			{/* Animated dots */}
			{Array.from({ length: 20 }).map((_, i) => (
				<div
					key={`dot-${Math.random().toString(36).substring(7)}-${i}`}
					className="absolute w-1 h-1 bg-primary/20 rounded-full animate-pulse"
					style={{
						left: `${Math.random() * 100}%`,
						top: `${Math.random() * 100}%`,
						animationDelay: `${Math.random() * 3}s`,
						animationDuration: `${2 + Math.random() * 2}s`,
					}}
				/>
			))}
		</div>
	);
}

export function LandingPage() {
	const { t } = useLanguage();
	const featuresId = useId();
	const integrationsId = useId();
	const testimonialsId = useId();
	const pricingId = useId();

	const features = [
		{
			icon: Code2,
			title: t("features.smartorg.title"),
			description: t("features.smartorg.desc"),
			color: "from-blue-500 to-cyan-500",
			bgColor:
				"bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20",
		},
		{
			icon: GitBranch,
			title: t("features.collaboration.title"),
			description: t("features.collaboration.desc"),
			color: "from-green-500 to-emerald-500",
			bgColor:
				"bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20",
		},
		{
			icon: Server,
			title: t("features.youtube.title"),
			description: t("features.youtube.desc"),
			color: "from-yellow-500 to-orange-500",
			bgColor:
				"bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20",
		},
		{
			icon: Database,
			title: t("features.team.title"),
			description: t("features.team.desc"),
			color: "from-red-500 to-pink-500",
			bgColor:
				"bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20",
		},
		{
			icon: Monitor,
			title: t("features.responsive.title"),
			description: t("features.responsive.desc"),
			color: "from-indigo-500 to-blue-500",
			bgColor:
				"bg-gradient-to-br from-indigo-50 to-blue-500 dark:from-indigo-950/20 dark:to-blue-950/20",
		},
		{
			icon: Monitor,
			title: t("features.integrated.title"),
			description: t("features.integrated.desc"),
			color: "from-indigo-500 to-blue-500",
			bgColor:
				"bg-gradient-to-br from-indigo-50 to-blue-500 dark:from-indigo-950/20 dark:to-blue-950/20",
		},
	];

	const integrations = [
		{
			name: "Crunchyroll",
			description: t("integrations.crunchyroll.desc"),
			icon: "streamline-logos:crunchyroll-logo-block",
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
			name: "Groupshelf",
			description: t("integrations.export.desc"),
			icon: BookAIcon,
			badge: "Coming soon",
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
				"Create anime groups",
				"Community support",
			],
			cta: t("pricing.getstarted"),
			popular: false,
			color: "border-border",
		},
		{
			name: t("pricing.pro.name"),
			price: "$3.99",
			period: "month",
			description: t("pricing.pro.desc"),
			features: [
				"Up to 10 groups",
				"Up to 1000 channels",
				"Create subgroups",
				"Create anime groups",
				"Create new categories",
				"Share groups with others",
			],
			cta: t("pricing.getstarted"),
			popular: true,
			color: "border-primary shadow-lg shadow-primary/25",
		},
		{
			name: t("pricing.business.name"),
			price: "$9.99",
			period: "month",
			description: t("pricing.business.desc"),
			features: [
				"Everything from free",
				"Everything from pro",
				"Unlimited groups",
				"Unlimited channels",
				"Priority support",
				"Access to Groupshelf",
			],
			cta: t("pricing.getstarted"),
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
		<div className="min-h-screen bg-background relative">
			<TechBackground />

			<MainNavbar />

			{/* Hero Section */}
			<section className="relative min-h-screen flex items-center overflow-hidden">
				{/* Background Elements */}
				<div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 via-blue-50/30 to-indigo-50/50 dark:from-slate-950/50 dark:via-blue-950/30 dark:to-indigo-950/50"></div>
				<div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>
				<div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>

				<div className="container mx-auto px-4 relative w-full">
					<div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
						<div className="space-y-8">
							<div className="space-y-6">
								<Badge
									variant="outline"
									className="w-fit border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300 font-mono"
								>
									<Rocket className="mr-2 h-3 w-3" />
									{t("hero.badge")}
								</Badge>
								<h1 className="text-4xl lg:text-7xl font-bold tracking-tight">
									{t("hero.title")
										.split("YouTube")
										.map((part, index) => {
											const key = `title-part-${index}`;
											return (
												<span key={key}>
													{part}
													{index === 0 && (
														<span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent font-mono">
															YouTube
														</span>
													)}
												</span>
											);
										})}
								</h1>
								<p className="text-xl lg:text-2xl text-muted-foreground max-w-[600px] leading-relaxed">
									{t("hero.subtitle")}
								</p>
							</div>

							<div className="flex flex-col sm:flex-row gap-4">
								<Button
									size="lg"
									variant="ghost"
									asChild
									className="h-12 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg shadow-blue-500/25 text-lg px-8 py-6 font-mono"
								>
									<Link to="/register">
										{t("hero.starttrial")}
										<ArrowRight className="ml-2 h-4 w-4" />
									</Link>
								</Button>
								<Button
									size="lg"
									variant="secondary"
									asChild
									className="h-10 text-lg px-8 py-6 hover:bg-accent font-mono"
								>
									<Link
										to="/"
										href="https://www.youtube.com/watch?v=A2UDaMMP0Uk"
									>
										<Play className="mr-2 h-4 w-4" />
										{t("hero.watchdemo")}
									</Link>
								</Button>
								<a style={{ height: '46px' }} target="_blank"  rel="noopener noreferrer" href="https://acidtools.com">
									<img src="https://acidtools.com/assets/images/badge-dark.png" style={{ height: '46px' }} alt="Acid Tools" />
								</a>
								
							</div>

							<div className="flex items-center gap-8 text-sm text-muted-foreground">
								<div className="flex items-center gap-2">
									<CheckCircle className="h-4 w-4 text-green-500" />
									<span className="font-mono">{t("hero.freetrial")}</span>
								</div>
								<div className="flex items-center gap-2">
									<CheckCircle className="h-4 w-4 text-green-500" />
									<span className="font-mono">{t("hero.nocreditcard")}</span>
								</div>
								<div className="flex items-center gap-2">
									<CheckCircle className="h-4 w-4 text-green-500" />
									<span className="font-mono">{t("hero.cancelanytime")}</span>
								</div>
							</div>

							{/* Stats */}
							<div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
								{stats.map((stat, index) => {
									const key = `stat-${stat.label}-${index}`;
									return (
										<div key={key} className="text-center">
											<div className="flex items-center justify-center mb-2">
												<stat.icon className="h-5 w-5 text-muted-foreground" />
											</div>
											<div className="text-2xl font-bold text-foreground font-mono">
												{stat.value}
											</div>
											<div className="text-sm text-muted-foreground font-mono">
												{stat.label}
											</div>
										</div>
									);
								})}
							</div>
						</div>

						<div className="relative">
							<div className="absolute -top-6 -right-6 h-32 w-32 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full blur-2xl animate-pulse"></div>
							<div className="absolute -bottom-6 -left-6 h-40 w-40 bg-gradient-to-br from-cyan-500/30 to-pink-500/30 rounded-full blur-2xl animate-pulse delay-1000"></div>
						</div>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section id={featuresId} className="py-20 lg:py-32">
				<div className="container mx-auto px-4">
					<div className="text-center space-y-4 mb-16">
						<Badge variant="outline" className="mb-4 font-mono">
							{t("features.badge")}
						</Badge>
						<h2 className="text-3xl lg:text-5xl font-bold font-mono">
							{t("features.title")}
						</h2>
						<p className="text-xl text-muted-foreground max-w-[600px] mx-auto">
							{t("features.subtitle")}
						</p>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{features.map((feature, index) => {
							const key = `feature-${feature.title}-${index}`;
							return (
								<Card
									key={key}
									className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden"
								>
									<div className={`h-2 ${feature.bgColor}`}></div>
									<CardHeader className="pb-4">
										<div
											className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
										>
											<feature.icon className="h-7 w-7 text-white" />
										</div>
										<CardTitle className="text-xl group-hover:text-primary transition-colors font-mono">
											{feature.title}
										</CardTitle>
									</CardHeader>
									<CardContent>
										<CardDescription className="text-base leading-relaxed">
											{feature.description}
										</CardDescription>
									</CardContent>
								</Card>
							);
						})}
					</div>
				</div>
			</section>

			{/* Integrations Section */}
			<section id={integrationsId} className="relative py-20 lg:py-32 bg-background overflow-hidden">
				{/* Optional grid background effect */}
				<div className="absolute inset-0 pointer-events-none bg-grid-small bg-muted/5"></div>

				<div className="relative container mx-auto px-4">
					{/* Header */}
					<div className="text-center space-y-4 mb-20">
						<Badge variant="secondary" className="mb-4 font-mono uppercase tracking-wide text-xs">
							{t("integrations.badge")}
						</Badge>
						<h2 className="text-4xl lg:text-5xl font-bold font-mono text-white">
							{t("integrations.title")}
						</h2>
						<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
							{t("integrations.subtitle")}
						</p>
					</div>

					{/* Cards Grid */}
					<div className="grid md:grid-cols-3 gap-10">
						{integrations.map((integration, index) => {
							const key = `integration-${integration.name}-${index}`;
							return (
								<Card
									key={key}
									className={cn(
										"group relative border border-white/10 bg-white/5 backdrop-blur-lg rounded-xl p-6 text-center transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl"
									)}
								>
									{/* Gradient top border */}
									<div
										className={cn(
											"h-1 rounded-full mb-6",
											"bg-gradient-to-r",
											integration.color
										)}
									/>

									{/* Icon */}
									<div className="mx-auto w-16 h-16 rounded-xl bg-muted/20 backdrop-blur-sm flex items-center justify-center mb-5 border border-white/10 group-hover:scale-110 transition-transform duration-300 shadow-sm">
										{typeof integration.icon === "string" ? (
											<IconViewer className="text-3xl" icon={integration.icon} />
										) : (
											<integration.icon className="h-8 w-8 text-white" />
										)}
									</div>

									{/* Title and Badge */}
									<div className="flex items-center justify-center gap-2 mb-2">
										<CardTitle className="text-lg font-mono text-white group-hover:text-primary transition-colors">
											{integration.name}
										</CardTitle>
										<Badge
											variant={
												integration.badge === "New"
													? "default"
													: integration.badge === "Coming soon"
														? "outline"
														: "secondary"
											}
											className="text-xs font-mono px-2 py-0.5"
										>
											{integration.badge}
										</Badge>
									</div>

									{/* Description */}
									<CardDescription className="text-sm text-muted-foreground">
										{integration.description}
									</CardDescription>
								</Card>
							);
						})}
					</div>
				</div>
			</section>

			{/* Testimonials Section */}
			<section id={testimonialsId} className="py-20 lg:py-32">
				<div className="container mx-auto px-4">
					<div className="text-center space-y-4 mb-16">
						<Badge variant="outline" className="mb-4 font-mono">
							{t("testimonials.badge")}
						</Badge>
						<h2 className="text-3xl lg:text-5xl font-bold font-mono">
							{t("testimonials.title")}
						</h2>
						<p className="text-xl text-muted-foreground max-w-[600px] mx-auto">
							{t("testimonials.subtitle")}
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8">
						{testimonials.map((testimonial, index) => {
							const key = `testimonial-${testimonial.name}-${index}`;
							return (
								<Card
									key={key}
									className="group hover:shadow-2xl transition-all duration-300 hover:scale-105 border-0 shadow-lg"
								>
									<CardHeader className="pb-4">
										<div className="flex items-center gap-4 mb-4">
											<div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
												<span className="text-lg font-medium text-white font-mono">
													{testimonial.name.charAt(0)}
												</span>
											</div>
											<div>
												<CardTitle className="text-base group-hover:text-primary transition-colors font-mono">
													{testimonial.name}
												</CardTitle>
												<CardDescription className="text-sm">
													{testimonial.role}
												</CardDescription>
												<CardDescription className="text-xs text-primary font-mono">
													{testimonial.company}
												</CardDescription>
											</div>
										</div>
										<div className="flex gap-1">
											{Array.from({ length: testimonial.rating }).map(
												(_, i) => (
													<Star
														key={`star-${testimonial.name}-${i}`}
														className="h-4 w-4 fill-yellow-400 text-yellow-400"
													/>
												),
											)}
										</div>
									</CardHeader>
									<CardContent>
										<p className="text-muted-foreground italic leading-relaxed">
											"{testimonial.content}"
										</p>
									</CardContent>
								</Card>
							);
						})}
					</div>
				</div>
			</section>

			{/* Pricing Section */}
			<section id={pricingId} className="py-20 lg:py-32 bg-muted/50">
				<div className="container mx-auto px-4">
					<div className="text-center space-y-4 mb-16">
						<Badge variant="outline" className="mb-4 font-mono">
							{t("pricing.badge")}
						</Badge>
						<h2 className="text-3xl lg:text-5xl font-bold font-mono">
							{t("pricing.title")}
						</h2>
						<p className="text-xl text-muted-foreground max-w-[600px] mx-auto">
							{t("pricing.subtitle")}
						</p>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
						{pricingPlans.map((plan, index) => (
							<Card
								key={plan.name}
								className={cn(
									"relative group hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden",
									"flex flex-col h-full",
									plan.color,
									plan.popular && "ring-2 ring-primary"
								)}
							>
								{/* Popular Badge */}
								{plan.popular && (
									<div className="absolute left-1/2 -translate-x-1/2">
										<Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg">
											{t("pricing.popular")}
										</Badge>
									</div>
								)}

								{/* Content */}
								<div className="flex-1 flex flex-col">
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
											<CardDescription className="mt-2">
												{plan.description}
											</CardDescription>
										</div>
									</CardHeader>

									<CardContent className="flex-1 space-y-6">
										<ul className="space-y-3">
											{plan.features.map((feature, i) => (
												<li
													key={`feature-${index}-${i}`}
													className="flex items-center gap-3"
												>
													<CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
													<span className="text-sm">{feature}</span>
												</li>
											))}
										</ul>
									</CardContent>
								</div>

								{/* Footer */}
								<CardFooter>
									<Button
										className={cn(
											"w-full text-base py-6",
											plan.popular
												? "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 shadow-lg shadow-red-500/25"
												: ""
										)}
										variant={plan.popular ? "default" : "outline"}
										asChild
									>
										<Link to="/register">
											{plan.cta}
											<ChevronRight className="ml-2 h-4 w-4" />
										</Link>
									</Button>
								</CardFooter>
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
								<Link to="/" href="https://www.youtube.com/watch?v=A2UDaMMP0Uk">
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
					<div className="grid md:grid-cols-3 gap-8">
						<div className="space-y-4">
							<div className="flex items-center gap-2">
								<Youtube className="h-6 w-6 text-red-500" />
								<span className="text-lg font-bold">Groupify</span>
							</div>
							<p className="text-muted-foreground text-sm">
								{t("footer.description")}
							</p>
							<div className="flex gap-4">
								<Link to="https://www.youtube.com/@scriptingarthur">
									<div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center hover:bg-muted-foreground/20 transition-colors cursor-pointer">
										<Youtube className="h-4 w-4" />
									</div>
								</Link>
								<Link to="https://discord.gg/Hp4MvPanwr">
									<div className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-muted-foreground/20 transition-colors cursor-pointer">
										<Icons.discord className="h-4 w-4" />
									</div>
								</Link>
								<div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center hover:bg-muted-foreground/20 transition-colors cursor-pointer">
									<Icons.gitHub className="h-4 w-4" />
								</div>
							</div>
						</div>

						<div className="space-y-4">
							<h3 className="font-semibold">{t("footer.support")}</h3>
							<ul className="space-y-2 text-sm text-muted-foreground">
								<li>
									<Link
										to="https://discord.gg/Hp4MvPanwr"
										className="hover:text-foreground transition-colors hover:underline"
									>
										Help Center
									</Link>
								</li>
								<li>
									<Link
										to="mailto:admin@groupify.dev"
										className="hover:text-foreground transition-colors hover:underline"
									>
										Contact
									</Link>
								</li>
								<li>
									<Link
										to="https://discord.gg/Hp4MvPanwr"
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
										to="/blog"
										className="hover:text-foreground transition-colors hover:underline"
									>
										Blog
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
						<p>&copy; 2025 Groupify. {t("footer.copyright")}</p>
					</div>
				</div>
			</footer>
		</div>
	);
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { MainNavbar } from "@/components/main-navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
	MessageSquare, 
	LifeBuoy, 
	Mail, 
	ExternalLink, 
	Github, 
	Sparkles, 
	Users, 
	ArrowRight,
	HelpCircle,
	ShieldCheck
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/_app/support/")({
	component: SupportPage,
});

function TechBackground() {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return <div className="absolute inset-0 overflow-hidden pointer-events-none" />;
	}

	return (
		<div className="absolute inset-0 overflow-hidden pointer-events-none">
			<div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] dark:bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)]" />
			<div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />
			<div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />
		</div>
	);
}

function SupportPage() {
	return (
		<div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
			<TechBackground />
			<MainNavbar />
			
			<main className="flex-1 container mx-auto px-4 py-20 relative z-10">
				<div className="max-w-4xl mx-auto space-y-16">
					{/* Hero Section */}
					<div className="text-center space-y-6">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
						>
							<Badge variant="outline" className="mb-4 py-1 px-4 border-blue-500/30 bg-blue-500/5 text-blue-500 font-mono">
								<LifeBuoy className="mr-2 h-3.5 w-3.5" />
								Help Center & Community
							</Badge>
							<h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
								How can we{" "}
								<span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
									help you
								</span>{" "}
								today?
							</h1>
							<p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
								Whether you're troubleshooting an issue or want to help us shape the future of YouTube organization, we're just a click away.
							</p>
						</motion.div>
					</div>

					{/* Discord Mega Card */}
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.5, delay: 0.2 }}
					>
						<Card className="relative overflow-hidden border-0 bg-gradient-to-br from-card to-card/50 shadow-2xl shadow-blue-500/5 ring-1 ring-white/10">
							<div className="absolute top-0 right-0 p-8 opacity-[0.03] rotate-12">
								<MessageSquare size={200} />
							</div>
							
							<div className="grid md:grid-cols-2">
								<div className="p-8 md:p-12 space-y-6">
									<div className="w-14 h-14 bg-[#5865F2] rounded-2xl flex items-center justify-center shadow-xl shadow-[#5865F2]/30">
										<MessageSquare className="text-white h-7 w-7" />
									</div>
									<div className="space-y-3">
										<h2 className="text-3xl font-bold tracking-tight">Join the Community</h2>
										<p className="text-muted-foreground leading-relaxed">
											Get instant help from our team and fellow Groupify users. Share your setup, suggest new features, and stay updated.
										</p>
									</div>
									<div className="flex flex-wrap gap-3">
										<Badge variant="secondary" className="bg-background/50 backdrop-blur-sm border-white/5 font-mono text-xs">
											<Users className="mr-1.5 h-3 w-3" /> 1k+ Members
										</Badge>
										<Badge variant="secondary" className="bg-background/50 backdrop-blur-sm border-white/5 font-mono text-xs">
											<Sparkles className="mr-1.5 h-3 w-3" /> Beta Access
										</Badge>
									</div>
									<Button 
										size="lg" 
										className="w-full sm:w-auto h-12 px-8 bg-[#5865F2] hover:bg-[#4752C4] text-white shadow-lg shadow-[#5865F2]/20 transition-all hover:scale-105"
										asChild
									>
										<a href="https://discord.gg/Hp4MvPanwr" target="_blank" rel="noreferrer">
											Open Discord
											<ExternalLink className="ml-2 h-4 w-4" />
										</a>
									</Button>
								</div>
								
								<div className="bg-muted/30 p-8 md:p-12 border-l border-white/5 flex flex-col justify-center gap-6">
									<div className="space-y-4">
										<div className="flex items-start gap-4">
											<div className="mt-1 w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
												<HelpCircle className="h-4 w-4" />
											</div>
											<div>
												<p className="font-semibold text-sm">Real-time Troubleshooting</p>
												<p className="text-xs text-muted-foreground">Direct access to our developers for quick fixes.</p>
											</div>
										</div>
										<div className="flex items-start gap-4">
											<div className="mt-1 w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500 shrink-0">
												<ShieldCheck className="h-4 w-4" />
											</div>
											<div>
												<p className="font-semibold text-sm">Priority Support</p>
												<p className="text-xs text-muted-foreground">Discord members get faster response times.</p>
											</div>
										</div>
										<div className="flex items-start gap-4">
											<div className="mt-1 w-8 h-8 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-500 shrink-0">
												<Sparkles className="h-4 w-4" />
											</div>
											<div>
												<p className="font-semibold text-sm">Feature Requests</p>
												<p className="text-xs text-muted-foreground">Vote on the next features we build.</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</Card>
					</motion.div>

					{/* Secondary Support Options */}
					<div className="grid md:grid-cols-2 gap-6">
						<motion.div
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5, delay: 0.4 }}
						>
							<Card className="h-full bg-card/50 backdrop-blur-sm border-white/5 hover:border-primary/20 transition-colors group">
								<CardHeader>
									<div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-2 group-hover:scale-110 transition-transform">
										<Mail className="h-5 w-5" />
									</div>
									<CardTitle>Email Support</CardTitle>
									<CardDescription className="text-sm leading-relaxed">
										Need a formal response? Send us an email and our support team will get back to you within 24 hours.
									</CardDescription>
								</CardHeader>
								<CardContent>
									<Button variant="ghost" className="w-full justify-between hover:bg-primary/10 group/btn" asChild>
										<a href="mailto:admin@groupify.dev">
											admin@groupify.dev
											<ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all" />
										</a>
									</Button>
								</CardContent>
							</Card>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5, delay: 0.4 }}
						>
							<Card className="h-full bg-card/50 backdrop-blur-sm border-white/5 hover:border-primary/20 transition-colors group">
								<CardHeader>
									<div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-2 group-hover:scale-110 transition-transform">
										<Github className="h-5 w-5" />
									</div>
									<CardTitle>Open Source</CardTitle>
									<CardDescription className="text-sm leading-relaxed">
										Our core extension is open source. Browse the code, report technical bugs, or contribute on GitHub.
									</CardDescription>
								</CardHeader>
								<CardContent>
									<Button variant="ghost" className="w-full justify-between hover:bg-primary/10 group/btn" asChild>
										<a href="https://github.com/ArthurBugan/groupify.extension" target="_blank" rel="noreferrer">
											View on GitHub
											<ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all" />
										</a>
									</Button>
								</CardContent>
							</Card>
						</motion.div>
					</div>
				</div>
			</main>

			<footer className="border-t py-12 bg-muted/30 relative z-10 mt-auto">
				<div className="container mx-auto px-4">
					<div className="flex flex-col md:flex-row justify-between items-center gap-6">
						<Link to="/" className="flex items-center gap-2 group">
							<div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold group-hover:rotate-12 transition-transform">
								G
							</div>
							<span className="text-xl font-bold font-mono tracking-tight">Groupify</span>
						</Link>
						<p className="text-sm text-muted-foreground">
							&copy; 2025 Groupify. All rights reserved.
						</p>
						<div className="flex gap-4">
							<a href="https://discord.gg/Hp4MvPanwr" className="text-muted-foreground hover:text-primary transition-colors">
								<MessageSquare className="h-5 w-5" />
							</a>
							<a href="https://github.com/groupify-app" className="text-muted-foreground hover:text-primary transition-colors">
								<Github className="h-5 w-5" />
							</a>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}

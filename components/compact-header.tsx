"use client";

import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSelector } from "./language-selector";

interface CompactHeaderProps {
	homeLink?: string;
	showGetStarted?: boolean;
}

export function CompactHeader({ homeLink = "/", showGetStarted = true }: CompactHeaderProps) {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container mx-auto px-4 h-12 flex items-center justify-between">
				<Link to={homeLink} className="flex items-center gap-2">
					<Youtube className="h-5 w-5 text-red-500" />
					<span className="font-semibold">Groupify</span>
				</Link>

				<div className="hidden md:flex items-center gap-6">
					<Link to="/dashboard" className="text-sm hover:text-foreground/80 transition-colors">Dashboard</Link>
					<a href="#features" className="text-sm hover:text-foreground/80 transition-colors">Features</a>
					<a href="#integrations" className="text-sm hover:text-foreground/80 transition-colors">Integrations</a>
					<a href="#pricing" className="text-sm hover:text-foreground/80 transition-colors">Pricing</a>
					<a href="#testimonials" className="text-sm hover:text-foreground/80 transition-colors">Reviews</a>
					<Link to="/blog" className="text-sm hover:text-foreground/80 transition-colors">Blog</Link>
				</div>

				<div className="hidden md:flex items-center gap-2">
					<LanguageSelector />
					<Button size="sm" variant="ghost" asChild>
							<Link to="/login">Login</Link>
						</Button>
						<Button size="sm" variant="ghost" asChild>
							<Link to="/register">Get Started</Link>
						</Button>
				</div>

				<Button
					variant="ghost"
					size="icon"
					className="md:hidden"
					onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
				>
					{mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
				</Button>
			</div>

			{mobileMenuOpen && (
				<div className="md:hidden border-t py-4">
					<div className="flex flex-col gap-2 px-4">
						<LanguageSelector />
						<Link to="/dashboard" className="text-sm hover:text-foreground/80 transition-colors">Dashboard</Link>
						<a href="#features" className="text-sm hover:text-foreground/80 transition-colors">Features</a>
						<a href="#integrations" className="text-sm hover:text-foreground/80 transition-colors">Integrations</a>
						<a href="#pricing" className="text-sm hover:text-foreground/80 transition-colors">Pricing</a>
						<a href="#testimonials" className="text-sm hover:text-foreground/80 transition-colors">Reviews</a>
						<Link to="/blog" className="text-sm hover:text-foreground/80 transition-colors">Blog</Link>
						{showGetStarted && (
							<Button size="sm" asChild className="bg-gradient-to-r from-red-500 to-pink-500 mt-2">
								<Link to="/register">Get Started</Link>
							</Button>
						)}
					</div>
				</div>
			)}
		</header>
	);
}

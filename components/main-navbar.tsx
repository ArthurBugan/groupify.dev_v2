"use client";

import { Link } from "@tanstack/react-router";
import { Menu, X, Youtube } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "./language-provider";
import { LanguageSelector } from "./language-selector";

export function MainNavbar() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const { t } = useLanguage();

	return (
		<nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
			<div className="container mx-auto px-4">
				<div className="flex h-16 items-center justify-between">
					<div className="flex items-center gap-2">
						<Link to="/" className="flex items-center gap-2">
							<div className="relative">
								<Youtube className="h-8 w-8 text-red-500" />
								<div className="absolute -top-1 -right-1 h-3 w-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse"></div>
							</div>
							<span className="text-xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
								Groupify
							</span>
						</Link>
					</div>

					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center gap-8">
						<Link
								to="/dashboard"
								className="text-sm font-medium hover:text-primary transition-colors group"
							>
								Dashboard
								<div className="h-0.5 w-0 bg-primary transition-all group-hover:w-full"></div>
							</Link>
						<Link
							to="/#features"
							className="text-sm font-medium hover:text-primary transition-colors group"
						>
							{t("nav.features")}
							<div className="h-0.5 w-0 bg-primary transition-all group-hover:w-full"></div>
						</Link>
						<Link
							to="/#integrations"
							className="text-sm font-medium hover:text-primary transition-colors group"
						>
							{t("nav.integrations")}
							<div className="h-0.5 w-0 bg-primary transition-all group-hover:w-full"></div>
						</Link>
						<Link
							to="/#pricing"
							className="text-sm font-medium hover:text-primary transition-colors group"
						>
							{t("nav.pricing")}
							<div className="h-0.5 w-0 bg-primary transition-all group-hover:w-full"></div>
						</Link>
						<Link
							to="/#testimonials"
							className="text-sm font-medium hover:text-primary transition-colors group"
						>
							{t("nav.reviews")}
							<div className="h-0.5 w-0 bg-primary transition-all group-hover:w-full"></div>
						</Link>
						<Link
							to="/blog"
							className="text-sm font-medium hover:text-primary transition-colors group"
						>
							Blog
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
								to="/#features"
								className="text-sm font-medium hover:text-primary transition-colors"
							>
								{t("nav.features")}
							</Link>
							<Link
								to="/#integrations"
								className="text-sm font-medium hover:text-primary transition-colors"
							>
								{t("nav.integrations")}
							</Link>
							<Link
								to="/#pricing"
								className="text-sm font-medium hover:text-primary transition-colors"
							>
								{t("nav.pricing")}
							</Link>
							<Link
								to="/#testimonials"
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
	);
}

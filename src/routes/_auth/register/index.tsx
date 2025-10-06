"use client";

import { createFileRoute, Link } from "@tanstack/react-router";
import { Eye, EyeOff } from "lucide-react";
import { useId, useState } from "react";
import { z } from "zod";
import { useLanguage } from "@/components/language-provider";
import { MainNavbar } from "@/components/main-navbar";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useRegisterMutation } from "@/hooks/mutations/useAuthMutations";

export const Route = createFileRoute("/_auth/register/")({
	component: RegisterPage,
});

// Discord OAuth configuration
const DISCORD_CLIENT_ID = import.meta.env.VITE_DISCORD_CLIENT_ID;
const DISCORD_REDIRECT_URI = import.meta.env.VITE_DISCORD_REDIRECT_URI;

function RegisterPage() {
	const { t } = useLanguage();
	const registerMutation = useRegisterMutation();
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		encryptedPassword: "",
		agreeToTerms: false,
	});
	const [errors, setErrors] = useState<Record<string, string>>({});

	// Create validation schema with translated messages
	const registerSchema = z
		.object({
			name: z
				.string()
				.min(1, { message: t("register.validation.name.required") })
				.min(2, { message: t("register.validation.name.min") }),
			email: z.email(),
			password: z
				.string()
				.min(1, { message: t("register.validation.password.required") })
				.min(6, { message: t("register.validation.password.min") }),
			encryptedPassword: z.string().min(1, {
				message: t("register.validation.encryptedPassword.required"),
			}),
			agreeToTerms: z.boolean().refine((val) => val === true, {
				message: "You must agree to the terms and conditions",
			}),
		})
		.refine((data) => data.password === data.encryptedPassword, {
			message: t("register.validation.encryptedPassword.match"),
			path: ["encryptedPassword"],
		});

	const handleInputChange = (field: string, value: string | boolean) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
		// Clear error when user starts typing
		if (errors[field]) {
			setErrors((prev) => ({ ...prev, [field]: "" }));
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setErrors({});

		try {
			const validatedData = registerSchema.parse(formData);

			// Use the register mutation
			await registerMutation.mutateAsync({
				name: validatedData.name,
				email: validatedData.email,
				password: validatedData.password,
				encryptedPassword: validatedData.encryptedPassword,
			});
		} catch (error) {
			if (error instanceof z.ZodError) {
				const newErrors: Record<string, string> = {};
				error.issues.forEach((err) => {
					if (err.path[0]) {
						newErrors[err.path[0] as string] = err.message;
					}
				});
				setErrors(newErrors);
			} else {
				console.error("Registration error:", error);
				setErrors({
					message: error?.message ?? "Registration failed. Please try again.",
				});
			}
		}
	};

	const handleDiscordAuth = () => {
		if (!DISCORD_CLIENT_ID) {
			console.error("Discord client ID not configured");
			setErrors({ general: "Discord authentication is not configured" });
			return;
		}

		// Generate a random state for security
		const state = Math.random().toString(36).substring(2, 15);
		localStorage.setItem("discord_oauth_state", state);

		// Build Discord OAuth URL
		const discordAuthUrl = new URL("https://discord.com/api/oauth2/authorize");
		discordAuthUrl.searchParams.set("client_id", DISCORD_CLIENT_ID);
		discordAuthUrl.searchParams.set("redirect_uri", DISCORD_REDIRECT_URI);
		discordAuthUrl.searchParams.set("response_type", "code");
		discordAuthUrl.searchParams.set("scope", "identify email");
		discordAuthUrl.searchParams.set("state", state);

		// Redirect to Discord OAuth
		window.location.href = discordAuthUrl.toString();
	};

	return (
		<div className="min-h-screen bg-background flex flex-col">
			<MainNavbar />

			<div className="flex-1 flex items-center justify-center p-4">
				<Card className="w-full max-w-md">
					<CardHeader className="space-y-1">
						<CardTitle className="text-2xl font-bold text-center">
							{t("register.title")}
						</CardTitle>
						<CardDescription className="text-center">
							{t("register.description")}
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<form onSubmit={handleSubmit} className="space-y-4">
							{errors.message && (
								<div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
									{errors.message}
								</div>
							)}

							<div className="space-y-2">
								<Label htmlFor="name">{t("register.name")}</Label>
								<Input
									id={useId()}
									type="text"
									placeholder={t("register.name.placeholder")}
									value={formData.name}
									onChange={(e) => handleInputChange("name", e.target.value)}
									className={errors.name ? "border-destructive" : ""}
								/>
								{errors.name && (
									<p className="text-sm text-destructive">{errors.name}</p>
								)}
							</div>

							<div className="space-y-2">
								<Label htmlFor="email">{t("register.email")}</Label>
								<Input
									id={useId()}
									type="email"
									placeholder={t("register.email.placeholder")}
									value={formData.email}
									onChange={(e) => handleInputChange("email", e.target.value)}
									className={errors.email ? "border-destructive" : ""}
								/>
								{errors.email && (
									<p className="text-sm text-destructive">{errors.email}</p>
								)}
							</div>

							<div className="space-y-2">
								<Label htmlFor="password">{t("register.password")}</Label>
								<div className="relative">
									<Input
										id={useId()}
										type={showPassword ? "text" : "password"}
										placeholder={t("register.password.placeholder")}
										value={formData.password}
										onChange={(e) =>
											handleInputChange("password", e.target.value)
										}
										className={
											errors.password ? "border-destructive pr-10" : "pr-10"
										}
									/>
									<button
										type="button"
										onClick={() => setShowPassword(!showPassword)}
										className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
									>
										{showPassword ? (
											<EyeOff className="h-4 w-4" />
										) : (
											<Eye className="h-4 w-4" />
										)}
									</button>
								</div>
								{errors.password && (
									<p className="text-sm text-destructive">{errors.password}</p>
								)}
							</div>

							<div className="space-y-2">
								<Label htmlFor="confirmPassword">
									{t("register.confirmpassword")}
								</Label>
								<div className="relative">
									<Input
										id={useId()}
										type={showConfirmPassword ? "text" : "password"}
										placeholder={t("register.confirmpassword.placeholder")}
										value={formData.encryptedPassword}
										onChange={(e) =>
											handleInputChange("encryptedPassword", e.target.value)
										}
										className={
											errors.confirmPassword
												? "border-destructive pr-10"
												: "pr-10"
										}
									/>
									<button
										type="button"
										onClick={() => setShowConfirmPassword(!showConfirmPassword)}
										className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
									>
										{showConfirmPassword ? (
											<EyeOff className="h-4 w-4" />
										) : (
											<Eye className="h-4 w-4" />
										)}
									</button>
								</div>
								{errors.confirmPassword && (
									<p className="text-sm text-destructive">
										{errors.confirmPassword}
									</p>
								)}
							</div>

							<div className="flex items-center space-x-2">
								<Checkbox
									id={"terms"}
									checked={formData.agreeToTerms}
									onCheckedChange={(checked) =>
										handleInputChange("agreeToTerms", checked as boolean)
									}
								/>
								<Label htmlFor="terms" className="text-sm">
									{t("register.terms")}{" "}
									<Link to="/terms" className="text-primary hover:underline">
										{t("register.terms.link")}
									</Link>{" "}
									{t("register.privacy")}{" "}
									<Link to="/privacy" className="text-primary hover:underline">
										{t("register.privacy.link")}
									</Link>
								</Label>
							</div>
							{errors.agreeToTerms && (
								<p className="text-sm text-destructive">
									{errors.agreeToTerms}
								</p>
							)}

							<Button
								type="submit"
								className="w-full"
								variant="destructive"
								disabled={registerMutation.isPending}
							>
								{registerMutation.isPending ? (
									<>
										<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
										{t("register.signing")}
									</>
								) : (
									t("register.signup")
								)}
							</Button>
						</form>

						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<Separator className="w-full" />
							</div>
							<div className="relative flex justify-center text-xs uppercase">
								<span className="bg-background px-2 text-muted-foreground">
									{t("register.or")}
								</span>
							</div>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<Button
								className="w-full flex items-center bg-white border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
								type="button"
								disabled={registerMutation.isPending}
							>
								<Icons.google className="mr-2 h-4 w-4" />
								{t("register.google")}
							</Button>
							<Button
								type="button"
								className="w-full flex items-center bg-white border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
								disabled={registerMutation.isPending}
								onClick={handleDiscordAuth}
							>
								<Icons.discord className="mr-2 h-4 w-4 text-white" />
								{t("register.discord")}
							</Button>
						</div>

						<div className="text-center text-sm">
							{t("register.hasaccount")}{" "}
							<Link to="/login" className="text-primary hover:underline">
								{t("register.signin")}
							</Link>
						</div>

						<div className="text-center">
							<Link
								to="/"
								className="text-sm text-muted-foreground hover:underline"
							>
								{t("register.backhome")}
							</Link>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

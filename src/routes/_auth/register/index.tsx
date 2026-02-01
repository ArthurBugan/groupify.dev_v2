"use client";

import { Checkbox } from "@base-ui/react/checkbox";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
	ArrowRight,
	Check,
	Eye,
	EyeOff,
	Lock,
	Mail,
	Sparkles,
	User,
} from "lucide-react";
import { useId, useState } from "react";
import { z } from "zod";
import { useLanguage } from "@/components/language-provider";
import { MainNavbar } from "@/components/main-navbar";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useRegisterMutation } from "@/hooks/mutations/useAuthMutations";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_auth/register/")({
	component: RegisterPage,
});

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

function RegisterPage() {
	const { t } = useLanguage();
	const registerMutation = useRegisterMutation();
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const termsId = useId();
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		encryptedPassword: "",
		agreeToTerms: false,
	});
	const [errors, setErrors] = useState<Record<string, string>>({});

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
				message: t("register.validation.confirmpassword.required"),
			}),
			agreeToTerms: z.boolean().refine((val) => val === true, {
				message: "You must agree to the terms and conditions",
			}),
		})
		.refine((data) => data.password === data.encryptedPassword, {
			message: t("register.validation.confirmpassword.match"),
			path: ["encryptedPassword"],
		});

	const handleInputChange = (field: string, value: string | boolean) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
		if (errors[field]) {
			setErrors((prev) => ({ ...prev, [field]: "" }));
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setErrors({});

		try {
			const validatedData = registerSchema.parse(formData);
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

	const handleDiscordAuth = (e: React.MouseEvent) => {
		e.preventDefault();
		window.location.href = `${VITE_BASE_URL}/auth/discord`;
	};

	const handleGoogleAuth = (e: React.MouseEvent) => {
		e.preventDefault();
		window.location.href = `${VITE_BASE_URL}/auth/google`;
	};

	return (
		<div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
			{/* Background decoration */}
			<div className="absolute inset-0 bg-gradient-to-br from-red-50/50 via-white to-pink-50/50 dark:from-red-950/20 dark:via-background dark:to-pink-950/20" />
			<div className="absolute top-0 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
			<div className="absolute bottom-0 left-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />

			<MainNavbar />

			<div className="flex-1 flex items-center justify-center px-4 py-12 relative">
				<div className="w-full max-w-md space-y-6">
					{/* Header */}
					<div className="text-center space-y-2">
						<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-500/10 to-pink-500/10 text-red-600 dark:text-red-400 text-sm font-medium mb-4">
							<Sparkles className="h-4 w-4" />
							<span>Join Groupify</span>
						</div>
						<h1 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
							{t("register.title")}
						</h1>
						<p className="text-muted-foreground">{t("register.description")}</p>
					</div>

					<Card className="border-none shadow-2xl shadow-red-500/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
						<CardContent className="pt-6">
							<form onSubmit={handleSubmit} className="space-y-5">
								{errors.message && (
									<div className="p-3 text-sm text-red-600 bg-red-500/10 border border-red-500/20 rounded-lg">
										{errors.message}
									</div>
								)}

								<div className="space-y-2">
									<Label htmlFor="name" className="text-sm font-medium">
										{t("register.name")}
									</Label>
									<div className="relative">
										<User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
										<Input
											type="text"
											placeholder={t("register.name.placeholder")}
											value={formData.name}
											onChange={(e) =>
												handleInputChange("name", e.target.value)
											}
											className={cn(
												"pl-10 h-12",
												errors.name &&
													"border-red-500 focus-visible:ring-red-500",
											)}
										/>
									</div>
									{errors.name && (
										<p className="text-sm text-red-600">{errors.name}</p>
									)}
								</div>

								<div className="space-y-2">
									<Label htmlFor="email" className="text-sm font-medium">
										{t("register.email")}
									</Label>
									<div className="relative">
										<Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
										<Input
											type="email"
											placeholder={t("register.email.placeholder")}
											value={formData.email}
											onChange={(e) =>
												handleInputChange("email", e.target.value)
											}
											className={cn(
												"pl-10 h-12",
												errors.email &&
													"border-red-500 focus-visible:ring-red-500",
											)}
										/>
									</div>
									{errors.email && (
										<p className="text-sm text-red-600">{errors.email}</p>
									)}
								</div>

								<div className="space-y-2">
									<Label htmlFor="password" className="text-sm font-medium">
										{t("register.password")}
									</Label>
									<div className="relative">
										<Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
										<Input
											type={showPassword ? "text" : "password"}
											placeholder={t("register.password.placeholder")}
											value={formData.password}
											onChange={(e) =>
												handleInputChange("password", e.target.value)
											}
											className={cn(
												"pl-10 pr-10 h-12",
												errors.password &&
													"border-red-500 focus-visible:ring-red-500",
											)}
										/>
										<Button
											type="button"
											variant="ghost"
											size="sm"
											className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
											onClick={() => setShowPassword(!showPassword)}
										>
											{showPassword ? (
												<EyeOff className="h-4 w-4 text-muted-foreground" />
											) : (
												<Eye className="h-4 w-4 text-muted-foreground" />
											)}
										</Button>
									</div>
									{errors.password && (
										<p className="text-sm text-red-600">{errors.password}</p>
									)}
								</div>

								<div className="space-y-2">
									<Label
										htmlFor="confirmPassword"
										className="text-sm font-medium"
									>
										{t("register.confirmpassword")}
									</Label>
									<div className="relative">
										<Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
										<Input
											type={showConfirmPassword ? "text" : "password"}
											placeholder={t("register.confirmpassword.placeholder")}
											value={formData.encryptedPassword}
											onChange={(e) =>
												handleInputChange("encryptedPassword", e.target.value)
											}
											className={cn(
												"pl-10 pr-10 h-12",
												errors.encryptedPassword &&
													"border-red-500 focus-visible:ring-red-500",
											)}
										/>
										<Button
											type="button"
											variant="ghost"
											size="sm"
											className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
											onClick={() =>
												setShowConfirmPassword(!showConfirmPassword)
											}
										>
											{showConfirmPassword ? (
												<EyeOff className="h-4 w-4 text-muted-foreground" />
											) : (
												<Eye className="h-4 w-4 text-muted-foreground" />
											)}
										</Button>
									</div>
									{errors.encryptedPassword && (
										<p className="text-sm text-red-600">
											{errors.encryptedPassword}
										</p>
									)}
								</div>

								<div className="flex items-start space-x-3 py-2">
									<Checkbox.Root
										id={termsId}
										checked={formData.agreeToTerms}
										onCheckedChange={(checked) =>
											handleInputChange("agreeToTerms", checked as boolean)
										}
										className={cn(
											"flex size-5 items-center justify-center rounded-md border-2 transition-colors mt-0.5",
											formData.agreeToTerms
												? "bg-gradient-to-r from-red-500 to-pink-500 border-red-500"
												: "border-gray-300 hover:border-red-400",
										)}
									>
										<Checkbox.Indicator className="flex text-white">
											<Check className="h-3.5 w-3.5" />
										</Checkbox.Indicator>
									</Checkbox.Root>
									<Label
										htmlFor="terms"
										className="text-sm leading-relaxed cursor-pointer"
									>
										{t("register.terms")}{" "}
										<Link
											to="/terms"
											className="text-red-600 hover:text-red-700 dark:text-red-400 font-semibold"
										>
											{t("register.terms.link")}
										</Link>{" "}
										{t("register.privacy")}{" "}
										<Link
											to="/privacy"
											className="text-red-600 hover:text-red-700 dark:text-red-400 font-semibold"
										>
											{t("register.privacy.link")}
										</Link>
									</Label>
								</div>
								{errors.agreeToTerms && (
									<p className="text-sm text-red-600 -mt-2">
										{errors.agreeToTerms}
									</p>
								)}

								<Button
									type="submit"
									className="w-full h-12 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white shadow-lg shadow-red-500/25"
									disabled={registerMutation.isPending}
								>
									{registerMutation.isPending ? (
										<>
											<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
											{t("register.signing")}
										</>
									) : (
										<>
											{t("register.signup")}
											<ArrowRight className="ml-2 h-4 w-4" />
										</>
									)}
								</Button>
							</form>

							<div className="relative my-6">
								<div className="absolute inset-0 flex items-center">
									<Separator className="w-full" />
								</div>
								<div className="relative flex justify-center text-xs uppercase">
									<span className="bg-white dark:bg-slate-900 px-2 text-muted-foreground">
										{t("register.or")}
									</span>
								</div>
							</div>

							<div className="grid grid-cols-2 gap-3">
								<Button
									type="button"
									onClick={handleGoogleAuth}
									variant="outline"
									className="h-11 border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
									disabled={registerMutation.isPending}
								>
									<Icons.google className="mr-2 h-4 w-4" />
									<span className="text-sm">{t("register.google")}</span>
								</Button>
								<Button
									type="button"
									onClick={handleDiscordAuth}
									variant="outline"
									className="h-11 border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
									disabled={registerMutation.isPending}
								>
									<Icons.discord className="mr-2 h-4 w-4" />
									<span className="text-sm">{t("register.discord")}</span>
								</Button>
							</div>
						</CardContent>

						<CardFooter className="flex flex-col space-y-4 pb-6">
							<div className="text-center text-sm">
								<span className="text-muted-foreground">
									{t("register.hasaccount")}
								</span>{" "}
								<Link
									to="/login"
									className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-semibold"
								>
									{t("register.signin")}
								</Link>
							</div>
						</CardFooter>
					</Card>
				</div>
			</div>
		</div>
	);
}

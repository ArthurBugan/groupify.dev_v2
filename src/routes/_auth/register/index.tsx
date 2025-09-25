"use client";

import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
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

export const Route = createFileRoute("/_auth/register/")({
	component: RegisterPage,
});

function RegisterPage() {
	const navigate = useNavigate();
	const { t } = useLanguage();
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
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
			confirmPassword: z
				.string()
				.min(1, { message: t("register.validation.confirmpassword.required") }),
			agreeToTerms: z.boolean().refine((val) => val === true, {
				message: "You must agree to the terms and conditions",
			}),
		})
		.refine((data) => data.password === data.confirmPassword, {
			message: t("register.validation.confirmpassword.match"),
			path: ["confirmPassword"],
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
		setIsLoading(true);
		setErrors({});

		try {
			const validatedData = registerSchema.parse(formData);

			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 2000));

			// Navigate to dashboard or login
			navigate({ to: "/dashboard" });
		} catch (error) {
			if (error instanceof z.ZodError) {
				const newErrors: Record<string, string> = {};
				error.issues.forEach((err) => {
					if (err.path[0]) {
						newErrors[err.path[0] as string] = err.message;
					}
				});
				setErrors(newErrors);
			}
		} finally {
			setIsLoading(false);
		}
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
								<Input
									id={useId()}
									type="password"
									placeholder={t("register.password.placeholder")}
									value={formData.password}
									onChange={(e) =>
										handleInputChange("password", e.target.value)
									}
									className={errors.password ? "border-destructive" : ""}
								/>
								{errors.password && (
									<p className="text-sm text-destructive">{errors.password}</p>
								)}
							</div>

							<div className="space-y-2">
								<Label htmlFor="confirmPassword">
									{t("register.confirmpassword")}
								</Label>
								<Input
									id={useId()}
									type="password"
									placeholder={t("register.confirmpassword.placeholder")}
									value={formData.confirmPassword}
									onChange={(e) =>
										handleInputChange("confirmPassword", e.target.value)
									}
									className={errors.confirmPassword ? "border-destructive" : ""}
								/>
								{errors.confirmPassword && (
									<p className="text-sm text-destructive">
										{errors.confirmPassword}
									</p>
								)}
							</div>

							<div className="flex items-center space-x-2">
								<Checkbox
									id={useId()}
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

							<Button type="submit" className="w-full" disabled={isLoading}>
								{isLoading ? (
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
							<Button variant="outline" type="button" disabled={isLoading}>
								<Icons.google className="mr-2 h-4 w-4" />
								{t("register.google")}
							</Button>
							<Button variant="outline" type="button" disabled={isLoading}>
								<Icons.gitHub className="mr-2 h-4 w-4" />
								{t("register.github")}
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

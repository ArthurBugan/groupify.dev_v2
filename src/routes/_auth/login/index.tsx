"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Eye, EyeOff, Github, Youtube } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useLanguage } from "@/components/language-provider";
import { MainNavbar } from "@/components/main-navbar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { type LoginCredentials, loginUser } from "@/hooks/useQuery/useAuth";

export const Route = createFileRoute("/_auth/login/")({
	component: LoginPage,
});

function LoginPage() {
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const { t } = useLanguage();

	// Zod schema for login form validation with translated messages
	const loginSchema = z.object({
		email: z
			.string()
			.min(1, t("login.validation.email.required"))
			.email(t("login.validation.email.invalid")),
		password: z
			.string()
			.min(1, t("login.validation.password.required"))
			.min(6, t("login.validation.password.min")),
	});

	type LoginFormData = z.infer<typeof loginSchema>;

	// React Hook Form with Zod validation
	const form = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	// TanStack Query mutation for login
	const loginMutation = useMutation({
		mutationFn: (credentials: LoginCredentials) => loginUser(credentials),
		onSuccess: (data) => {
			// Handle successful login
			console.log("Login successful:", data);

			// Store user data in localStorage or context
			localStorage.setItem("user", JSON.stringify(data.user));
			if (data.token) {
				localStorage.setItem("authToken", data.token);
			}

			navigate({ to: "/dashboard" });
		},
		onError: (error) => {
			// Handle login error
			console.error("Login failed:", error);
			form.setError("root", {
				type: "manual",
				message:
					error instanceof Error
						? error.message
						: "Login failed. Please try again.",
			});
		},
	});

	const onSubmit = (data: LoginFormData) => {
		loginMutation.mutate(data);
	};

	return (
		<div className="min-h-screen bg-muted/50">
			<MainNavbar />
			<div className="flex items-center justify-center p-4 pt-20">
				<div className="w-full max-w-md space-y-6">
					<div className="text-center space-y-2">
						<Link
							to="/"
							className="inline-flex items-center gap-2 text-2xl font-bold"
						>
							<Youtube className="h-8 w-8 text-red-500" />
							Groupify
						</Link>
						<p className="text-muted-foreground">{t("login.welcome")}</p>
					</div>

					<Card>
						<CardHeader>
							<CardTitle>{t("login.title")}</CardTitle>
							<CardDescription>{t("login.description")}</CardDescription>
						</CardHeader>
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)}>
								<CardContent className="space-y-4">
									{form.formState.errors.root && (
										<Alert variant="destructive">
											<AlertDescription>
												{form.formState.errors.root.message}
											</AlertDescription>
										</Alert>
									)}

									<FormField
										control={form.control}
										name="email"
										render={({ field }) => (
											<FormItem>
												<FormLabel>{t("login.email")}</FormLabel>
												<FormControl>
													<Input
														type="email"
														placeholder={t("login.email.placeholder")}
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="password"
										render={({ field }) => (
											<FormItem>
												<FormLabel>{t("login.password")}</FormLabel>
												<FormControl>
													<div className="relative">
														<Input
															type={showPassword ? "text" : "password"}
															placeholder={t("login.password.placeholder")}
															{...field}
														/>
														<Button
															type="button"
															variant="ghost"
															size="icon"
															className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
															onClick={() => setShowPassword(!showPassword)}
														>
															{showPassword ? (
																<EyeOff className="h-4 w-4" />
															) : (
																<Eye className="h-4 w-4" />
															)}
														</Button>
													</div>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<div className="flex items-center justify-between">
										<div className="text-sm">
											<Link
												to="/forgot-password"
												className="text-primary hover:underline"
											>
												{t("login.forgot")}
											</Link>
										</div>
									</div>
								</CardContent>
								<CardFooter className="flex flex-col space-y-4 mt-4">
									<Button
										type="submit"
										className="w-full"
										variant="destructive"
										disabled={loginMutation.isPending}
									>
										{loginMutation.isPending
											? t("login.signing")
											: t("login.signin")}
									</Button>

									<div className="relative">
										<div className="absolute inset-0 flex items-center">
											<Separator className="w-full" />
										</div>
										<div className="relative flex justify-center text-xs uppercase">
											<span className="bg-background px-2 text-muted-foreground">
												{t("login.or")}
											</span>
										</div>
									</div>

									<div className="grid grid-cols-2 gap-4">
										<Button variant="outline" type="button">
											<svg
												className="mr-2 h-4 w-4"
												viewBox="0 0 24 24"
												aria-hidden="true"
											>
												<path
													d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
													fill="#4285F4"
												/>
												<path
													d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
													fill="#34A853"
												/>
												<path
													d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
													fill="#FBBC05"
												/>
												<path
													d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
													fill="#EA4335"
												/>
											</svg>
											{t("login.google")}
										</Button>
										<Button variant="outline" type="button">
											<Github className="mr-2 h-4 w-4" />
											{t("login.github")}
										</Button>
									</div>

									<div className="text-center text-sm text-muted-foreground">
										{t("login.noaccount")}{" "}
										<Link to="/register" className="text-primary hover:underline">
											{t("login.signup")}
										</Link>
									</div>
								</CardFooter>
							</form>
						</Form>
					</Card>

					<div className="text-center">
						<Button variant="ghost" asChild>
							<Link to="/">
								<ArrowLeft className="mr-2 h-4 w-4" />
								{t("login.backhome")}
							</Link>
						</Button>
					</div>

					<div className="text-center text-sm text-muted-foreground">
						<p>{t("login.demo")}</p>
						<p>{t("login.demo.email")}</p>
						<p>{t("login.demo.password")}</p>
					</div>
				</div>
			</div>
		</div>
	);
}

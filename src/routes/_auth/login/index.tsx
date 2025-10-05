"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Eye, EyeOff } from "lucide-react";
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
import {
	type LoginCredentials,
	useLoginMutation,
} from "@/hooks/mutations/useAuthMutations";
import { Icons } from "@/components/ui/icons";

export const Route = createFileRoute("/_auth/login/")({
	component: LoginPage,
});

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

function LoginPage() {
	const [showPassword, setShowPassword] = useState(false);
	const { t } = useLanguage();

	const loginSchema = z.object({
		email: z.email(),
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

	const loginMutation = useLoginMutation();

	// Handle form submission
	const onSubmit = async (data: LoginFormData) => {
		try {
			await loginMutation.mutateAsync(data as LoginCredentials);
		} catch (error) {
			// Handle login error
			form.setError("root", {
				type: "manual",
				message:
					error
						? error.message
						: "Login failed. Please try again.",
			});
		}
	};

	// Handle Discord authentication
	const handleDiscordAuth = (e) => {
		e.preventDefault();
		window.location.href = `${VITE_BASE_URL}/auth/discord`;
	};

	function handleGoogleAuth(e) {
		e.preventDefault();
		window.location.href = `${VITE_BASE_URL}/auth/google`;
	}

	return (
		<div className="min-h-screen bg-background flex flex-col">
			<MainNavbar />
			<div className="flex-1 flex items-center justify-center px-4 py-12">
				<div className="w-full max-w-md space-y-8">
					<Card>
						<CardHeader className="space-y-1">
							<CardTitle className="text-2xl font-bold text-center">
								{t("login.title")}
							</CardTitle>
							<CardDescription className="text-center">
								{t("login.subtitle")}
							</CardDescription>
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
															size="sm"
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
								</CardContent>
								<CardFooter className="flex flex-col space-y-4">
									<Button
										type="submit"
										variant="secondary"
										className="w-full"
										disabled={loginMutation.isPending}
									>
										{loginMutation.isPending
											? t("login.signing")
											: t("login.signin")}
									</Button>
									<Button
										onClick={handleDiscordAuth}
										className="w-full flex items-center bg-white border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
									>
										<Icons.discord />
										<span>{t("login.discord")}</span>
									</Button>
									<Button
										onClick={handleGoogleAuth}
										className="w-full flex items-center bg-white border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
									>
										<Icons.google />
										<span>{t("login.google")}</span>
									</Button>
									<div className="flex items-center justify-between w-full text-sm">
										<Link
											to="/forgot-password"
											className="text-primary hover:underline"
										>
											{t("login.forgot")}
										</Link>
										<Link
											to="/register"
											className="text-primary hover:underline"
										>
											{t("login.signup")}
										</Link>
									</div>
								</CardFooter>
							</form>
						</Form>
					</Card>
				</div>
			</div>
		</div>
	);
}

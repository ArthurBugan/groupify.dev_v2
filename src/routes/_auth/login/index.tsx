"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Eye, EyeOff, Lock, Mail, Sparkles } from "lucide-react";
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
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
	type LoginCredentials,
	useLoginMutation,
} from "@/hooks/mutations/useAuthMutations";
import { cn } from "@/lib/utils";

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

	const form = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const loginMutation = useLoginMutation();

	const onSubmit = async (data: LoginFormData) => {
		try {
			await loginMutation.mutateAsync(data as LoginCredentials);
		} catch (error) {
			form.setError("root", {
				type: "manual",
				message: error ? error.message : "Login failed. Please try again.",
			});
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
			<div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
			<div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />

			<MainNavbar />

			<div className="flex-1 flex items-center justify-center px-4 py-12 relative">
				<div className="w-full max-w-md space-y-6">
					{/* Header */}
					<div className="text-center space-y-2">
						<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-500/10 to-pink-500/10 text-red-600 dark:text-red-400 text-sm font-medium mb-4">
							<Sparkles className="h-4 w-4" />
							<span>Welcome Back</span>
						</div>
						<h1 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
							{t("login.title")}
						</h1>
						<p className="text-muted-foreground">{t("login.subtitle")}</p>
					</div>

					<Card className="border-none shadow-2xl shadow-red-500/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
						<CardContent className="pt-6">
							<Form {...form}>
								<form
									onSubmit={form.handleSubmit(onSubmit)}
									className="space-y-5"
								>
									{form.formState.errors.root && (
										<Alert
											variant="destructive"
											className="border-red-500/50 bg-red-500/10"
										>
											<AlertDescription className="text-red-600 dark:text-red-400">
												{form.formState.errors.root.message}
											</AlertDescription>
										</Alert>
									)}

									<FormField
										control={form.control}
										name="email"
										render={({ field }) => (
											<FormItem className="space-y-2">
												<FormLabel className="text-sm font-medium">
													{t("login.email")}
												</FormLabel>
												<FormControl>
													<div className="relative">
														<Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
														<Input
															type="email"
															placeholder={t("login.email.placeholder")}
															className="pl-10 h-12"
															{...field}
														/>
													</div>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="password"
										render={({ field }) => (
											<FormItem className="space-y-2">
												<FormLabel className="text-sm font-medium">
													{t("login.password")}
												</FormLabel>
												<FormControl>
													<div className="relative">
														<Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
														<Input
															type={showPassword ? "text" : "password"}
															placeholder={t("login.password.placeholder")}
															className="pl-10 pr-10 h-12"
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
																<EyeOff className="h-4 w-4 text-muted-foreground" />
															) : (
																<Eye className="h-4 w-4 text-muted-foreground" />
															)}
														</Button>
													</div>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<div className="flex items-center justify-between text-sm">
										<Link
											to="/forgot-password"
											className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium"
										>
											{t("login.forgot")}
										</Link>
									</div>

									<Button
										type="submit"
										className="w-full h-12 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white shadow-lg shadow-red-500/25"
										disabled={loginMutation.isPending}
									>
										{loginMutation.isPending ? (
											<>
												<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
												{t("login.signing")}
											</>
										) : (
											<>
												{t("login.signin")}
												<ArrowRight className="ml-2 h-4 w-4" />
											</>
										)}
									</Button>
								</form>
							</Form>

							<div className="relative my-6">
								<div className="absolute inset-0 flex items-center">
									<Separator className="w-full" />
								</div>
								<div className="relative flex justify-center text-xs uppercase">
									<span className="bg-white dark:bg-slate-900 px-2 text-muted-foreground">
										{t("login.or")}
									</span>
								</div>
							</div>

							<div className="grid grid-cols-2 gap-3">
								<Button
									type="button"
									onClick={handleGoogleAuth}
									variant="outline"
									className="h-11 border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
									disabled={loginMutation.isPending}
								>
									<Icons.google className="mr-2 h-4 w-4" />
									<span className="text-sm">{t("login.google")}</span>
								</Button>
								<Button
									type="button"
									onClick={handleDiscordAuth}
									variant="outline"
									className="h-11 border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
									disabled={loginMutation.isPending}
								>
									<Icons.discord className="mr-2 h-4 w-4" />
									<span className="text-sm">{t("login.discord")}</span>
								</Button>
							</div>
						</CardContent>

						<CardFooter className="flex flex-col space-y-4 pb-6">
							<div className="text-center text-sm">
								<span className="text-muted-foreground">
									{t("login.noaccount")}
								</span>{" "}
								<Link
									to="/register"
									className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-semibold"
								>
									{t("login.signup")}
								</Link>
							</div>
						</CardFooter>
					</Card>
				</div>
			</div>
		</div>
	);
}

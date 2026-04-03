"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Eye, EyeOff, Lock, Mail, Sparkles } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useLanguage } from "@/components/language-provider";
import { CompactHeader } from "@/components/compact-header";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useLoginMutation, type LoginCredentials } from "@/hooks/mutations/useAuthMutations";

export const Route = createFileRoute("/_auth/login/")({
	component: LoginPage,
});

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

function LoginPage() {
	const [showPassword, setShowPassword] = useState(false);
	const { t } = useLanguage();
	const { mutateAsync: login, isPending } = useLoginMutation();

	const loginSchema = z.object({
		email: z.email(),
		password: z.string().min(1, t("login.validation.password.required")).min(6, t("login.validation.password.min")),
	});

	type LoginFormData = z.infer<typeof loginSchema>;

	const form = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		defaultValues: { email: "", password: "" },
	});

	const onSubmit = async (data: LoginFormData) => {
		try {
			await login(data as LoginCredentials);
		} catch (error) {
			form.setError("root", { type: "manual", message: error?.message || "Login failed." });
		}
	};

	const handleAuth = (provider: "google" | "discord") => {
		window.location.href = `${VITE_BASE_URL}/auth/${provider}`;
	};

	return (
		<div className="min-h-screen bg-background">
			<CompactHeader homeLink="/" showGetStarted={false} />

			<div className="flex-1 h-[calc(100vh-128px)] flex items-center justify-center px-4">
				<div className="w-full max-w-md">
					<div className="text-center mb-6 space-y-2">
						<div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50/50 border border-red-200 text-xs font-medium text-red-700 dark:bg-red-950/20 dark:border-red-800 dark:text-red-300">
							<Sparkles className="h-3 w-3" /> Welcome back
						</div>
						<h1 className="text-2xl font-bold tracking-tight">{t("login.title")}</h1>
						<p className="text-sm text-muted-foreground">{t("login.subtitle")}</p>
					</div>

					<div className="rounded-xl border bg-card shadow-sm">
						<div className="p-6 space-y-5">
							<Form {...form}>
								<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
									{form.formState.errors.root && (
										<Alert variant="destructive" className="border-red-500/30 bg-red-500/5 text-sm">
											<AlertDescription>{form.formState.errors.root.message}</AlertDescription>
										</Alert>
									)}

									<FormField control={form.control} name="email" render={({ field }) => (
										<FormItem className="space-y-1.5">
											<FormLabel className="text-sm font-medium">{t("login.email")}</FormLabel>
											<div className="relative">
												<Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
												<FormControl><Input type="email" placeholder={t("login.email.placeholder")} className="h-10 pl-9" {...field} /></FormControl>
											</div>
											<FormMessage />
										</FormItem>
									)} />

									<FormField control={form.control} name="password" render={({ field }) => (
										<FormItem className="space-y-1.5">
											<FormLabel className="text-sm font-medium">{t("login.password")}</FormLabel>
											<div className="relative">
												<Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
												<FormControl><Input type={showPassword ? "text" : "password"} placeholder={t("login.password.placeholder")} className="h-10 pl-9 pr-9" {...field} /></FormControl>
												<Button type="button" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3 hover:bg-transparent" onClick={() => setShowPassword(!showPassword)}>
													{showPassword ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
												</Button>
											</div>
											<FormMessage />
										</FormItem>
									)} />

									<div className="flex justify-end">
										<Link to="/forgot-password" className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 font-medium">{t("login.forgot")}</Link>
									</div>

									<Button type="submit" className="w-full h-10 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-sm shadow-md" disabled={isPending}>
										{isPending ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> : <div className="flex items-center">
											{t("login.signin")}
											<ArrowRight className="ml-2 h-4 w-4" />
										</div>
										}
									</Button>
								</form>
							</Form>

							<div className="relative">
								<div className="absolute inset-0 flex items-center"><Separator /></div>
								<div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-2 text-muted-foreground">{t("login.or")}</span></div>
							</div>

							<div className="grid grid-cols-2 gap-3">
								<Button type="button" variant="outline" size="sm" onClick={() => handleAuth("google")} disabled={isPending}><Icons.google className="mr-2 h-4 w-4" /> Google</Button>
								<Button type="button" variant="outline" size="sm" onClick={() => handleAuth("discord")} disabled={isPending}><Icons.discord className="mr-2 h-4 w-4" /> Discord</Button>
							</div>
						</div>

						<div className="px-6 py-4 border-t text-center">
							<p className="text-sm text-muted-foreground">{t("login.noaccount")} <Link to="/register" className="text-red-600 hover:text-red-700 dark:text-red-400 font-semibold">{t("login.signup")}</Link></p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

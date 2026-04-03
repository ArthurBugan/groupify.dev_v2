"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Eye, EyeOff, Lock, Mail, Sparkles, User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useLanguage } from "@/components/language-provider";
import { CompactHeader } from "@/components/compact-header";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { useRegisterMutation, type RegisterCredentials } from "@/hooks/mutations/useAuthMutations";

export const Route = createFileRoute("/_auth/register/")({
	component: RegisterPage,
});

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

function RegisterPage() {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const { t } = useLanguage();
	const { mutateAsync: register, isPending } = useRegisterMutation();

	const registerSchema = z.object({
		name: z.string().min(1, t("register.validation.name.required")).min(2, t("register.validation.name.min")),
		email: z.email(),
		password: z.string().min(1, t("register.validation.password.required")).min(6, t("register.validation.password.min")),
		confirmPassword: z.string().min(1, t("register.validation.confirmpassword.required")),
		agreeToTerms: z.boolean().refine((val) => val === true, "You must agree to the terms"),
	}).refine((data) => data.password === data.confirmPassword, {
		message: t("register.validation.confirmpassword.match"),
		path: ["confirmPassword"],
	});

	type RegisterFormData = z.infer<typeof registerSchema>;

	const form = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
		defaultValues: { name: "", email: "", password: "", confirmPassword: "", agreeToTerms: false },
	});

	const onSubmit = async (data: RegisterFormData) => {
		try {
			await register({
				name: data.name,
				email: data.email,
				password: data.password,
				encryptedPassword: data.confirmPassword,
			});
		} catch (error) {
			form.setError("root", { type: "manual", message: error?.message || "Registration failed." });
		}
	};

	const handleAuth = (provider: "google" | "discord") => {
		window.location.href = `${VITE_BASE_URL}/auth/${provider}`;
	};

	return (
		<div className="min-h-screen bg-background relative overflow-hidden">
			<CompactHeader showGetStarted={false} />
			<div className="absolute inset-0 -z-10">
				<div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-red-500/5 blur-3xl" />
				<div className="absolute bottom-[10%] left-[10%] w-[30%] h-[30%] rounded-full bg-pink-500/5 blur-3xl" />
			</div>

			<div className="flex min-h-[calc(100vh-120px)] items-center justify-center px-4 py-12">
				<div className="w-full max-w-sm">
					<div className="text-center mb-6 space-y-2">
						<div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50/50 border border-red-200 text-xs font-medium text-red-700 dark:bg-red-950/20 dark:border-red-800 dark:text-red-300">
							<Sparkles className="h-3 w-3" /> Join Groupify
						</div>
						<h1 className="text-2xl font-bold tracking-tight">{t("register.title")}</h1>
						<p className="text-sm text-muted-foreground">{t("register.description")}</p>
					</div>

					<div className="rounded-xl border bg-card shadow-sm">
						<div className="p-6 space-y-5">
							<Form {...form}>
								<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
									{form.formState.errors.root && (
										<div className="text-sm text-red-600 bg-red-500/10 border border-red-500/30 rounded-lg p-2.5">
											{form.formState.errors.root.message}
										</div>
									)}

									<FormField control={form.control} name="name" render={({ field }) => (
										<FormItem className="space-y-1.5">
											<FormLabel className="text-sm font-medium">{t("register.name")}</FormLabel>
											<div className="relative">
												<User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
												<FormControl><Input type="text" placeholder={t("register.name.placeholder")} className="h-10 pl-9" {...field} /></FormControl>
											</div>
											<FormMessage />
										</FormItem>
									)} />

									<FormField control={form.control} name="email" render={({ field }) => (
										<FormItem className="space-y-1.5">
											<FormLabel className="text-sm font-medium">{t("register.email")}</FormLabel>
											<div className="relative">
												<Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
												<FormControl><Input type="email" placeholder={t("register.email.placeholder")} className="h-10 pl-9" {...field} /></FormControl>
											</div>
											<FormMessage />
										</FormItem>
									)} />

									<FormField control={form.control} name="password" render={({ field }) => (
										<FormItem className="space-y-1.5">
											<FormLabel className="text-sm font-medium">{t("register.password")}</FormLabel>
											<div className="relative">
												<Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
												<FormControl><Input type={showPassword ? "text" : "password"} placeholder={t("register.password.placeholder")} className="h-10 pl-9 pr-9" {...field} /></FormControl>
												<Button type="button" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3 hover:bg-transparent" onClick={() => setShowPassword(!showPassword)}>
													{showPassword ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
												</Button>
											</div>
											<FormMessage />
										</FormItem>
									)} />

									<FormField control={form.control} name="confirmPassword" render={({ field }) => (
										<FormItem className="space-y-1.5">
											<FormLabel className="text-sm font-medium">{t("register.confirmpassword")}</FormLabel>
											<div className="relative">
												<Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
												<FormControl><Input type={showConfirmPassword ? "text" : "password"} placeholder={t("register.confirmpassword.placeholder")} className="h-10 pl-9 pr-9" {...field} /></FormControl>
												<Button type="button" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3 hover:bg-transparent" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
													{showConfirmPassword ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
												</Button>
											</div>
											<FormMessage />
										</FormItem>
									)} />

									<FormField control={form.control} name="agreeToTerms" render={({ field }) => (
										<div className="flex items-start gap-2 pt-1">
											<Checkbox checked={field.value} onCheckedChange={field.onChange} className="mt-0.5 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-red-500 data-[state=checked]:to-pink-500" />
											<label className="text-sm leading-relaxed cursor-pointer">
												{t("register.terms")} <Link to="/terms" className="text-red-600 hover:text-red-700 dark:text-red-400 font-semibold">{t("register.terms.link")}</Link> {t("register.privacy")} <Link to="/privacy" className="text-red-600 hover:text-red-700 dark:text-red-400 font-semibold">{t("register.privacy.link")}</Link>
											</label>
										</div>
									)} />

									<Button type="submit" className="w-full h-10 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-sm shadow-md" disabled={isPending}>
										{isPending ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> : t("register.signup")}<ArrowRight className="ml-2 h-4 w-4" />
									</Button>
								</form>
							</Form>

							<div className="relative">
								<div className="absolute inset-0 flex items-center"><div className="w-full border-t" /></div>
								<div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-2 text-muted-foreground">{t("register.or")}</span></div>
							</div>

							<div className="grid grid-cols-2 gap-3">
								<Button type="button" variant="outline" size="sm" onClick={() => handleAuth("google")} disabled={isPending}><Icons.google className="mr-2 h-4 w-4" /> Google</Button>
								<Button type="button" variant="outline" size="sm" onClick={() => handleAuth("discord")} disabled={isPending}><Icons.discord className="mr-2 h-4 w-4" /> Discord</Button>
							</div>
						</div>

						<div className="px-6 py-4 border-t text-center">
							<p className="text-sm text-muted-foreground">{t("register.hasaccount")} <Link to="/login" className="text-red-600 hover:text-red-700 dark:text-red-400 font-semibold">{t("register.signin")}</Link></p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

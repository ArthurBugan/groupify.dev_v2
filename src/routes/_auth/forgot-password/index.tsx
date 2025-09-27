"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import type React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useLanguage } from "@/components/language-provider";
import { MainNavbar } from "@/components/main-navbar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
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
import {
	type ForgotPasswordRequest,
	useForgotPasswordMutation,
} from "@/hooks/mutations/useAuthMutations";

export const Route = createFileRoute("/_auth/forgot-password/")({
	component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
	const { t } = useLanguage();
	const forgotPasswordSchema = z.object({
		email: z.email(),
	});

	type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

	// React Hook Form with Zod validation
	const form = useForm<ForgotPasswordFormData>({
		resolver: zodResolver(forgotPasswordSchema),
		defaultValues: {
			email: "",
		},
	});

	// Use the new forgot password mutation hook
	const forgotPasswordMutation = useForgotPasswordMutation();

	// Handle form submission
	const onSubmit = async (data: ForgotPasswordFormData) => {
		try {
			const requestData: ForgotPasswordRequest = {
				email: data.email,
				encrypted_password: "",
			};

			await forgotPasswordMutation.mutateAsync(requestData);
		} catch (error) {
			// Handle forgot password error
			form.setError("root", {
				type: "manual",
				message: error instanceof Error ? error.message : t("forgot.error"),
			});
		}
	};

	return (
		<div className="min-h-screen bg-background flex flex-col">
			<MainNavbar />
			<div className="flex-1 flex items-center justify-center px-4 py-12">
				<div className="w-full max-w-md space-y-8">
					<Card>
						<CardHeader className="space-y-1">
							<CardTitle className="text-2xl font-bold text-center">
								{t("forgot.title")}
							</CardTitle>
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
												<FormLabel>{t("forgot.email")}</FormLabel>
												<FormControl>
													<Input
														type="email"
														placeholder={t("forgot.email.placeholder")}
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</CardContent>
								<CardFooter className="flex flex-col space-y-4">
									<Button
										type="submit"
										variant="ghost"
										className="w-full mt-4"
										disabled={forgotPasswordMutation.isPending}
									>
										{forgotPasswordMutation.isPending
											? t("forgot.sending")
											: t("forgot.send")}
									</Button>
									<Button variant="ghost" className="w-full" asChild>
										<Link to="/login">
											<ArrowLeft className="mr-2 h-4 w-4" />
											{t("forgot.backsignin")}
										</Link>
									</Button>
								</CardFooter>
							</form>
						</Form>
					</Card>
				</div>
			</div>
		</div>
	);
}

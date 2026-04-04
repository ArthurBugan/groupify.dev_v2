"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Loader2, Lock } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { CompactHeader } from "@/components/compact-header";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { apiClient } from "@/hooks/api/api-client";

export const Route = createFileRoute("/_auth/forgot-password/confirm/$id/")({
	component: ForgotPasswordConfirmPage,
});

const resetPasswordSchema = z.object({
	password: z.string().min(6, "Password must be at least 6 characters"),
	password_confirmation: z
		.string()
		.min(6, "Password must be at least 6 characters"),
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

function ForgotPasswordConfirmPage() {
	const { id } = Route.useParams();
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const form = useForm<ResetPasswordFormData>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: {
			password: "",
			password_confirmation: "",
		},
	});

	const onSubmit = async (data: ResetPasswordFormData) => {
		if (data.password !== data.password_confirmation) {
			form.setError("password_confirmation", {
				type: "manual",
				message: "Passwords do not match",
			});
			return;
		}

		setIsPending(true);
		setError(null);

		try {
			await apiClient.post(`/forget-password/confirm/${id}`, {
				password: data.password,
				password_confirmation: data.password_confirmation,
			});

			toast.success("Password reset successfully");
			window.location.href = "/forgot-password/success/new-password";
		} catch (err: any) {
			setError(err.message || "Failed to reset password. Please try again.");
		} finally {
			setIsPending(false);
		}
	};

	return (
		<div className="min-h-screen bg-background">
			<CompactHeader homeLink="/" showGetStarted={false} />

			<div className="flex-1 h-[calc(100vh-128px)] flex items-center justify-center px-4">
				<div className="w-full max-w-md">
					<div className="text-center mb-6 space-y-2">
						<h1 className="text-2xl font-bold tracking-tight">
							Reset your password
						</h1>
						<p className="text-sm text-muted-foreground">
							Enter your new password to reset it.
						</p>
					</div>

					<div className="rounded-xl border bg-card shadow-sm">
						<div className="p-6 space-y-5">
							{error && (
								<Alert
									variant="destructive"
									className="border-red-500/30 bg-red-500/5 text-sm"
								>
									<AlertDescription>{error}</AlertDescription>
								</Alert>
							)}

							<Form {...form}>
								<form
									onSubmit={form.handleSubmit(onSubmit)}
									className="space-y-4"
								>
									<FormField
										control={form.control}
										name="password"
										render={({ field }) => (
											<FormItem className="space-y-1.5">
												<FormLabel className="text-sm font-medium">
													New Password
												</FormLabel>
												<div className="relative">
													<Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
													<FormControl>
														<Input
															type="password"
															placeholder="super secret"
															className="h-10 pl-9"
															{...field}
														/>
													</FormControl>
												</div>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="password_confirmation"
										render={({ field }) => (
											<FormItem className="space-y-1.5">
												<FormLabel className="text-sm font-medium">
													Confirm Password
												</FormLabel>
												<div className="relative">
													<Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
													<FormControl>
														<Input
															type="password"
															placeholder="super secret"
															className="h-10 pl-9"
															{...field}
														/>
													</FormControl>
												</div>
												<FormMessage />
											</FormItem>
										)}
									/>

									<Button
										type="submit"
										className="w-full h-10 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-sm shadow-md"
										disabled={isPending}
									>
										{isPending ? (
											<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										) : null}
										Reset password
									</Button>
								</form>
							</Form>

							<div className="text-center">
								<Link
									to="/login"
									className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 font-medium"
								>
									Back to sign in
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

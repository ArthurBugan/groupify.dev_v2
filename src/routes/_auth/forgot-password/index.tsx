"use client";

import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import type React from "react";
import { useId, useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/_auth/forgot-password/")({
	component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
	const { t } = useLanguage();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [email, setEmail] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError("");

		// Simulate API call
		try {
			await new Promise((resolve) => setTimeout(resolve, 1500));
			// Redirect to success page with email parameter
			window.location.href = `/forgot-password/success/${encodeURIComponent(email)}`;
		} catch (err) {
			setError(t("forgot.error"));
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-background">
			<MainNavbar />

			<div className="flex items-center justify-center bg-muted/50 p-4 min-h-[calc(100vh-4rem)]">
				<div className="w-full max-w-md space-y-6">
					<Card>
						<CardHeader className="text-center">
							<CardTitle className="text-2xl">{t("forgot.title")}</CardTitle>
							<CardDescription>{t("forgot.description")}</CardDescription>
						</CardHeader>
						<form onSubmit={handleSubmit}>
							<CardContent className="space-y-4">
								{error && (
									<Alert variant="destructive">
										<AlertDescription>{error}</AlertDescription>
									</Alert>
								)}
								<div className="space-y-2">
									<Label htmlFor="email">{t("forgot.email")}</Label>
									<Input
										id={useId()}
										type="email"
										placeholder={t("forgot.email.placeholder")}
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										required
									/>
								</div>
							</CardContent>
							<CardFooter className="flex flex-col space-y-3">
								<Button type="submit" className="w-full" disabled={isLoading}>
									{isLoading ? t("forgot.sending") : t("forgot.send")}
								</Button>
								<Button variant="ghost" className="w-full" asChild>
									<Link to="/login">
										<ArrowLeft className="mr-2 h-4 w-4" />
										{t("forgot.backsignin")}
									</Link>
								</Button>
							</CardFooter>
						</form>
					</Card>
				</div>
			</div>
		</div>
	);
}

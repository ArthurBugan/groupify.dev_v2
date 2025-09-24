"use client";

import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle, Mail, RefreshCw } from "lucide-react";
import { Suspense } from "react";
import { useLanguage } from "@/components/language-provider";
import { MainNavbar } from "@/components/main-navbar";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export const Route = createFileRoute("/_auth/forgot-password/success/$email/")({
	component: SuccessContent,
});

function SuccessContent() {
	const { email } = Route.useParams();
	const { t } = useLanguage();

	return (
		<div className="min-h-screen bg-background">
			<MainNavbar />

			<div className="flex items-center justify-center bg-muted/50 p-4 min-h-[calc(100vh-4rem)]">
				<div className="w-full max-w-md space-y-6">
					<Card>
						<CardHeader className="text-center">
							<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
								<CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
							</div>
							<CardTitle className="text-xl">
								{t("forgot.success.title")}
							</CardTitle>
							<CardDescription className="text-base">
								{t("forgot.success.description")} <br />
								<strong className="text-foreground">{email}</strong>
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="rounded-lg bg-muted p-6 text-center space-y-3">
								<Mail className="mx-auto h-10 w-10 text-muted-foreground" />
								<div className="space-y-2">
									<p className="font-medium">
										{t("forgot.success.next.title")}
									</p>
									<div className="text-sm text-muted-foreground space-y-1">
										<p>{t("forgot.success.next.step1")}</p>
										<p>{t("forgot.success.next.step2")}</p>
										<p>{t("forgot.success.next.step3")}</p>
									</div>
								</div>
							</div>

							<div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-950">
								<div className="flex items-start gap-3">
									<Mail className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
									<div className="text-sm">
										<p className="font-medium text-amber-800 dark:text-amber-200">
											{t("forgot.success.noemail.title")}
										</p>
										<p className="text-amber-700 dark:text-amber-300 mt-1">
											{t("forgot.success.noemail.description")}
										</p>
									</div>
								</div>
							</div>
						</CardContent>
						<CardFooter className="flex flex-col space-y-3">
							<Button variant="outline" className="w-full" asChild>
								<Link to="/forgot-password">
									<RefreshCw className="mr-2 h-4 w-4" />
									{t("forgot.success.resend")}
								</Link>
							</Button>
							<Button variant="ghost" className="w-full" asChild>
								<Link to="/login">
									<ArrowLeft className="mr-2 h-4 w-4" />
									{t("forgot.success.backsignin")}
								</Link>
							</Button>
						</CardFooter>
					</Card>
				</div>
			</div>
		</div>
	);
}

export default function ForgotPasswordSuccessPage() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<SuccessContent />
		</Suspense>
	);
}

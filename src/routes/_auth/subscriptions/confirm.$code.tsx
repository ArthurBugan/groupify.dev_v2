import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { CheckCircle2, Loader2, Mail, XCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useConfirmSubscriptionMutation } from "@/hooks/mutations/useAuthMutations";

export const Route = createFileRoute("/_auth/subscriptions/confirm/$code")({
	component: RouteComponent,
});

function RouteComponent() {
	const { code } = useParams({ from: "/_auth/subscriptions/confirm/$code" });
	const confirmMutation = useConfirmSubscriptionMutation();
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [_, setIsConfirmed] = useState(false);
	const hasRun = useRef(false);

	useEffect(() => {
		if (hasRun.current) return;
		const confirmSubscription = async () => {
			try {
				await confirmMutation.mutateAsync({ token: code });
				setIsConfirmed(true);
			} catch (err) {
				setError(err ? err.message : "Failed to confirm subscription");
			} finally {
				setIsLoading(false);
			}
		};

		hasRun.current = true;
		confirmSubscription();
	}, [code, confirmMutation.mutateAsync]);

	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-screen p-4">
				<Card className="w-full max-w-md bg-card border-border">
					<div className="p-8 md:p-12">
						<div className="relative flex justify-center mb-6">
							<div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center">
								<Mail className="w-10 h-10 text-red-500" />
							</div>
						</div>
						<div className="relative flex justify-center mb-6">
							<div className="rounded-full bg-red-500/10 flex items-center justify-center">
								<Loader2 className="w-8 h-8 text-red-500 animate-spin" />
							</div>
						</div>

						<div className="space-y-2 text-center">
							<h1 className="text-2xl font-semibold text-foreground">
								Confirming your email
							</h1>
							<p className="text-muted-foreground text-pretty">
								Please wait while we validate your confirmation link...
							</p>
						</div>

						<div className="flex gap-1 justify-center pt-4">
							<div className="w-2 h-2 rounded-full bg-red-500 animate-bounce [animation-delay:-0.3s]" />
							<div className="w-2 h-2 rounded-full bg-red-500 animate-bounce [animation-delay:-0.15s]" />
							<div className="w-2 h-2 rounded-full bg-red-500 animate-bounce" />
						</div>
					</div>
				</Card>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex items-center justify-center min-h-screen p-4">
				<Card className="w-full max-w-md bg-card border-border">
					<div className="p-8 md:p-12">
						<div className="flex justify-center mb-6">
							<div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center">
								<XCircle className="w-12 h-12 text-red-500" />
							</div>
						</div>

						<div className="space-y-2 text-center">
							<h1 className="text-2xl font-semibold text-foreground">
								Confirmation failed
							</h1>
							<p className="text-muted-foreground text-pretty">
								{error ||
									"We couldn't verify your email address. The link may have expired or is invalid."}
							</p>
						</div>
					</div>
				</Card>
			</div>
		);
	}

	return (
		<div className="flex items-center justify-center min-h-screen p-4">
			<Card className="w-full max-w-md bg-card border-border">
				<div className="p-8 md:p-12">
					<div className="flex justify-center mb-6">
						<div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center">
							<CheckCircle2 className="w-12 h-12 text-green-500" />
						</div>
					</div>

					<div className="space-y-2 text-center">
						<h1 className="text-2xl font-semibold text-foreground">
							Email confirmed!
						</h1>
						<p className="text-muted-foreground text-pretty">
							Your email has been successfully verified. You can now access all
							features of your account.
						</p>
					</div>

					<div className="mt-6">
						<Link to="/dashboard">
							<Button
								className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white"
								size="lg"
							>
								Continue to Dashboard
							</Button>
						</Link>
					</div>
				</div>
			</Card>
		</div>
	);
}

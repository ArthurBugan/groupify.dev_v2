"use client";

import { useEffect } from "react";
import { Check, CreditCard, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DodoPayments as DodoPaymentsCheckout } from "dodopayments-checkout";
import { useCreateCheckoutSession } from "@/hooks/mutations/usePaymentMutations";
import { Progress } from "@/components/ui/progress";
import { useUser } from "@/hooks/useQuery/useUser";
import { useDashboardTotal } from "@/hooks/useQuery/useDashboard";

export function BillingSettings() {
	const { data: user } = useUser();
	const { data: dashboardTotal, isLoading } = useDashboardTotal();
	const createCheckoutSessionMutation = useCreateCheckoutSession();

	useEffect(() => {
		DodoPaymentsCheckout.Initialize({ mode: "test", displayType: "overlay" });
	}, []);

	const currentPlan = user?.planName || "Free";
	const nextBillingDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", { month: "long", day: "numeric" });

	const usage = {
		groups: { used: dashboardTotal?.groups || 0, limit: user?.maxGroups || 3 },
		channels: { used: dashboardTotal?.channels || 0, limit: user?.maxChannels || 20 },
	};

	const plans = [
		{ name: "Free", price: "$0", current: currentPlan === "free", features: ["Up to 3 groups", "Up to 20 channels"] },
		{ name: "Basic", price: "$3.99", current: currentPlan.includes("Basic"), features: ["Up to 10 groups", "Up to 1,000 channels", "Subgroups", "Share groups"] },
		{ name: "Pro", price: "$9.99", current: currentPlan.includes("Pro"), features: ["Unlimited groups", "Unlimited channels", "Team collaboration", "Priority support"] },
	];

	return (
		<div className="space-y-4">
			{/* Current Plan */}
			<div className="rounded-xl border bg-card/50 backdrop-blur-sm p-4 space-y-3">
				<h2 className="font-semibold text-sm">Current Plan</h2>
				<div className="flex items-center justify-between">
					<div>
						<p className="text-lg font-bold">{user?.priceMonthly ? `$${user.priceMonthly}` : "$0"}</p>
						<p className="text-xs text-muted-foreground">Billed monthly • Next: {nextBillingDate}</p>
					</div>
					<Badge variant="outline">{currentPlan}</Badge>
				</div>
			</div>

			{/* Usage */}
			<div className="rounded-xl border bg-card/50 backdrop-blur-sm p-4 space-y-3">
				<h2 className="font-semibold text-sm mb-1">Usage</h2>
				
				{isLoading ? (
					<div className="space-y-2"><div className="h-4 w-full rounded bg-muted animate-pulse" /><div className="h-4 w-3/4 rounded bg-muted animate-pulse" /></div>
				) : (
					<>
						<div className="space-y-1.5">
							<div className="flex justify-between text-xs"><span>Groups</span><span>{usage.groups.used} / {usage.groups.limit}</span></div>
							<Progress value={(usage.groups.used / usage.groups.limit) * 100} />
						</div>

						<div className="space-y-1.5">
							<div className="flex justify-between text-xs"><span>Channels</span><span>{usage.channels.used} / {usage.channels.limit}</span></div>
							<Progress value={(usage.channels.used / usage.channels.limit) * 100} />
						</div>
					</>
				)}
			</div>

			{/* Plans */}
			<div className="space-y-3">
				<h2 className="font-semibold text-sm">Available Plans</h2>
				<div className="grid md:grid-cols-3 gap-3">
					{plans.map((plan) => (
						<div key={plan.name} className={`rounded-xl border p-4 ${plan.current ? "border-red-500/30 bg-red-500/5" : ""}`}>
							<div className="flex items-center justify-between mb-2">
								<h3 className="font-semibold text-sm">{plan.name}</h3>
								{plan.current && <Badge variant="secondary">Current</Badge>}
							</div>
							<p className="text-lg font-bold mb-3">{plan.price}<span className="text-xs text-muted-foreground">/mo</span></p>
							<ul className="space-y-1.5 mb-4"><li><Check className="h-3 w-3 mr-1 inline" /> Up to {plan.name === "Free" ? "3" : plan.name === "Basic" ? "10" : "Unlimited"} groups</li></ul>
							<Button size="sm" variant={plan.current ? "outline" : "secondary"} disabled={plan.current} onClick={() => createCheckoutSessionMutation.mutateAsync({ plan_name: plan.name, user_id: user?.id || "" })}>{plan.current ? "Current Plan" : "Change Plan"}</Button>
						</div>
					))}
				</div>
			</div>

			{/* History */}
			<div className="rounded-xl border bg-card/50 backdrop-blur-sm p-4">
				<h2 className="font-semibold text-sm mb-1">Billing History</h2>
				<Button size="sm" variant="secondary" onClick={() => window.open("https://gumroad.com/dashboard", "_blank")} className="w-full"><Download className="h-3.5 w-3.5 mr-1" /> View on Gumroad</Button>
			</div>
		</div>
	);
}

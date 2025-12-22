"use client";

import { Check, CreditCard, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useUser } from "@/hooks/useQuery/useUser";
import { useDashboardTotal } from "@/hooks/useQuery/useDashboard";

export function BillingSettings() {
	const { data: user } = useUser();
	const { data: dashboardTotal, isLoading } = useDashboardTotal();
	

	const currentPlan = user?.planName || "Free";
	const billingCycle = "monthly";
	const nextBillingDate =
		user?.subscriptionStartDate &&
		// add 1 month to this date
		new Date(
			new Date(user?.subscriptionStartDate).getTime() + 30 * 24 * 60 * 60 * 1000,
		).toLocaleDateString("en-US", {
			month: "long",
			day: "numeric",
			year: "numeric",
		});
	const usage = {
		groups: { used: dashboardTotal?.groups || 0, limit: user?.maxGroups || 0 },
		channels: { used: dashboardTotal?.channels || 0, limit: user?.maxChannels || 0 },
	};

	const plans = [
		{
			name: "Free",
			price: "$0",
			current: currentPlan === "free",
			features: [
				"Up to 3 groups",
				"Up to 20 channels",
				"Basic analytics",
				"1,000 API calls/month",
			],
		},
		{
			name: "Basic",
			price: "$3.99",
			current: currentPlan === "basic",
			features: [
				"Up to 10 groups",
				"Up to 1000 channels",
				"Create subgroups",
				"Create anime groups",
				"Create new categories",
				"Share groups with others",
			],
		},
		{
			name: "Pro",
			price: "$9.99",
			current: currentPlan === "pro",
			features: [
				"Everything from free",
				"Everything from pro",
				"Unlimited groups",
				"Unlimited channels",
				"Priority support",
				"Access to Groupshelf",
			],
		},
	];

	return (
		<div className="space-y-6">
			<Card>
				<CardHeader>
					<CardTitle>Current Plan</CardTitle>
					<CardDescription>
						You are currently on the {currentPlan} plan
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-2xl font-bold">
								{user?.priceYearly?.toLocaleString("en-US", {
									style: "currency",
									currency: "USD",
								})}
							</p>
							<p className="text-sm text-muted-foreground">
								Billed {billingCycle} • Next billing date: {nextBillingDate}
							</p>
						</div>
						<Badge variant="outline" className="text-lg px-3 py-1">
							{currentPlan}
						</Badge>
					</div>

					<div className="flex gap-2">
						<Button variant="outline">
							<CreditCard className="mr-2 h-4 w-4" />
							Update Payment Method
						</Button>
						<Button variant="outline">
							<Download className="mr-2 h-4 w-4" />
							Download Invoice
						</Button>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Usage</CardTitle>
					<CardDescription>
						Your current usage for this billing period
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="space-y-2">
						<div className="flex justify-between text-sm">
							<span>Groups</span>
							<span className="font-medium">
								{usage.groups.used} / {usage.groups.limit}
							</span>
						</div>
						<Progress value={usage.groups.limit === 0 ? 0 : (usage.groups.used / usage.groups.limit) * 100} />
					</div>

					<div className="space-y-2">
						<div className="flex justify-between text-sm">
							<span>Channels</span>
							<span className="font-medium">
								{usage.channels.used} / {usage.channels.limit}
							</span>
						</div>
						<Progress
							value={usage.channels.limit === 0 ? 0 : (usage.channels.used / usage.channels.limit) * 100}
						/>
					</div>
				</CardContent>
			</Card>

			<div className="space-y-4">
				<h3 className="text-lg font-semibold">Available Plans</h3>
				<div className="grid gap-4 md:grid-cols-3">
					{plans.map((plan) => (
						<Card
							key={plan.name}
							className={plan.current ? "border-primary" : ""}
						>
							<CardHeader>
								<div className="flex items-center justify-between">
									<CardTitle>{plan.name}</CardTitle>
									{plan.current && <Badge>Current</Badge>}
								</div>
								<CardDescription>
									<span className="text-2xl font-bold">{plan.price}</span>
									<span className="text-muted-foreground">/month</span>
								</CardDescription>
							</CardHeader>
							<CardContent>
								<ul className="space-y-2">
									{plan.features.map((feature) => (
										<li key={feature} className="flex items-center gap-2">
											<Check className="h-4 w-4 text-primary" />
											<span className="text-sm">{feature}</span>
										</li>
									))}
								</ul>
								<Button
									onClick={() => {
										window.open(`https://${plan.name.toLowerCase()}.groupify.dev`, "_blank");
									}}
									className="w-full mt-4"
									variant={plan.current ? "outline" : "secondary"}
									disabled={plan.current}
								>
									{plan.current
										? "Current Plan"
										: plan.name === "Free"
											? "Downgrade"
											: "Upgrade"}
								</Button>
							</CardContent>
						</Card>
					))}
				</div>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Billing History</CardTitle>
					<CardDescription>
						Your recent transactions and invoices
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-2">
						<div className="flex items-center justify-between py-2 border-b">
							<div>
								<p className="font-medium">Pro Plan - December 2023</p>
								<p className="text-sm text-muted-foreground">
									December 15, 2023
								</p>
							</div>
							<div className="flex items-center gap-2">
								<span className="font-medium">$9.00</span>
								<Button variant="ghost" size="sm">
									<Download className="h-4 w-4" />
								</Button>
							</div>
						</div>
						<div className="flex items-center justify-between py-2 border-b">
							<div>
								<p className="font-medium">Pro Plan - November 2023</p>
								<p className="text-sm text-muted-foreground">
									November 15, 2023
								</p>
							</div>
							<div className="flex items-center gap-2">
								<span className="font-medium">$9.00</span>
								<Button variant="ghost" size="sm">
									<Download className="h-4 w-4" />
								</Button>
							</div>
						</div>
						<div className="flex items-center justify-between py-2">
							<div>
								<p className="font-medium">Pro Plan - October 2023</p>
								<p className="text-sm text-muted-foreground">
									October 15, 2023
								</p>
							</div>
							<div className="flex items-center gap-2">
								<span className="font-medium">$9.00</span>
								<Button variant="ghost" size="sm">
									<Download className="h-4 w-4" />
								</Button>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

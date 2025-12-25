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
			current: currentPlan === "Groupify Basic Monthly",
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
			current: currentPlan === "Groupify Pro Monthly",
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

	if (isLoading) {
			return (
				<div className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle>Current Plan</CardTitle>
							<CardDescription>
								<div className="h-4 w-48 rounded bg-muted animate-pulse" />
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex items-center justify-between">
								<div>
									<div className="h-6 w-24 rounded bg-muted animate-pulse" />
									<div className="h-4 w-64 rounded bg-muted animate-pulse mt-2" />
								</div>
								<div className="h-8 w-24 rounded bg-muted animate-pulse" />
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Usage</CardTitle>
							<CardDescription>
								<div className="h-4 w-60 rounded bg-muted animate-pulse" />
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="space-y-2">
								<div className="flex justify-between text-sm">
									<span>Groups</span>
									<div className="h-4 w-20 rounded bg-muted animate-pulse" />
								</div>
								<div className="h-2 w-full rounded bg-muted animate-pulse" />
							</div>
							<div className="space-y-2">
								<div className="flex justify-between text-sm">
									<span>Channels</span>
									<div className="h-4 w-24 rounded bg-muted animate-pulse" />
								</div>
								<div className="h-2 w-full rounded bg-muted animate-pulse" />
							</div>
						</CardContent>
					</Card>

					<div className="space-y-4">
						<h3 className="text-lg font-semibold">Available Plans</h3>
						<div className="grid gap-4 md:grid-cols-3">
							{Array.from({ length: 3 }).map((_, i) => (
								<Card key={i} className="h-full flex flex-col">
									<CardHeader>
										<div className="flex items-center justify-between">
											<div className="h-6 w-24 rounded bg-muted animate-pulse" />
											<div className="h-6 w-16 rounded bg-muted animate-pulse" />
										</div>
										<CardDescription>
											<div className="h-6 w-20 rounded bg-muted animate-pulse" />
										</CardDescription>
									</CardHeader>
									<CardContent className="flex-1 flex flex-col">
										<ul className="space-y-2">
											{Array.from({ length: 3 }).map((_, j) => (
												<li key={j} className="flex items-center gap-2">
													<div className="h-4 w-4 rounded bg-muted animate-pulse" />
													<div className="h-4 w-40 rounded bg-muted animate-pulse" />
												</li>
											))}
										</ul>
										<div className="w-full h-10 rounded bg-muted animate-pulse mt-auto" />
									</CardContent>
								</Card>
							))}
						</div>
					</div>

					<Card>
						<CardHeader>
							<CardTitle>Billing History</CardTitle>
							<CardDescription>
								<div className="h-4 w-72 rounded bg-muted animate-pulse" />
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="w-full h-10 rounded bg-muted animate-pulse" />
						</CardContent>
					</Card>
				</div>
			);
		}

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
								{isLoading ? (
									<div className="h-6 w-24 rounded bg-muted animate-pulse" />
								) : (
									user?.priceMonthly?.toLocaleString("en-US", {
										style: "currency",
										currency: "USD",
									})
								)}
							</p>
							<p className="text-sm text-muted-foreground">
								{isLoading ? (
									<div className="mt-4 h-4 w-64 rounded bg-muted animate-pulse" />
								) : (
									<>Billed {billingCycle} • Next billing date: {nextBillingDate}</>
								)}
							</p>
						</div>
						<Badge variant="outline" className="text-lg px-3 py-1">
							{currentPlan}
						</Badge>
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
									{isLoading ? <div className="h-4 w-20 rounded bg-muted animate-pulse" /> : `${usage.groups.used} / ${usage.groups.limit}`}
								</span>
							</div>
							{isLoading ? (
								<div className="h-2 w-full rounded bg-muted animate-pulse" />
							) : (
								<Progress value={usage.groups.limit === 0 ? 0 : (usage.groups.used / usage.groups.limit) * 100} />
							)}
						</div>

					<div className="space-y-2">
							<div className="flex justify-between text-sm">
								<span>Channels</span>
								<span className="font-medium">
									{isLoading ? <div className="h-4 w-24 rounded bg-muted animate-pulse" /> : `${usage.channels.used} / ${usage.channels.limit}`}
								</span>
							</div>
							{isLoading ? (
								<div className="h-2 w-full rounded bg-muted animate-pulse" />
							) : (
								<Progress value={usage.channels.limit === 0 ? 0 : (usage.channels.used / usage.channels.limit) * 100} />
							)}
						</div>
				</CardContent>
			</Card>

			<div className="space-y-4">
				<h3 className="text-lg font-semibold">Available Plans</h3>
				<div className="grid gap-4 md:grid-cols-3">
					{plans.map((plan) => (
						<Card
							key={plan.name}
							className={`${plan.current ? "border-primary" : ""} h-full flex flex-col`}
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
							<CardContent className="flex-1 flex flex-col">
								<ul className="space-y-2 mb-4">
									{plan.features.map((feature) => (
										<li key={feature} className="flex items-center gap-2">
											<Check className="h-4 w-4 text-primary" />
											<span className="text-sm">{feature}</span>
										</li>
									))}
								</ul>
								<Button
									onClick={() => {
										window.open(`https://${plan.name.toLowerCase()}.groupify.dev?user_id=${user?.id}`, "_blank");
									}}
									className="w-full mt-auto"
									variant={plan.current ? "outline" : "secondary"}
									disabled={plan.current}
								>
									{plan.current ? "Current Plan" : "Change plan"}
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
						Check your billing history and download invoices on Gumroad
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Button
						onClick={() => {
							window.open("https://gumroad.com/dashboard", "_blank");
						}}
						className="w-full"
						variant="secondary"
					>
						View Billing History
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}

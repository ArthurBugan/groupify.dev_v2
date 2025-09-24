import {
	createFileRoute,
	Navigate,
	Outlet,
	useNavigate,
} from "@tanstack/react-router";

import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard-header";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
export const Route = createFileRoute("/_app/dashboard/settings")({
	component: SettingsPage,
});

function SettingsPage() {
	const [activeTab, setActiveTab] = useState("account");
	const router = useNavigate();

	return (
		<div className="space-y-6">
			<DashboardHeader
				title="Settings"
				description="Manage your account settings and preferences"
			/>

			<Tabs
				value={activeTab}
				onValueChange={setActiveTab}
				className="space-y-4"
			>
				<TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
					<TabsTrigger
						onClick={() => router({ to: "/dashboard/settings/account" })}
						value="account"
					>
						Account
					</TabsTrigger>
					<TabsTrigger
						onClick={() => router({ to: "/dashboard/settings/appearance" })}
						value="appearance"
					>
						Appearance
					</TabsTrigger>
					<TabsTrigger
						onClick={() => router({ to: "/dashboard/settings/integrations" })}
						value="integrations"
					>
						Integrations
					</TabsTrigger>
					<TabsTrigger
						onClick={() => router({ to: "/dashboard/settings/notifications" })}
						value="notifications"
					>
						Notifications
					</TabsTrigger>
					<TabsTrigger
						onClick={() => router({ to: "/dashboard/settings/groups" })}
						value="groups"
					>
						Groups
					</TabsTrigger>
					<TabsTrigger
						onClick={() => router({ to: "/dashboard/settings/billing" })}
						value="billing"
					>
						Billing
					</TabsTrigger>
				</TabsList>

				<Outlet />
			</Tabs>
		</div>
	);
}

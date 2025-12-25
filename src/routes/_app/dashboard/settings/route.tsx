import {
	createFileRoute,
	Outlet,
	useLocation,
	useNavigate,
} from "@tanstack/react-router";

import { useEffect, useState } from "react";
import { DashboardHeader } from "@/components/dashboard-header";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
export const Route = createFileRoute("/_app/dashboard/settings")({
	component: SettingsPage,
});

function SettingsPage() {
	const [activeTab, setActiveTab] = useState("account");
	const router = useNavigate();
	const location = useLocation();

	useEffect(() => {
		setActiveTab(location.pathname.split("/")[3]);
	}, [location.pathname]);

	

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
				<div className="overflow-x-auto">
					<TabsList className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground min-w-full lg:grid lg:grid-cols-4">
						<TabsTrigger
							onClick={() => router({ to: "/dashboard/settings/account" })}
							value="account"
							className="whitespace-nowrap"
						>
							Account
						</TabsTrigger>
						<TabsTrigger
							onClick={() => router({ to: "/dashboard/settings/appearance" })}
							value="appearance"
							className="whitespace-nowrap"
						>
							Appearance
						</TabsTrigger>
						{/* <TabsTrigger
							onClick={() =>
								router({ to: "/dashboard/settings/notifications" })
							}
							value="notifications"
							className="whitespace-nowrap"
						>
							Notifications
						</TabsTrigger> */}
						<TabsTrigger
							onClick={() => router({ to: "/dashboard/settings/groups" })}
							value="groups"
							className="whitespace-nowrap"
						>
							Groups
						</TabsTrigger>
						<TabsTrigger
							onClick={() => router({ to: "/dashboard/settings/billing" })}
							value="billing"
							className="whitespace-nowrap"
						>
							Billing
						</TabsTrigger>
					</TabsList>
				</div>

				<Outlet />
			</Tabs>
		</div>
	);
}

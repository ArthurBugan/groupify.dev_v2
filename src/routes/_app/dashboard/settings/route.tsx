import { createFileRoute, Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/_app/dashboard/settings")({
	component: SettingsPage,
});

function SettingsPage() {
	const [activeTab, setActiveTab] = useState("billing");
	const router = useNavigate();
	const location = useLocation();

	useEffect(() => {
		setActiveTab(location.pathname.split("/")[3]);
	}, [location.pathname]);

	return (
		<div className="space-y-4">
			<h1 className="text-xl font-semibold">Settings</h1>
			<p className="text-sm text-muted-foreground">Manage your preferences</p>

			<Tabs value={activeTab} onValueChange={(v) => router({ to: `/dashboard/settings/${v}` })} className="space-y-4">
				<TabsList className="grid grid-cols-4 w-full bg-muted/30">
					<TabsTrigger value="billing" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-600 data-[state=active]:to-pink-600">Billing</TabsTrigger>
					<TabsTrigger value="account" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-600 data-[state=active]:to-pink-600">Account</TabsTrigger>
					<TabsTrigger value="appearance" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-600 data-[state=active]:to-pink-600">Appearance</TabsTrigger>
					<TabsTrigger value="groups" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-600 data-[state=active]:to-pink-600">Groups</TabsTrigger>
				</TabsList>
				<Outlet />
			</Tabs>
		</div>
	);
}

import { createFileRoute, useParams, useSearch } from "@tanstack/react-router";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardStats } from "@/components/dashboard-stats";
import { GroupList } from "@/components/group-list";
import { RecentActivity } from "@/components/recent-activity";
import { RecommendationCards } from "@/components/recommendation-cards";
import { SharedGroupsOverview } from "@/components/shared-groups-overview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { z } from 'zod'
import { fallback, zodValidator } from '@tanstack/zod-adapter'
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { sendToBackgroundViaRelay } from "@plasmohq/messaging";

const dashboardParams = z.object({
	origin: fallback(z.string(), '').default(""),
})

export const Route = createFileRoute("/_app/dashboard/")({
	component: DashboardPage,
	validateSearch: zodValidator(dashboardParams),
})

function DashboardPage() {
	const { origin } = Route.useSearch();
	const [showPopup, setShowPopup] = useState(false);

	useEffect(() => {
		if (origin) {
			setShowPopup(true);
			(async () => {
				let decodedCookie = decodeURIComponent(document.cookie);
				let ca = decodedCookie.split(";");

				let token = ca.find((c) => c.includes("auth-token"))?.trim?.() || "";

				await sendToBackgroundViaRelay({
					extensionId: process.env.NEXT_PUBLIC_EXTENSION_ID,
					name: "save-auth" as never,
					body: {
						token: token,
					},
				});
			})();
		}
	}, [origin]);

	const handleClosePopup = () => {
		setShowPopup(false);
	};

	const handleOpenExtensionOptions = () => {
		window.open("chrome-extension://jbifilepodgklfkblilibnbbbncjphde/options.html", "_blank");
	};

	return (
		<div className="space-y-6">
			{showPopup && (
				<div className="fixed inset-0 bg-gray-900 bg-opacity-50 dark:bg-opacity-75 flex items-center justify-center z-50">
					<div className="bg-white bg-opacity-90 dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center dark:text-white">
						<h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
						<p className="mb-4">Your account has been successfully linked.</p>
						<Button
							onClick={handleOpenExtensionOptions}
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded dark:bg-blue-600 dark:hover:bg-blue-800"
						>
							Add user token to Groupify Extension
						</Button>
						<Button
							onClick={handleClosePopup}
							className="ml-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
						>
							Close
						</Button>
					</div>
				</div>
			)}
			<DashboardHeader
				title="Dashboard"
				description="Overview of your YouTube channel groups"
			/>
			<DashboardStats />

			<RecommendationCards />

			<Tabs defaultValue="groups" className="space-y-4">
				<TabsList>
					<TabsTrigger value="groups">Groups</TabsTrigger>
					<TabsTrigger value="shared">Shared With Me</TabsTrigger>
				</TabsList>
				<TabsContent value="groups" className="space-y-4">
					<div className="grid gap-6 md:grid-cols-2">
						<GroupList />
						<RecentActivity />
					</div>
				</TabsContent>
				<TabsContent value="shared" className="space-y-4">
					<SharedGroupsOverview />
				</TabsContent>
			</Tabs>
		</div>
	);
}

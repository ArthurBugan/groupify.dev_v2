import { createFileRoute } from "@tanstack/react-router";
import { NotificationSettings } from "@/components/settings/notification-settings";
import { TabsContent } from "@/components/ui/tabs";

export const Route = createFileRoute("/_app/dashboard/settings/notifications/")(
	{
		component: RouteComponent,
	},
);

function RouteComponent() {
	return (
		<TabsContent value="notifications" className="space-y-4">
			<NotificationSettings />
		</TabsContent>
	);
}

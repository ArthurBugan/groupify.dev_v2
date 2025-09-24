import { createFileRoute } from "@tanstack/react-router";
import { IntegrationSettings } from "@/components/settings/integration-settings";
import { TabsContent } from "@/components/ui/tabs";

export const Route = createFileRoute("/_app/dashboard/settings/integrations/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<TabsContent value="integrations" className="space-y-4">
			<IntegrationSettings />
		</TabsContent>
	);
}

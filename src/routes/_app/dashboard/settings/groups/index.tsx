import { createFileRoute } from "@tanstack/react-router";
import { GroupSettings } from "@/components/settings/group-settings";

export const Route = createFileRoute("/_app/dashboard/settings/groups/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <GroupSettings />;
}

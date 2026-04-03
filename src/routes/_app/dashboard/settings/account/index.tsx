import { createFileRoute } from "@tanstack/react-router";
import { AccountSettings } from "@/components/settings/account-settings";

export const Route = createFileRoute("/_app/dashboard/settings/account/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <AccountSettings />;
}

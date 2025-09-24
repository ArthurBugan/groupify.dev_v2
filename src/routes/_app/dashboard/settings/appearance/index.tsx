import { createFileRoute } from "@tanstack/react-router";
import { AppearanceSettings } from "@/components/settings/appearance-settings";
import { ThemeProvider } from "@/components/theme-provider";
import { TabsContent } from "@/components/ui/tabs";

export const Route = createFileRoute("/_app/dashboard/settings/appearance/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<TabsContent value="appearance" className="space-y-4">
			<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
				<AppearanceSettings />
			</ThemeProvider>
		</TabsContent>
	);
}

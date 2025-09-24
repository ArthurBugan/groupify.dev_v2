import { DataPrivacySettings } from "@/components/settings/data-privacy-settings";
import { TabsContent } from "@/components/ui/tabs";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/dashboard/settings/privacy/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <TabsContent value="data-privacy" className="space-y-4">
      <DataPrivacySettings />
    </TabsContent>
  );
}

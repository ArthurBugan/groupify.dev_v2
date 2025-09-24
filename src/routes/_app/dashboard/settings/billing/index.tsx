import { BillingSettings } from '@/components/settings/billing-settings'
import { TabsContent } from '@/components/ui/tabs'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/dashboard/settings/billing/')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <TabsContent value="billing" className="space-y-4">
            <BillingSettings />
        </TabsContent>
    )
}

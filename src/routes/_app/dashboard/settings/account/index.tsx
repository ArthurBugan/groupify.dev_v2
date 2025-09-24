import { AccountSettings } from '@/components/settings/account-settings'
import { TabsContent } from '@/components/ui/tabs'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/dashboard/settings/account/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <TabsContent value="account" className="space-y-4">
      <AccountSettings />
    </TabsContent>
  )
}

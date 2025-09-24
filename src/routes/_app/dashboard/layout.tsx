import { createFileRoute, Outlet } from "@tanstack/react-router";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export const Route = createFileRoute("/_app/dashboard")({
  component: DashboardLayout,
});

function DashboardLayout() {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1 p-6 pt-16 md:pt-6">
          <Outlet />
        </main>
      </SidebarProvider>
    </div>
  );
}

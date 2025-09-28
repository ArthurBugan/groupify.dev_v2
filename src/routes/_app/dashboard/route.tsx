import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";

export const Route = createFileRoute("/_app/dashboard")({
	component: DashboardLayout,
});

function DashboardLayout() {
	return (
		<SidebarProvider defaultOpen={true}>
			<div className="flex min-h-screen w-full">
				<AppSidebar />
				<SidebarInset className="flex-1 overflow-hidden">
					<header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 lg:hidden">
						<SidebarTrigger className="-ml-1" />
						<Separator orientation="vertical" className="mr-2 h-4" />
					</header>
					<main className="flex-1 overflow-auto p-6">
						<Outlet />
					</main>
				</SidebarInset>
			</div>
		</SidebarProvider>
	);
}

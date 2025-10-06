import { createFileRoute, Outlet, Link, useRouterState } from "@tanstack/react-router";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { Separator } from "@/components/ui/separator";
import React from "react";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const Route = createFileRoute("/_app/dashboard")({
	component: DashboardLayout,
});

function DashboardBreadcrumb() {
	const router = useRouterState();
	const pathname = router.location.pathname;
	
	// Generate breadcrumb items from current path
	const pathSegments = pathname.split('/').filter(Boolean);
	const breadcrumbItems = pathSegments.map((segment, index) => {
		const path = '/' + pathSegments.slice(0, index + 1).join('/');
		const isLast = index === pathSegments.length - 1;
		
		// Format segment name (capitalize and replace hyphens with spaces)
		const formattedName = segment
			.replace(/-/g, ' ')
			.replace(/\b\w/g, l => l.toUpperCase());
		
		return {
			name: formattedName,
			path: path,
			isLast: isLast,
		};
	});

	// Add dashboard as root if not already there
	if (breadcrumbItems.length === 0 || breadcrumbItems[0].name !== 'Dashboard') {
		breadcrumbItems.unshift({
			name: 'Dashboard',
			path: '/dashboard',
			isLast: breadcrumbItems.length === 0,
		});
	}

	return (
		<Breadcrumb>
			<BreadcrumbList>
				{breadcrumbItems.map((item, index) => (
					<React.Fragment key={item.path}>
						<BreadcrumbItem>
							{item.isLast ? (
								<BreadcrumbPage>{item.name}</BreadcrumbPage>
							) : (
								<BreadcrumbLink asChild>
									<Link to={item.path}>{item.name}</Link>
								</BreadcrumbLink>
							)}
						</BreadcrumbItem>
						{index < breadcrumbItems.length - 1 && <BreadcrumbSeparator />}
					</React.Fragment>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	);
}

function DashboardLayout() {
	return (
		<SidebarProvider defaultOpen={true}>
			<div className="flex min-h-screen w-full">
				<AppSidebar />
				<SidebarInset className="flex-1 overflow-hidden">
					<header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
						<SidebarTrigger className="-ml-1" />
						<Separator orientation="vertical" className="mr-2 h-4" />
						<DashboardBreadcrumb />
					</header>
					<main className="flex-1 overflow-auto p-6">
						<Outlet />
					</main>
				</SidebarInset>
			</div>
		</SidebarProvider>
	);
}

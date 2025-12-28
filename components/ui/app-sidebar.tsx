// biome-ignore assist/source/organizeImports: <explanation>
import {
	ChevronUp,
	FolderKanban,
	LayoutDashboard,
	Settings,
	User2,
	Video,
	Youtube,
} from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from "@/components/ui/sidebar";
import { Link, useNavigate } from "@tanstack/react-router";
import { useLogoutMutation } from "@/hooks/mutations/useUserMutations";

const items = [
	{
		title: "Dashboard",
		url: "/dashboard",
		icon: LayoutDashboard,
	},
	{
		title: "Groups",
		url: "/dashboard/groups",
		icon: FolderKanban,
	},
	{
		title: "Channels",
		url: "/dashboard/channels",
		icon: Youtube,
	},
	{
		title: "Animes",
		url: "/dashboard/animes",
		icon: Video,
	},
	{
		title: "Settings",
		url: "/dashboard/settings/account",
		icon: Settings,
	},
];

export function AppSidebar() {
	const logoutMutation = useLogoutMutation();
	const navigate = useNavigate();

	const signOut = () => {
		logoutMutation.mutateAsync();
	}

	return (
		<Sidebar variant="sidebar">
			<SidebarHeader className="cursor-pointer" onClick={() => navigate({ to: "/" })}>
				<Link to="/" className="flex items-center gap-4 ml-1">
					<div className="relative">
					<Youtube className="h-6 w-6 text-red-500" />
					<div className="absolute -top-1 -right-1 h-3 w-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse"></div>
				</div>
				<span className="text-xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
					Groupify
				</span>
			</Link>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarMenu>
						{items.map((item) => (
							<SidebarMenuItem key={item.title}>
								<SidebarMenuButton asChild>
									<a href={item.url}>
										<item.icon />
										<span>{item.title}</span>
									</a>
								</SidebarMenuButton>
							</SidebarMenuItem>
						))}
					</SidebarMenu>
				</SidebarGroup>
				<div className="mt-auto">
					<ins className="adsbygoogle"
						style={{ display: "inline-block", width: "255px", height: "300px" }}
						data-ad-client="ca-pub-4077364511521347"
						data-ad-slot="9387808543"></ins>
				</div>
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuButton>
									<User2 /> Username
									<ChevronUp className="ml-auto" />
								</SidebarMenuButton>
							</DropdownMenuTrigger>
							<DropdownMenuContent side="top" className="w-60">
								<DropdownMenuItem>
									<span>Account</span>
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => navigate({ to: "/dashboard/settings/billing" })}>
									<span>Billing</span>
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => signOut()}>
									<span>Sign out</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}

// biome-ignore assist/source/organizeImports: <explanation>
import {
	ChevronUp,
	FolderKanban,
	LayoutDashboard,
	Settings,
	Share2,
	User2,
	Video,
	Youtube,
	LogOut,
	CreditCard,
	UserCircle,
} from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from "@/components/ui/sidebar";
import { Link, useNavigate, useLocation } from "@tanstack/react-router";
import { useLogoutMutation } from "@/hooks/mutations/useUserMutations";
import { cn } from "@/lib/utils";
import { useUser } from "@/hooks/useQuery/useUser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface NavItem {
	title: string;
	url: string;
	icon: React.ElementType;
}

const mainItems: NavItem[] = [
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
		title: "Share Links",
		url: "/dashboard/share-links",
		icon: Share2,
	},
];

const secondaryItems: NavItem[] = [
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
	const location = useLocation();
	const { data: user } = useUser();

	const signOut = () => {
		logoutMutation.mutateAsync();
	};

	const isActive = (url: string) => {
		const currentPath = location.pathname;
		if (url === "/dashboard") {
			return currentPath === "/dashboard";
		}
		// Special case for settings - should be active for all settings subpages
		if (url.startsWith("/dashboard/settings")) {
			return currentPath.startsWith("/dashboard/settings");
		}
		return currentPath.startsWith(url);
	};

	return (
		<Sidebar variant="sidebar" collapsible="icon">
			<SidebarHeader className="border-b border-sidebar-border/50 p-4">
				<Link
					to="/"
					className="flex items-center gap-3 group transition-all duration-300 hover:scale-[1.02]"
				>
					<div className="relative">
						<div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg blur opacity-20 group-hover:opacity-40 transition-opacity" />
						<div className="relative bg-gradient-to-br from-red-500 to-pink-500 rounded-lg p-2 shadow-lg">
							<Youtube className="h-5 w-5 text-white" />
						</div>
					</div>
					<div className="flex flex-col">
						<span className="text-lg font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
							Groupify
						</span>
					</div>
				</Link>
			</SidebarHeader>

			<SidebarContent className="px-2 py-4 gap-6">
				{/* Main Navigation */}
				<SidebarGroup>
					<SidebarGroupLabel className="text-xs font-semibold text-muted-foreground/70 px-2 mb-1">
						Menu
					</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu className="gap-1">
							{mainItems.map((item) => {
								const active = isActive(item.url);
								return (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton
											asChild
											isActive={active}
											tooltip={item.title}
										>
											<Link
												to={item.url}
												className={cn(
													"group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
													active
														? "bg-gradient-to-r from-red-500/10 to-pink-500/10 text-red-600 dark:text-red-400 shadow-sm"
														: "text-muted-foreground hover:bg-accent hover:text-foreground",
												)}
											>
												<item.icon
													className={cn(
														"h-4 w-4 transition-all duration-200",
														active
															? "text-red-500"
															: "text-muted-foreground group-hover:text-foreground",
													)}
												/>
												<span>{item.title}</span>
												{active && (
													<div className="absolute left-0 w-1 h-6 bg-gradient-to-b from-red-500 to-pink-500 rounded-r-full" />
												)}
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								);
							})}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>

				{/* Secondary Navigation */}
				<SidebarGroup>
					<SidebarGroupLabel className="text-xs font-semibold text-muted-foreground/70 px-2 mb-1">
						Library
					</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu className="gap-1">
							{secondaryItems.map((item) => {
								const active = isActive(item.url);
								return (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton
											asChild
											isActive={active}
											tooltip={item.title}
										>
											<Link
												to={item.url}
												className={cn(
													"group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
													active
														? "bg-gradient-to-r from-red-500/10 to-pink-500/10 text-red-600 dark:text-red-400 shadow-sm"
														: "text-muted-foreground hover:bg-accent hover:text-foreground",
												)}
											>
												<item.icon
													className={cn(
														"h-4 w-4 transition-all duration-200",
														active
															? "text-red-500"
															: "text-muted-foreground group-hover:text-foreground",
													)}
												/>
												<span>{item.title}</span>
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								);
							})}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>

				{/* Ad Section */}
				<div className="mt-auto pt-4">
					<div className="rounded-lg overflow-hidden bg-muted/30 border border-sidebar-border/30">
						<ins className="adsbygoogle"
							style={{ display: "inline-block", width: "255px", height: "300px" }}
							data-ad-client="ca-pub-4077364511521347"
							data-ad-slot="9387808543"></ins>
					</div>
				</div>
			</SidebarContent>

			<SidebarFooter className="border-t border-sidebar-border/50 p-3">
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuButton className="w-full justify-start gap-3 px-3 py-2.5 h-auto hover:bg-accent rounded-lg transition-all">
									<Avatar className="h-8 w-8 border-2 border-background shadow-sm">
										<AvatarImage src={undefined} />
										<AvatarFallback className="bg-gradient-to-br from-red-500 to-pink-500 text-white text-xs font-semibold">
											{user?.username?.charAt(0).toUpperCase() ||
												user?.email?.charAt(0).toUpperCase() ||
												"U"}
										</AvatarFallback>
									</Avatar>
									<div className="flex flex-col items-start text-left flex-1 min-w-0">
										<span className="text-sm font-medium truncate w-full">
											{user?.username || user?.email || "User"}
										</span>
										<span className="text-xs text-muted-foreground truncate w-full">
											{user?.email || ""}
										</span>
									</div>
									<ChevronUp className="h-4 w-4 text-muted-foreground ml-auto shrink-0" />
								</SidebarMenuButton>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								side="top"
								className="w-[--radix-popper-anchor-width] min-w-56"
							>
								<div className="flex items-center gap-2 p-2">
									<Avatar className="h-8 w-8">
										<AvatarImage src={undefined} />
										<AvatarFallback className="bg-gradient-to-br from-red-500 to-pink-500 text-white text-xs font-semibold">
											{user?.username?.charAt(0).toUpperCase() ||
												user?.email?.charAt(0).toUpperCase() ||
												"U"}
										</AvatarFallback>
									</Avatar>
									<div className="flex flex-col">
										<p className="text-sm font-medium">
											{user?.username || user?.email || "User"}
										</p>
										<p className="text-xs text-muted-foreground">
											{user?.email || ""}
										</p>
									</div>
								</div>
								<DropdownMenuSeparator />
								<DropdownMenuItem
									onClick={() =>
										navigate({ to: "/dashboard/settings/account" })
									}
									className="gap-2 cursor-pointer"
								>
									<UserCircle className="h-4 w-4" />
									<span>Profile</span>
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={() =>
										navigate({ to: "/dashboard/settings/billing" })
									}
									className="gap-2 cursor-pointer"
								>
									<CreditCard className="h-4 w-4" />
									<span>Billing</span>
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem
									onClick={() => signOut()}
									className="gap-2 cursor-pointer text-destructive focus:text-destructive"
								>
									<LogOut className="h-4 w-4" />
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

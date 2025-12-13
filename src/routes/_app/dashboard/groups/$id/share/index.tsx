"use client";

import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
	ArrowLeft,
	Copy,
	LinkIcon,
	Share2,
	Users,
} from "lucide-react";
import { useEffect, useId, useState } from "react";
import { useGenerateShareLink } from "@/hooks/useQuery/useShare";
import { DashboardHeader } from "@/components/dashboard-header";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGroup } from "@/hooks/useQuery/useGroups";
import { useLanguage } from "@/components/language-provider";
import { toast } from "sonner";

interface ShareGroupPageProps {
	params: {
		id: string;
	};
}

export const Route = createFileRoute("/_app/dashboard/groups/$id/share/")({
	component: ShareGroupPage,
});

function ShareGroupPage({ params }: ShareGroupPageProps) {
	const router = useNavigate();
	const { t } = useLanguage();
	const { id } = Route.useParams();
	const { data: groupData, isLoading } = useGroup(id);

	const [activeTab, setActiveTab] = useState("collaborate");
	const [group, setGroup] = useState({
		id: id,
		name: "",
		description: "",
		category: "",
		channelCount: 0,
	});
	const [collaborators, setCollaborators] = useState<{
		id: string;
		name: string;
		email: string;
		avatar: string;
		role: string;
	}[]>([]);
	const [newCollaborator, setNewCollaborator] = useState("");
	const [shareLink, setShareLink] = useState("");
	const [linkCopied, setLinkCopied] = useState(false);
	const [sharePermission, setSharePermission] = useState("view");
	const [copyDestination, setCopyDestination] = useState("new");
	const generateShareLinkMutation = useGenerateShareLink();

	useEffect(() => {
		if (groupData) {
			setGroup({
				id: groupData.id ?? id,
				name: groupData.name ?? "",
				description: groupData.description ?? "",
				category: groupData.category ?? "",
				channelCount: groupData.channelCount ?? 0,
			});
		}
	}, [groupData, id]);

	const generateShareLink = async () => {
		generateShareLinkMutation.mutate({
			id: group.id,
			linkType: activeTab === "collaborate" ? sharePermission : "copy",
			permission: activeTab === "collaborate" ? sharePermission : "",
		}, {
			onSuccess: ({data}) => {
				setShareLink(data?.shareLink || "");
			},
			onError: (error) => {
				console.error("Error generating share link:", error);
			},
		});
	};

	const isGeneratingLink = generateShareLinkMutation.isPending;

	const copyLinkToClipboard = () => {
		navigator.clipboard.writeText(shareLink);
		setLinkCopied(true);
		setTimeout(() => setLinkCopied(false), 2000);
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<DashboardHeader
					title={groupData ? `Share "${group.name}"` : t("share_group_title")}
					description={t("share_group_description")}
				/>
				<Button variant="outline" size="sm" asChild>
					<Link to="..">
						<ArrowLeft className="mr-2 h-4 w-4" />
						{t("back_to_group")}
					</Link>
				</Button>
			</div>

			<div className="grid gap-6 md:grid-cols-3">
				<div className="md:col-span-2">
					<Tabs
						value={activeTab}
						onValueChange={(value) => {
							setActiveTab(value);
							setShareLink("");
						}}
						className="space-y-4"
					>
						<TabsList className="grid w-full grid-cols-2">
							<TabsTrigger value="collaborate">
								<Users className="mr-2 h-4 w-4" />
								{t("collaborate_tab_title")}
							</TabsTrigger>
							<TabsTrigger value="copy">
								<Copy className="mr-2 h-4 w-4" />
								{t("copy_group_tab_title")}
							</TabsTrigger>
						</TabsList>

						<TabsContent value="collaborate" className="space-y-4">
							<Card>
								<CardHeader>
									<CardTitle>{t("collaborate_invite_title")}</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="space-y-4">
										<div>
											<Label>{t("default_permission_title")}</Label>
											<RadioGroup
												value={sharePermission}
												onValueChange={setSharePermission}
												className="mt-2"
											>
												<div className="flex items-center space-x-2">
													<RadioGroupItem value="view" id={useId()} />
													<Label htmlFor="view">{t("perm_view")}</Label>
												</div>
												<div className="flex items-center space-x-2">
													<RadioGroupItem value="edit" id={useId()} />
													<Label htmlFor="edit">{t("perm_edit")}</Label>
												</div>
												<div className="flex items-center space-x-2">
													<RadioGroupItem value="admin" id={useId()} />
													<Label htmlFor="admin">{t("perm_admin")}</Label>
												</div>
											</RadioGroup>
										</div>
									</div>
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<CardTitle>{t("share_link_title")}</CardTitle>
									<CardDescription>
										{t("share_link_desc")}
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-4">
									{shareLink ? (
										<div className="space-y-2">
											<div className="flex gap-2">
												<Input value={shareLink} readOnly className="flex-1" />
												<Button
													variant="outline"
													size="sm"
													onClick={copyLinkToClipboard}
												>
													{linkCopied ? t("copied") : t("copy")}
												</Button>
											</div>
											<p className="text-sm text-muted-foreground">
												{t("join_as", {
													role: sharePermission,
												})}
											</p>
										</div>
									) : (
										<Button
											variant="outline"
											onClick={generateShareLink}
											disabled={isGeneratingLink}
										>
											<LinkIcon className="mr-2 h-4 w-4" />
											{isGeneratingLink ? t("generating") : t("generate_link")}
										</Button>
									)}
								</CardContent>
							</Card>
						</TabsContent>

						<TabsContent value="copy" className="space-y-4">
							<Card>
								<CardHeader>
									<CardTitle>{t("copy_link_title")}</CardTitle>
									<CardDescription>
										{t("copy_link_desc")}
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="space-y-4">
										<Alert>
											<Share2 className="h-4 w-4" />
											<AlertDescription>
												{t("copy_alert_desc", {
													count: String(group.channelCount),
												})}
											</AlertDescription>
										</Alert>

										{shareLink ? (
											<div className="space-y-2">
												<div className="flex gap-2">
													<Input
														value={shareLink}
														readOnly
														className="flex-1"
													/>
													<Button
														variant="outline"
														onClick={copyLinkToClipboard}
													>
														{linkCopied ? t("copied") : t("copy")}
													</Button>
												</div>
												<p className="text-sm text-muted-foreground">
													{t("copy_alert_info")}
												</p>
											</div>
										) : (
											<Button
												variant="outline"
												onClick={generateShareLink}
												disabled={isGeneratingLink}
											>
												<LinkIcon className="mr-2 h-4 w-4" />
												{isGeneratingLink ? t("generating") : t("generate_copy_link")}
											</Button>
										)}
									</div>
								</CardContent>
							</Card>
						</TabsContent>
					</Tabs>
				</div>

				<div>
					<Card className="sticky top-6">
						<CardHeader>
							<CardTitle>{t("group_details_title")}</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<div className="flex items-center justify-between">
									{isLoading ? (
										<div className="h-5 w-40 rounded bg-muted animate-pulse" />
									) : (
										<h3 className="font-medium">{group.name}</h3>
									)}
									{isLoading ? (
										<div className="h-5 w-20 rounded bg-muted animate-pulse" />
									) : (
										<Badge>{group.category}</Badge>
									)}
								</div>
								{isLoading ? (
									<div className="h-4 w-full rounded bg-muted animate-pulse" />
								) : (
									<p className="text-sm text-muted-foreground">
										{group.description}
									</p>
								)}
							</div>

							<Separator />

							<div className="space-y-2">
								<div className="flex justify-between">
									<span className="text-sm text-muted-foreground">
										{t("channels")}
									</span>
									{isLoading ? (
										<div className="h-4 w-10 rounded bg-muted animate-pulse" />
									) : (
										<span className="font-medium">{group.channelCount}</span>
									)}
								</div>
								<div className="flex justify-between">
									<span className="text-sm text-muted-foreground">
										{t("collaborators_label")}
									</span>
									<span className="font-medium">{collaborators.length}</span>
								</div>
							</div>

							<Separator />

							<div className="space-y-2">
								<h4 className="text-sm font-medium">{t("share_settings_title")}</h4>
								<p className="text-xs text-muted-foreground">
									{activeTab === "collaborate"
										? t("share_settings_collab", {
											permission:
												sharePermission,
										})
										: t("share_settings_copy", {
											destination:
												copyDestination,
										})}
								</p>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}

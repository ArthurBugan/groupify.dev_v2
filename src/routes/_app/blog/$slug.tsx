import { createFileRoute, Link } from "@tanstack/react-router";
import { CompactHeader } from "@/components/compact-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Clock, Share2, Twitter, Linkedin, ArrowLeft } from "lucide-react";
import { Markdown } from "@/components/mardown";

export const Route = createFileRoute("/_app/blog/$slug")({
	component: BlogPostComponent,
	loader: async ({ params }) => {
		const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
		const response = await fetch(`${VITE_BASE_URL}/api/v3/blog/${params.slug}`);
		if (!response.ok) throw new Error("Failed to fetch blog post");
		return { post: await response.json() };
	},
	head: ({ loaderData }) => ({
		meta: [
			{ title: loaderData?.post?.title || "Groupify Blog" },
			{ name: "description", content: loaderData?.post?.description || "" },
			{ property: "og:title", content: loaderData?.post?.title || "" },
			{ property: "og:description", content: loaderData?.post?.description || "" },
			{ property: "og:image", content: loaderData?.post?.image || "" },
			{ name: "twitter:card", content: "summary_large_image" },
			{ name: "twitter:title", content: loaderData?.post?.title || "" },
			{ name: "twitter:description", content: loaderData?.post?.description || "" },
			{ name: "twitter:image", content: loaderData?.post?.image || "" },
		],
	}),
});

function BlogPostComponent() {
	const { post } = Route.useLoaderData();

	return (
		<div className="min-h-screen bg-background">
			<CompactHeader />

			<article className="container mx-auto px-4 py-8 max-w-3xl">
				{/* Back */}
				<Link to="/blog" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-red-500 mb-6 transition-colors">
					<ArrowLeft className="h-3.5 w-3.5" /> Back to Blog
				</Link>

				{/* Header */}
				<header className="space-y-4 mb-8">
					<div className="flex items-center gap-2 flex-wrap">
						<Badge variant="outline" className="text-red-600 border-red-500/30 bg-red-500/5 text-xs uppercase tracking-wider">{post.category}</Badge>
						<span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readTime}</span>
					</div>

					<h1 className="text-3xl md:text-4xl font-bold leading-tight">{post.title}</h1>

					<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
						<div className="flex items-center gap-3">
							<div className="w-10 h-10 rounded-full bg-gradient-to-tr from-red-500 to-pink-500 flex items-center justify-center text-white font-bold uppercase">{post.author?.[0] || "A"}</div>
							<div>
								<p className="font-medium text-sm">{post.author}</p>
								<p className="text-xs text-muted-foreground">{new Date(post.date_created).toLocaleDateString()}</p>
							</div>
						</div>

						<div className="flex gap-2">
							<Button variant="outline" size="icon" className="h-8 w-8 rounded-full"><Twitter className="h-3.5 w-3.5" /></Button>
							<Button variant="outline" size="icon" className="h-8 w-8 rounded-full"><Linkedin className="h-3.5 w-3.5" /></Button>
							<Button variant="outline" size="icon" className="h-8 w-8 rounded-full"><Share2 className="h-3.5 w-3.5" /></Button>
						</div>
					</div>
				</header>

				{/* Hero Image */}
				<div className="mb-10 rounded-xl overflow-hidden shadow-lg">
					<img src={post.image} alt={post.title} className="w-full aspect-[21/9] object-cover" />
				</div>

				{/* Content */}
				<div className="prose prose-slate dark:prose-invert max-w-none mb-10">
					<Markdown content={post.content} className="prose" />
				</div>

				<Separator className="my-8" />

				{/* Author Bio */}
				<div className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border space-y-4">
					<h3 className="font-semibold text-sm mb-2">Written by {post.author}</h3>
					<p className="text-sm text-muted-foreground">Author of Groupify articles. Passionate about YouTube productivity and organization.</p>
				</div>
			</article>
		</div>
	);
}

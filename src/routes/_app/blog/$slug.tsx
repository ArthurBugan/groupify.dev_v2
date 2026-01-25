import { createFileRoute, Link } from "@tanstack/react-router";
import { MainNavbar } from "@/components/main-navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
    Clock, 
    Share2, 
    Twitter, 
    Linkedin,
    ArrowLeft,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Markdown } from "@/components/mardown";
import { useBlogPost } from "@/hooks/useQuery/useBlog";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;


export const Route = createFileRoute("/_app/blog/$slug")({
	component: BlogPostComponent,
    loader: async ({ params }) => {
        const response = await fetch(`${VITE_BASE_URL}/api/v3/blog/${params.slug}`);
        console.log(response)
        const post = await response.json();
        if (!response.ok) {
            throw new Error(post.message || 'Failed to fetch blog post');
        }
        return {post};
    },
     head: ({ loaderData }) => ({
        meta: [
        { title: loaderData?.post?.title || 'Groupify Blog' },
        { name: 'description', content: loaderData?.post?.description || 'Latest insights on productivity and YouTube tools' },
        // Open Graph
        { property: 'og:title', content: loaderData?.post?.title || 'Groupify Blog' },
        { property: 'og:description', content: loaderData?.post?.description || 'Latest insights on productivity and YouTube tools' },
        { property: 'og:image', content: loaderData?.post?.image || 'https://groupify.dev/og-image.png' },
        { property: 'og:type', content: 'article' },
        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: loaderData?.post?.title || 'Groupify Blog' },
        { name: 'twitter:description', content: loaderData?.post?.description || 'Latest insights on productivity and YouTube tools' },
        { name: 'twitter:image', content: loaderData?.post?.image || 'https://groupify.dev/og-image.png' },
        ],
  }),
});

function BlogPostComponent() {
    const { post } = Route.useLoaderData();
    const [layout, setLayout] = useState<LayoutType>("classic");

    return (
        <div className="min-h-screen bg-background pb-20">
            <MainNavbar />
            
            {/* Layout Switcher (Demo Only) */}
            <div className="container mx-auto px-4 pt-8 flex justify-end gap-2">
                <span className="text-xs text-muted-foreground self-center mr-2">Layout:</span>
                <Button 
                    variant={layout === "classic" ? "default" : "outline"} 
                    size="sm" 
                    onClick={() => setLayout("classic")}
                >
                    Classic
                </Button>
                <Button 
                    variant={layout === "focused" ? "default" : "outline"} 
                    size="sm" 
                    onClick={() => setLayout("focused")}
                >
                    Focused
                </Button>
                <Button 
                    variant={layout === "full" ? "default" : "outline"} 
                    size="sm" 
                    onClick={() => setLayout("full")}
                >
                    Full Width
                </Button>
            </div>
            
            <article className={cn(
                "container mx-auto px-4 pt-12 transition-all duration-500",
                layout === "focused" ? "max-w-3xl" : "max-w-6xl"
            )}>
                {/* Back to Blog */}
                <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
                    <ArrowLeft className="h-4 w-4" /> Back to Blog
                </Link>

                {/* Header */}
                <header className="mb-12">
                    <div className="flex items-center gap-3 mb-6">
                        <Badge variant="outline" className="text-red-500 border-red-500/20 bg-red-500/5 uppercase tracking-wider text-[10px] px-3">
                            {post.category}
                        </Badge>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                            <Clock className="h-4 w-4" /> {post.readTime}
                        </span>
                    </div>
                    
                    <h1 className={cn(
                        "font-bold mb-8 leading-tight",
                        layout === "focused" ? "text-4xl md:text-5xl" : "text-4xl md:text-6xl"
                    )}>
                        {post.title}
                    </h1>

                    <div className="flex flex-wrap items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-red-500 to-pink-500 flex items-center justify-center text-white font-bold uppercase">
                                {post.author?.[0] || "A"}
                            </div>
                            <div>
                                <div className="font-bold">{post.author}</div>
                                <div className="text-sm text-muted-foreground">{post.date}</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="icon" className="rounded-full h-10 w-10">
                                <Twitter className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" className="rounded-full h-10 w-10">
                                <Linkedin className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" className="rounded-full h-10 w-10">
                                <Share2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </header>

                {/* Hero Image */}
                {layout !== "focused" && (
                    <div className="mb-16 rounded-3xl overflow-hidden shadow-2xl">
                        <img 
                            src={post.image} 
                            alt={post.title} 
                            className="w-full aspect-[21/9] object-cover"
                        />
                    </div>
                )}

                {/* Content Area */}
                <div className={cn(
                    "grid gap-12",
                    layout === "classic" ? "lg:grid-cols-[1fr_300px]" : "grid-cols-1"
                )}>
                    {/* Main Content */}
                    <div>
                        <div className="prose prose-slate dark:prose-invert max-w-none">
                        <Markdown content={post.content} className="prose" />
                        </div>
                        
                        <Separator className="my-16" />
                        
                        {/* Author Bio */}
                        <div className="bg-accent/20 p-8 rounded-2xl border border-border">
                            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
                                <div className="h-20 w-20 rounded-full bg-gradient-to-tr from-red-500 to-pink-500 flex-shrink-0 flex items-center justify-center text-white text-3xl font-bold uppercase">
                                    {post.author?.[0] || "A"}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Written by {post.author}</h3>
                                    <p className="text-muted-foreground mb-4">
                                        Author of Groupify articles. Passionate about YouTube productivity.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar (Classic Layout Only) */}
                    {layout === "classic" && (
                        <aside className="space-y-12">
                            {/* Newsletter */}
                            <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                                <h4 className="font-bold mb-4">Stay updated</h4>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Get the latest tips and product updates delivered to your inbox.
                                </p>
                                <div className="space-y-3">
                                    <input 
                                        type="email" 
                                        placeholder="your@email.com"
                                        className="w-full px-4 py-2 rounded-lg border bg-background text-sm"
                                    />
                                    <Button className="w-full bg-red-500 hover:bg-red-600">Subscribe</Button>
                                </div>
                            </div>
                        </aside>
                    )}
                </div>
            </article>
        </div>
    );
}

type LayoutType = "classic" | "focused" | "full";
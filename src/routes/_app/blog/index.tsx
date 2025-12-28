import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MainNavbar } from "@/components/main-navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, Search, Tag, ChevronRight, User } from "lucide-react";
import { allPosts } from "content-collections";

export const Route = createFileRoute("/_app/blog/")({
	component: BlogIndex,
});

const CATEGORIES = ["All", "Product", "Engineering", "Design", "Community", "Tutorials"];

const POSTS = [
	{
		id: "1",
		slug: "getting-started-with-groupify",
		title: "Getting Started with Groupify: Organize Your YouTube Subscriptions",
		description: "Learn how to use Groupify to create custom groups for your YouTube channels and stay organized.",
		date: "Oct 24, 2023",
		readTime: "5 min read",
		category: "Tutorials",
		author: "Arthur",
		image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop",
		featured: true,
	},
	{
		id: "2",
		slug: "new-feature-ai-grouping",
		title: "Introducing AI-Powered Channel Grouping",
		description: "Our latest update uses AI to automatically categorize your subscriptions into smart groups.",
		date: "Nov 02, 2023",
		readTime: "3 min read",
		category: "Product",
		author: "Sarah",
		image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop",
		featured: false,
	},
	{
		id: "3",
		slug: "scaling-our-extension-architecture",
		title: "Scaling Our Extension Architecture to 100k Users",
		description: "A deep dive into how we optimized our background scripts and storage for performance.",
		date: "Nov 15, 2023",
		readTime: "8 min read",
		category: "Engineering",
		author: "Mike",
		image: "https://images.unsplash.com/photo-1551288049-bbbda546697a?q=80&w=1000&auto=format&fit=crop",
		featured: false,
	},
	{
		id: "4",
		slug: "designing-the-perfect-sidebar",
		title: "Designing the Perfect Sidebar for YouTube",
		description: "The challenges of building a UI that feels native to YouTube while adding powerful new features.",
		date: "Dec 05, 2023",
		readTime: "6 min read",
		category: "Design",
		author: "Elena",
		image: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?q=80&w=1000&auto=format&fit=crop",
		featured: false,
	},
];

function BlogIndex() {
	const [activeCategory, setActiveCategory] = useState("All");
	const [searchQuery, setSearchQuery] = useState("");
    console.log(allPosts)

	const filteredPosts = allPosts.filter((post) => {
		const matchesCategory = activeCategory === "All" || post.category === activeCategory;
		const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             post.description.toLowerCase().includes(searchQuery.toLowerCase());
		return matchesCategory && matchesSearch;
	});

	const featuredPost = allPosts.find(p => p.featured);
	const regularPosts = filteredPosts.filter(p => !p.featured || activeCategory !== "All" || searchQuery !== "");


	return (
		<div className="min-h-screen bg-background">
			<MainNavbar />
			
			<main className="container mx-auto px-4 py-12">
				{/* Hero Section */}
				<div className="text-center mb-16">
					<h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
						Groupify Blog
					</h1>
					<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
						Insights, updates, and tutorials from the team building the best way to organize your digital life.
					</p>
				</div>

				{/* Search and Filters */}
				<div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-12">
					<div className="flex flex-wrap gap-2 justify-center">
						{CATEGORIES.map((cat) => (
							<Button
								key={cat}
								variant={activeCategory === cat ? "default" : "outline"}
								onClick={() => setActiveCategory(cat)}
								className="rounded-full"
							>
								{cat}
							</Button>
						))}
					</div>
					<div className="relative w-full md:w-80">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
						<Input 
							placeholder="Search allPosts..." 
							className="pl-10"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</div>
				</div>

				{/* Featured Post */}
				{featuredPost && activeCategory === "All" && searchQuery === "" && (
					<div className="mb-16">
						<Link to={`/blog/$slug`} params={{ slug: featuredPost.slug }}>
							<Card className="overflow-hidden border-none bg-accent/30 hover:bg-accent/50 transition-colors cursor-pointer group">
								<div className="grid md:grid-cols-2 gap-0">
									<div className="relative aspect-video md:aspect-auto h-full overflow-hidden">
										<img 
											src={featuredPost.image} 
											alt={featuredPost.title}
											className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
										/>
										<div className="absolute top-4 left-4">
											<Badge className="bg-red-500 hover:bg-red-600">Featured</Badge>
										</div>
									</div>
									<div className="p-8 md:p-12 flex flex-col justify-center">
										<div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
											<span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {featuredPost.date}</span>
											<span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {featuredPost.readTime}</span>
										</div>
										<h2 className="text-3xl md:text-4xl font-bold mb-4 group-hover:text-primary transition-colors">
											{featuredPost.title}
										</h2>
										<p className="text-lg text-muted-foreground mb-6 line-clamp-3">
											{featuredPost.description}
										</p>
										<div className="flex items-center justify-between">
											<div className="flex items-center gap-2">
												<div className="h-8 w-8 rounded-full bg-gradient-to-tr from-red-500 to-pink-500 flex items-center justify-center text-white font-bold text-xs">
													{featuredPost.author[0]}
												</div>
												<span className="font-medium">{featuredPost.author}</span>
											</div>
											<span className="text-primary font-semibold flex items-center gap-1">
												Read More <ChevronRight className="h-4 w-4" />
											</span>
										</div>
									</div>
								</div>
							</Card>
						</Link>
					</div>
				)}

				{/* Post Grid */}
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
					{regularPosts.map((post) => (
						<Link key={post.id} to={`/blog/$slug`} params={{ slug: post.slug }}>
							<Card className="h-full flex flex-col border-none bg-card hover:shadow-xl transition-all duration-300 cursor-pointer group">
								<CardHeader className="p-0 overflow-hidden rounded-t-xl aspect-video">
									<img 
										src={post.image} 
										alt={post.title}
										className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
									/>
								</CardHeader>
								<CardContent className="p-6 flex-grow">
									<div className="flex items-center gap-2 mb-3">
										<Badge variant="secondary" className="font-normal">{post.category}</Badge>
										<span className="text-xs text-muted-foreground flex items-center gap-1">
											<Clock className="h-3 w-3" /> {post.readTime}
										</span>
									</div>
									<CardTitle className="text-xl mb-3 group-hover:text-primary transition-colors">
										{post.title}
									</CardTitle>
									<p className="text-muted-foreground line-clamp-2 text-sm">
										{post.description}
									</p>
								</CardContent>
								<CardFooter className="p-6 pt-0 flex justify-between items-center">
									<div className="flex items-center gap-2">
										<div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold">
											{post.author[0]}
										</div>
										<span className="text-sm font-medium">{post.author}</span>
									</div>
									<span className="text-xs text-muted-foreground">{post.date}</span>
								</CardFooter>
							</Card>
						</Link>
					))}
				</div>

				{filteredPosts.length === 0 && (
					<div className="text-center py-20">
						<p className="text-xl text-muted-foreground">No posts found matching your criteria.</p>
						<Button variant="link" onClick={() => {setActiveCategory("All"); setSearchQuery("");}}>
							Clear all filters
						</Button>
					</div>
				)}
			</main>
		</div>
	);
}

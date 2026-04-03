import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, Clock, Search, Sparkles, TrendingUp, X as CloseIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { CompactHeader } from "@/components/compact-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { type BlogQueryParams, useBlogPosts } from "@/hooks/useQuery/useBlog";
import { useLanguage } from "@/components/language-provider";

export const Route = createFileRoute("/_app/blog/")({
	component: BlogIndex,
});

const CATEGORIES = ["All", "Product", "Engineering", "Design", "Community", "Tutorials"];

function BlogIndex() {
	const [activeCategory, setActiveCategory] = useState("All");
	const [searchQuery, setSearchQuery] = useState("");
	const [debouncedSearch, setDebouncedSearch] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(9);
	const { t } = useLanguage();

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedSearch(searchQuery);
			setCurrentPage(1);
		}, 300);
		return () => clearTimeout(handler);
	}, [searchQuery]);

	const queryParams: BlogQueryParams = useMemo(() => ({
		status: "published",
		page: currentPage,
		limit: itemsPerPage,
		...(activeCategory !== "All" && { category: activeCategory }),
		...(debouncedSearch && { search: debouncedSearch }),
	}), [activeCategory, debouncedSearch, currentPage, itemsPerPage]);

	const { data: blogData, isLoading } = useBlogPosts(queryParams);
	const allPosts = blogData?.data || [];
	const totalPosts = blogData?.total || 0;
	const totalPages = Math.ceil(totalPosts / itemsPerPage);

	const featuredPost = useMemo(() => allPosts.find((p) => p.featured), [allPosts]);
	const regularPosts = useMemo(() => allPosts.filter((p) => !p.featured), [allPosts]);
	const trendingPosts = useMemo(() => allPosts.slice(0, 3), [allPosts]);

	return (
		<div className="min-h-screen bg-background">
			<CompactHeader />

			{/* Hero */}
			<section className="relative overflow-hidden py-16 md:py-24">
				<div className="absolute inset-0" />
				<div className="container mx-auto px-4 relative text-center">
					<Badge variant="secondary" className="gap-1 mb-6"><Sparkles className="h-3 w-3" /> Latest Updates</Badge>
					<h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">Groupify Blog</h1>
					<p className="text-lg text-muted-foreground max-w-xl mx-auto">{t("landing.hero.subtitle")}</p>
				</div>
			</section>

			{/* Sticky Filters */}
			<div className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/75 border-b py-3">
				<div className="container mx-auto px-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
					<div className="flex flex-wrap gap-2 w-full sm:w-auto">{CATEGORIES.map((cat) => (
						<Button key={cat} onClick={() => { setActiveCategory(cat); setCurrentPage(1); }} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activeCategory === cat ? "bg-gradient-to-r from-red-600 to-pink-600" : "hover:bg-muted/50"}`}><span className="text-white text-sm font-semibold">{cat}</span></Button>
					))}</div>
					<div className="relative w-full sm:w-64">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
						<Input placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 pr-8 h-9" />
						{searchQuery && <Button onClick={() => setSearchQuery("")}><CloseIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" /></Button>}
					</div>
				</div>
			</div>

			<main className="container mx-auto px-4 py-8">
				{isLoading ? (
					<div className="flex justify-center py-20"><Clock className="h-6 w-6 animate-spin text-red-500" /></div>
				) : (
					<>
						{/* Featured */}
						{featuredPost && activeCategory === "All" && !debouncedSearch && (
							<div className="mb-12">
								<div className="flex items-center gap-2 mb-6"><TrendingUp className="h-4 w-4 text-red-500" /><h2 className="text-lg font-semibold">Featured</h2></div>
								<Link to={`/blog/$slug`} params={{ slug: featuredPost.slug }}>
									<div className="rounded-xl border bg-gradient-to-br from-red-50/50 to-pink-50/50 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
										<div className="grid md:grid-cols-2 gap-0">
											<div className="aspect-video relative"><img src={featuredPost.image} alt={featuredPost.title} className="w-full h-full object-cover" /><Badge className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white border-0 gap-1">Featured</Badge></div>
											<div className="p-6 flex flex-col justify-center">
												<div className="flex items-center gap-2 mb-3"><Badge variant="secondary" className="text-xs">{featuredPost.category}</Badge><span className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="h-3 w-3" /> {new Date(featuredPost.date_created).toLocaleDateString()}</span></div>
												<h2 className="text-xl font-semibold mb-2 line-clamp-2">{featuredPost.title}</h2>
												<p className="text-sm text-muted-foreground line-clamp-2 mb-4">{featuredPost.description}</p>
												<div className="flex items-center justify-between">
													<div className="flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">{featuredPost.author?.[0] || "G"}</div><span className="text-sm font-medium">{featuredPost.author || "Groupify Team"}</span></div>
													<Button size="sm" variant="secondary">Read Article</Button>
												</div>
											</div>
										</div>
									</div>
								</Link>
							</div>
						)}

						{/* Trending */}
						{trendingPosts.length > 0 && activeCategory === "All" && !debouncedSearch && currentPage === 1 && (
							<div className="mb-12">
								<div className="flex items-center gap-2 mb-6"><TrendingUp className="h-4 w-4 text-orange-500" /><h2 className="text-lg font-semibold">Trending</h2></div>
								<div className="grid md:grid-cols-3 gap-4">
									{trendingPosts.slice(0, 3).map((post, i) => (
										<Link key={post.id} to={`/blog/$slug`} params={{ slug: post.slug }}>
											<div className="rounded-xl border bg-card/50 overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
												<div className="aspect-video relative">
													<img src={post.image} alt={post.title} className="w-full h-full object-cover" />
													<Badge className={`absolute top-2 left-2 w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-xs ${i === 0 ? "bg-yellow-500" : i === 1 ? "bg-gray-400" : "bg-amber-600"}`}>
													#{i + 1}
													</Badge>
												</div>
												<div className="p-3"><Badge variant="secondary" className="text-xs mb-2">{post.category}</Badge><h3 className="font-medium text-sm line-clamp-2">{post.title}</h3></div>
											</div>
										</Link>
									))}
								</div>
							</div>
						)}

						{/* Posts Grid */}
						<div className="mb-8">
							<div className="flex items-center justify-between mb-6"><div className="flex items-center gap-2"><Clock className="h-4 w-4 text-red-500" /><h2 className="text-lg font-semibold">{debouncedSearch ? "Results" : activeCategory !== "All" ? `${activeCategory} Posts` : "All Posts"}</h2></div><span className="text-xs text-muted-foreground">{totalPosts} posts</span></div>
							<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
								{regularPosts.map((post) => (
									<Link key={post.id} to={`/blog/$slug`} params={{ slug: post.slug }}>
										<div className="rounded-xl border bg-card/50 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer hover:-translate-y-1">
											<div className="aspect-video"><img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" /></div>
											<div className="p-4 space-y-2">
												<div className="flex items-center gap-2"><Badge variant="secondary" className="text-xs">{post.category}</Badge><span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readTime}</span></div>
												<h3 className="font-semibold text-sm line-clamp-2 leading-tight">{post.title}</h3>
												<p className="text-xs text-muted-foreground line-clamp-2">{post.description}</p>
											</div>
										</div>
									</Link>
								))}
							</div>
						</div>

						{/* Pagination */}
						{totalPages > 1 && (
							<div className="flex items-center justify-between gap-4 mt-8 pt-6 border-t">
								<Button variant="outline" size="sm" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous</Button>
								<div className="flex gap-1">{Array.from({ length: Math.min(5, totalPages) }, (_, i) => { const page = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i; if (page > totalPages) return null; return <Button key={page} variant={currentPage === page ? "default" : "outline"} size="sm" className={`h-8 w-8 p-0 ${currentPage === page && "bg-gradient-to-r from-red-200 to-pink-200"}`} onClick={() => setCurrentPage(page)}>{page}</Button>; })}</div>
								<Button variant="outline" size="sm" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</Button>
							</div>
						)}

						{/* Empty State */}
						{allPosts.length === 0 && (
							<div className="text-center py-20">
								<Search className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
								<h3 className="font-semibold mb-2">No posts found</h3>
								<p className="text-sm text-muted-foreground mb-4">{debouncedSearch ? `No results for "${debouncedSearch}"` : "No posts in this category."}</p>
							</div>
						)}
					</>
				)}
			</main>
		</div>
	);
}

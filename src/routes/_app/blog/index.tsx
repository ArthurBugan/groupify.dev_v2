import { createFileRoute, Link } from "@tanstack/react-router";
import {
	BookOpen,
	Calendar,
	ChevronRight,
	Clock,
	Loader,
	Search,
	Sparkles,
	TrendingUp,
	X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { MainNavbar } from "@/components/main-navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { type BlogQueryParams, useBlogPosts } from "@/hooks/useQuery/useBlog";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/blog/")({
	component: BlogIndex,
});

const CATEGORIES = [
	"All",
	"Product",
	"Engineering",
	"Design",
	"Community",
	"Tutorials",
];

const categoryColors: Record<string, string> = {
	All: "from-gray-500 to-gray-600",
	Product: "from-blue-500 to-cyan-500",
	Engineering: "from-purple-500 to-pink-500",
	Design: "from-orange-500 to-red-500",
	Community: "from-green-500 to-emerald-500",
	Tutorials: "from-amber-500 to-yellow-500",
};

function BlogIndex() {
	const [activeCategory, setActiveCategory] = useState("All");
	const [searchQuery, setSearchQuery] = useState("");
	const [debouncedSearch, setDebouncedSearch] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(9);

	// Debounce search input
	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedSearch(searchQuery);
			setCurrentPage(1);
		}, 300);

		return () => clearTimeout(handler);
	}, [searchQuery]);

	// Build API query parameters
	const queryParams: BlogQueryParams = useMemo(() => {
		const params: BlogQueryParams = {
			status: "published",
			page: currentPage,
			limit: itemsPerPage,
		};

		if (activeCategory !== "All") {
			params.category = activeCategory;
		}

		if (debouncedSearch) {
			params.search = debouncedSearch;
		}

		return params;
	}, [activeCategory, debouncedSearch, currentPage, itemsPerPage]);

	const { data: blogData, isLoading } = useBlogPosts(queryParams);
	const allPosts = blogData?.data || [];
	const totalPosts = blogData?.total || 0;

	const totalPages = Math.ceil(totalPosts / itemsPerPage);

	const featuredPost = useMemo(() => {
		return allPosts.find((p) => p.featured);
	}, [allPosts]);

	const regularPosts = useMemo(() => {
		return allPosts.filter((p) => !p.featured);
	}, [allPosts]);

	const trendingPosts = useMemo(() => {
		return allPosts.slice(0, 3);
	}, [allPosts]);

	const clearFilters = () => {
		setActiveCategory("All");
		setSearchQuery("");
		setCurrentPage(1);
	};

	return (
		<div className="min-h-screen bg-background">
			<MainNavbar />

			{/* Hero Section */}
			<section className="relative overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-br from-red-50 via-white to-pink-50 dark:from-red-950/20 dark:via-background dark:to-pink-950/20" />
				<div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-200 to-transparent" />

				<div className="container mx-auto px-4 py-16 md:py-24 relative">
					<div className="text-center max-w-3xl mx-auto">
						<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-sm font-medium mb-6">
							<Sparkles className="h-4 w-4" />
							<span>Latest Updates & Insights</span>
						</div>

						<h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-red-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">
							Groupify Blog
						</h1>

						<p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
							Insights, updates, and tutorials from the team building the best
							way to organize your YouTube subscriptions.
						</p>
					</div>
				</div>
			</section>

			<main className="container mx-auto px-4 pb-20">
				{/* Search and Filters */}
				<div className="sticky top-20 z-30 bg-background/80 backdrop-blur-xl border-y py-6 mb-12 -mx-4 px-4">
					<div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center">
						{/* Category Pills */}
						<div className="flex flex-wrap gap-2">
							{CATEGORIES.map((cat) => (
								<button
									type="button"
									key={cat}
									onClick={() => {
										setActiveCategory(cat);
										setCurrentPage(1);
									}}
									className={cn(
										"px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
										activeCategory === cat
											? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg shadow-red-500/25"
											: "bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground",
									)}
								>
									{cat}
								</button>
							))}
						</div>

						{/* Search */}
						<div className="relative w-full lg:w-80">
							<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
							<Input
								placeholder="Search articles..."
								className="pl-10 pr-10"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
							/>
							{searchQuery && (
								<button
									type="button"
									onClick={() => setSearchQuery("")}
									className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
								>
									<X className="h-4 w-4" />
								</button>
							)}
						</div>
					</div>
				</div>

				{isLoading && (
					<div className="flex flex-col justify-center items-center py-20">
						<div className="relative">
							<Loader className="h-10 w-10 animate-spin text-red-500" />
							<div className="absolute inset-0 blur-xl bg-red-500/30 rounded-full" />
						</div>
						<span className="mt-4 text-muted-foreground">Loading posts...</span>
					</div>
				)}

				{/* Featured Post */}
				{!isLoading &&
					featuredPost &&
					activeCategory === "All" &&
					!debouncedSearch && (
						<div className="mb-16">
							<div className="flex items-center gap-2 mb-6">
								<TrendingUp className="h-5 w-5 text-red-500" />
								<h2 className="text-2xl font-bold">Featured Post</h2>
							</div>

							<Link to={`/blog/$slug`} params={{ slug: featuredPost.slug }}>
								<Card className="overflow-hidden border-none bg-gradient-to-br from-red-500/5 to-pink-500/5 hover:shadow-2xl transition-all duration-500 cursor-pointer group">
									<div className="grid lg:grid-cols-2 gap-0">
										<div className="relative aspect-[16/10] lg:aspect-auto lg:h-full min-h-[300px] overflow-hidden">
											<img
												src={featuredPost.image}
												alt={featuredPost.title}
												className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
											/>
											<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:bg-gradient-to-r" />
											<div className="absolute top-4 left-4">
												<Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white border-0 shadow-lg">
													<Sparkles className="h-3 w-3 mr-1" />
													Featured
												</Badge>
											</div>
										</div>
										<div className="p-8 lg:p-12 flex flex-col justify-center">
											<div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
												<Badge variant="secondary">
													{featuredPost.category}
												</Badge>
												<span className="flex items-center gap-1">
													<Calendar className="h-4 w-4" />{" "}
													{new Date(
														featuredPost.date_created,
													).toLocaleDateString()}
												</span>
												<span className="flex items-center gap-1">
													<Clock className="h-4 w-4" /> {featuredPost.readTime}
												</span>
											</div>
											<h2 className="text-3xl lg:text-4xl font-bold mb-4 group-hover:text-red-600 transition-colors leading-tight">
												{featuredPost.title}
											</h2>
											<p className="text-lg text-muted-foreground mb-6 line-clamp-3 leading-relaxed">
												{featuredPost.description}
											</p>
											<div className="flex items-center justify-between">
												<div className="flex items-center gap-3">
													<div className="h-10 w-10 rounded-full bg-gradient-to-tr from-red-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm shadow-lg">
														{featuredPost.author?.[0] || "G"}
													</div>
													<div>
														<span className="font-semibold block">
															{featuredPost.author || "Groupify Team"}
														</span>
														<span className="text-xs text-muted-foreground">
															Author
														</span>
													</div>
												</div>
												<Button className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white shadow-lg shadow-red-500/25">
													Read Article
													<ChevronRight className="h-4 w-4 ml-1" />
												</Button>
											</div>
										</div>
									</div>
								</Card>
							</Link>
						</div>
					)}

				{/* Trending Section (when no search/filter) */}
				{!isLoading &&
					trendingPosts.length > 0 &&
					activeCategory === "All" &&
					!debouncedSearch &&
					currentPage === 1 && (
						<div className="mb-16">
							<div className="flex items-center gap-2 mb-6">
								<TrendingUp className="h-5 w-5 text-orange-500" />
								<h2 className="text-2xl font-bold">Trending Now</h2>
							</div>

							<div className="grid md:grid-cols-3 gap-6">
								{trendingPosts.slice(0, 3).map((post, index) => (
									<Link
										key={post.id}
										to={`/blog/$slug`}
										params={{ slug: post.slug }}
									>
										<Card
											className={cn(
												"h-full flex flex-col border-none hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden",
												"bg-gradient-to-br from-background to-muted/30",
											)}
										>
											<CardHeader className="p-0 overflow-hidden aspect-video relative">
												<img
													src={post.image}
													alt={post.title}
													className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
												/>
												<div
													className={cn(
														"absolute top-3 left-3 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg",
														"bg-gradient-to-r",
														index === 0
															? "from-yellow-500 to-orange-500"
															: index === 1
																? "from-gray-400 to-gray-500"
																: "from-amber-600 to-amber-700",
													)}
												>
													#{index + 1}
												</div>
											</CardHeader>
											<CardContent className="p-5 flex-grow">
												<div className="flex items-center gap-2 mb-3">
													<Badge variant="secondary" className="text-xs">
														{post.category}
													</Badge>
													<span className="text-xs text-muted-foreground">
														{post.readTime}
													</span>
												</div>
												<CardTitle className="text-lg mb-2 group-hover:text-red-600 transition-colors line-clamp-2">
													{post.title}
												</CardTitle>
											</CardContent>
										</Card>
									</Link>
								))}
							</div>
						</div>
					)}

				{/* All Posts Grid */}
				<div className="mb-8">
					<div className="flex items-center justify-between mb-8">
						<div className="flex items-center gap-2">
							<BookOpen className="h-5 w-5 text-red-500" />
							<h2 className="text-2xl font-bold">
								{debouncedSearch
									? `Search Results`
									: activeCategory !== "All"
										? `${activeCategory} Posts`
										: "All Posts"}
							</h2>
						</div>
						<span className="text-sm text-muted-foreground">
							{totalPosts} {totalPosts === 1 ? "post" : "posts"}
						</span>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{regularPosts.map((post) => (
							<Link
								key={post.id}
								to={`/blog/$slug`}
								params={{ slug: post.slug }}
							>
								<Card className="h-full flex flex-col border-none bg-card hover:shadow-2xl transition-all duration-300 cursor-pointer group overflow-hidden hover:-translate-y-1">
									<CardHeader className="p-0 overflow-hidden aspect-video relative">
										<img
											src={post.image}
											alt={post.title}
											className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
									</CardHeader>
									<CardContent className="p-6 flex-grow">
										<div className="flex items-center gap-3 mb-3">
											<Badge
												variant="secondary"
												className={cn(
													"font-normal text-xs",
													"bg-gradient-to-r text-white border-0",
													categoryColors[post.category] ||
														categoryColors["All"],
												)}
											>
												{post.category}
											</Badge>
											<span className="text-xs text-muted-foreground flex items-center gap-1">
												<Clock className="h-3 w-3" /> {post.readTime}
											</span>
										</div>
										<CardTitle className="text-xl mb-3 group-hover:text-red-600 transition-colors line-clamp-2">
											{post.title}
										</CardTitle>
										<p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
											{post.description}
										</p>
									</CardContent>
									<CardFooter className="p-6 pt-0 flex justify-between items-center border-t mt-auto">
										<div className="flex items-center gap-2">
											<div className="h-7 w-7 rounded-full bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
												{post.author?.[0] || "G"}
											</div>
											<span className="text-sm font-medium">
												{post.author || "Groupify Team"}
											</span>
										</div>
										<span className="text-xs text-muted-foreground">
											{new Date(post.date_created).toLocaleDateString()}
										</span>
									</CardFooter>
								</Card>
							</Link>
						))}
					</div>
				</div>

				{/* Pagination */}
				{totalPages > 1 && (
					<div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pt-8 border-t">
						<div className="flex items-center gap-3 text-sm text-muted-foreground order-2 sm:order-1">
							<span>Show:</span>
							<div className="flex gap-1">
								{[9, 18, 27].map((num) => (
									<button
										type="button"
										key={num}
										onClick={() => {
											setItemsPerPage(num);
											setCurrentPage(1);
										}}
										className={cn(
											"px-3 py-1 rounded-md text-sm transition-colors",
											itemsPerPage === num
												? "bg-red-100 text-red-700 font-medium"
												: "hover:bg-muted",
										)}
									>
										{num}
									</button>
								))}
							</div>
							<span>per page</span>
						</div>

						<div className="flex items-center gap-2 order-1 sm:order-2">
							<Button
								variant="outline"
								size="sm"
								disabled={currentPage === 1}
								onClick={() => setCurrentPage(currentPage - 1)}
							>
								Previous
							</Button>

							<div className="flex items-center gap-1">
								{Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
									const page =
										Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
									if (page > totalPages) return null;

									return (
										<Button
											key={page}
											variant={currentPage === page ? "default" : "outline"}
											size="sm"
											onClick={() => setCurrentPage(page)}
											className={cn(
												"h-8 w-8 p-0",
												currentPage === page &&
													"bg-gradient-to-r from-red-500 to-pink-500",
											)}
										>
											{page}
										</Button>
									);
								})}
							</div>

							<Button
								variant="outline"
								size="sm"
								disabled={currentPage === totalPages}
								onClick={() => setCurrentPage(currentPage + 1)}
							>
								Next
							</Button>
						</div>

						<div className="text-sm text-muted-foreground order-3">
							Page {currentPage} of {totalPages}
						</div>
					</div>
				)}

				{/* Empty State */}
				{!isLoading && allPosts.length === 0 && (
					<div className="text-center py-20">
						<div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
							<Search className="h-10 w-10 text-muted-foreground" />
						</div>
						<h3 className="text-xl font-semibold mb-2">No posts found</h3>
						<p className="text-muted-foreground mb-6">
							{debouncedSearch
								? `No results for "${debouncedSearch}" in ${activeCategory === "All" ? "any category" : activeCategory}`
								: "No posts available in this category."}
						</p>
						<Button onClick={clearFilters} variant="outline" className="gap-2">
							<X className="h-4 w-4" />
							Clear all filters
						</Button>
					</div>
				)}
			</main>
		</div>
	);
}

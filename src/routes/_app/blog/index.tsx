import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import { MainNavbar } from "@/components/main-navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, Search, ChevronRight, Loader } from "lucide-react";
import { useBlogPosts, type BlogQueryParams } from "@/hooks/useQuery/useBlog";

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

	// Debounce search input
	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedSearch(searchQuery);
			setCurrentPage(1); // Reset to first page on new search
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
			// Use server-side search through the API
			params.search = debouncedSearch;
		}

		return params;
	}, [activeCategory, debouncedSearch, currentPage, itemsPerPage]);

	const { data: blogData, isLoading } = useBlogPosts(queryParams);
	const allPosts = blogData?.data || [];
	const totalPosts = blogData?.total || 0;

	// Server-side pagination
	const totalPages = Math.ceil(totalPosts / itemsPerPage);

	const featuredPost = useMemo(() => {
		return allPosts.find(p => p.featured);
	}, [allPosts]);

	const regularPosts = useMemo(() => {
		return allPosts.filter(p => !p.featured);
	}, [allPosts]);

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
							onClick={() => {
								setActiveCategory(cat);
								setCurrentPage(1);
							}}
							className="rounded-full"
						>
							{cat}
						</Button>
					))}
				</div>
				<div className="relative w-full md:w-80">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
					<Input 
						placeholder="Search posts..." 
						className="pl-10"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</div>
			</div>

			{isLoading && (
				<div className="flex justify-center items-center py-20">
					<Loader className="h-8 w-8 animate-spin text-red-500" />
					<span className="ml-2 text-muted-foreground">Loading posts...</span>
				</div>
			)}

			{/* Pagination */}
		{totalPages > 1 && (
			<div className="flex items-center justify-between mt-12 mb-4">
				<div className="flex items-center gap-2 text-sm text-muted-foreground">
					<span className="whitespace-nowrap">Items per page:</span>
					<select
						value={itemsPerPage}
						onChange={(e) => {
							setItemsPerPage(Number(e.target.value));
							setCurrentPage(1); // Reset to first page when changing items per page
						}}
						className="border rounded-md px-2 py-1 text-sm"
					>
						<option value="9">9</option>
						<option value="18">18</option>
						<option value="27">27</option>
						<option value="36">36</option>
					</select>
				</div>
				
				<div className="flex items-center gap-2">
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
							const page = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
							if (page > totalPages) return null;
							
							return (
								<Button
									key={page}
									variant={currentPage === page ? "default" : "outline"}
									size="sm"
									onClick={() => setCurrentPage(page)}
									className="h-8 w-8 p-0"
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
				
				<div className="text-sm text-muted-foreground">
					Showing {allPosts.length} of {totalPosts} posts
				</div>
			</div>
		)}

				{/* Featured Post */}
			{featuredPost && activeCategory === "All" && !debouncedSearch && (
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
													{featuredPost.author?.[0] || 'Groupify team'[0]}
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
											{post.author?.[0] || 'Groupify team'[0]}
										</div>
										<span className="text-sm font-medium">{post.author || 'Groupify team'}</span>
									</div>
									<span className="text-xs text-muted-foreground">{post.date}</span>
								</CardFooter>
							</Card>
						</Link>
					))}
				</div>

				{!isLoading && allPosts.length === 0 && (
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

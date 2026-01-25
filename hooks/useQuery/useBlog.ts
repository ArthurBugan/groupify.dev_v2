import { useQuery } from "@tanstack/react-query";
import { type ApiResponse, apiClient } from "@/hooks/api/api-client";

export interface BlogPost {
  id: number;
  status: string;
  sort: number | null;
  date_created: string;
  date_updated: string;
  image: string;
  slug: string;
  title: string;
  description: string;
  readTime: string;
  category: string;
  featured: boolean;
  content: string;
  author?: string;
}

export interface BlogPostsResponse {
  data: BlogPost[];
  total: number;
}

export interface SingleBlogPostsResponse {
  data: BlogPost;
  total: number;
}

export interface BlogQueryParams {
  status?: string;
  category?: string;
  featured?: boolean;
  limit?: number;
  slug?: string;
}

const getBlogPosts = async (params?: BlogQueryParams): Promise<BlogPostsResponse> => {
  const response = await apiClient.get<ApiResponse<BlogPostsResponse>>(
    "/api/v3/blog",
    params
  );

  console.log(response.data)
  
  return response.data;
};

export function useBlogPosts(params?: BlogQueryParams) {
  return useQuery({
    queryKey: ["blog", "posts", params],
    queryFn: () => getBlogPosts(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

const getBlogPostBySlug = async (slug: string): Promise<BlogPost> => {
  const response = await apiClient.get<ApiResponse<SingleBlogPostsResponse>>(
    `/api/v3/blog/${slug}`
  );
  
  const post = response.data.data;
  
  if (!post) {
    throw new Error(`Blog post with slug "${slug}" not found`);
  }
  
  return post;
};

export function useBlogPost(slug: string) {
  return useQuery({
    queryKey: ["blog", "post", slug],
    queryFn: () => getBlogPostBySlug(slug),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}
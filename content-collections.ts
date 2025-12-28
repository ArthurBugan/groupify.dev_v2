// content-collections.ts
import { defineCollection, defineConfig } from '@content-collections/core'
import z from 'zod'
import matter from 'gray-matter'

function extractFrontMatter(content: string) {
  const { data, content: body, excerpt } = matter(content, { excerpt: true })
  return { data, body, excerpt: excerpt || '' }
}

const posts = defineCollection({
  name: 'posts',
  directory: "content/posts",
  include: "**/*.md",
  schema: z.object({
    id: z.string(),
    slug: z.string(),
    title: z.string(),
    description: z.string(),
    date: z.string(),
    readTime: z.string(),
    category: z.string(),
    author: z.string(),
    image: z.string(),
    featured: z.boolean(),
  }),
  transform: ({ content, ...post }) => {
    const frontMatter = extractFrontMatter(content)

    // Extract header image (first image in the document)
    const headerImageMatch = content.match(/!\[([^\]]*)\]\(([^)]+)\)/)
    const headerImage = headerImageMatch ? headerImageMatch[2] : undefined

    return {
      ...post,
      slug: post._meta.path,
      excerpt: frontMatter.excerpt,
      headerImage,
      content: frontMatter.body,
    }
  },
})

export default defineConfig({
  collections: [posts],
});
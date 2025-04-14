import { Suspense } from "react"
import BlogPost from "@/components/ui/blog-post"
import { notFound } from "next/navigation"

async function getBlogBySlug(slug: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/blogs/${slug}`, {
      cache: "no-store",
    })

    if (!res.ok) {
      if (res.status === 404) return null
      throw new Error("Failed to fetch blog")
    }

    return res.json()
  } catch (error) {
    console.error("Error fetching blog:", error)
    throw error
  }
}

export default async function BlogPage({ params }: { params: { slug: string } }) {
  const blog = await getBlogBySlug(params.slug)

  if (!blog) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<div>Loading blog...</div>}>
        <BlogPost blog={blog} />
      </Suspense>
    </div>
  )
}

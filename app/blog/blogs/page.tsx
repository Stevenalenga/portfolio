import Link from "next/link"
import { Suspense } from "react"

async function getBlogs() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const res = await fetch(`${apiUrl}/blog/api/blogs`, {
      cache: "no-store",
    });

    if (!res.ok) {
      if (res.status === 404) {
        console.warn("Blogs not found. Returning an empty list.");
        return []; // Return an empty list if blogs are not found
      }
      const errorDetails = await res.text();
      throw new Error(`Failed to fetch blogs: ${res.status} ${res.statusText} - ${errorDetails}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching blogs:", error.message);
    throw error;
  }
}

export default async function BlogsPage() {
  let blogs = [];
  try {
    blogs = await getBlogs();
  } catch (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
        <p className="text-red-500">Failed to load blogs. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>

      <Suspense fallback={<div>Loading blogs...</div>}>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog: any) => (
            <Link key={blog._id} href={`/blogs/${blog.slug}`} className="block">
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-2 line-clamp-2">{blog.title}</h2>
                  <p className="text-gray-500 text-sm mb-3">{new Date(blog.datePosted).toLocaleDateString()}</p>
                  <p className="text-gray-700 line-clamp-3">{blog.body}</p>
                  <div className="flex items-center gap-4 mt-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">👍 {blog.likes}</span>
                    <span className="flex items-center gap-1">💬 {blog.comments?.length || 0}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Suspense>
    </div>
  );
}

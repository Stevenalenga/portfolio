import Link from "next/link"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Welcome to Our Blog</h1>
        <p className="text-xl text-gray-600 mb-8">Discover the latest articles, news, and insights from our team.</p>
        <Link
          href="/blog/blogs"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition"
        >
          View All Posts
        </Link>
      </div>
    </div>
  )
}

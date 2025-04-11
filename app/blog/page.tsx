import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

import Image from 'next/image'
import Link from "next/link"

export default function DevBlog() {
  const blogPosts = [
    {
      title: "Getting Started with Next.js 13",
      description: "Learn how to build modern web applications with Next.js 13 and its new App Router.",
      date: "2023-05-15",
      readTime: "5 min read",
    },
    {
      title: "The Power of Server Components in React",
      description: "Explore how Server Components can improve your React application's performance and user experience.",
      date: "2023-05-10",
      readTime: "7 min read",
    },
    {
      title: "Mastering TypeScript: Advanced Types and Techniques",
      description: "Dive deep into TypeScript's advanced features to write more robust and maintainable code.",
      date: "2023-05-05",
      readTime: "10 min read",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Section */}
      <header className="bg-background border-b">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">DevBlog</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><Link href="#" className="hover:text-primary">Home</Link></li>
              <li><Link href="#" className="hover:text-primary">About</Link></li>
              <li><Link href="#" className="hover:text-primary">Archive</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content Section */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Blog Posts Section */}
          <section className="lg:col-span-2 space-y-8">
            {blogPosts.map((post, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                  <CardDescription>{post.date} • {post.readTime}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{post.description}</p>
                </CardContent>
                <CardFooter>
                    <Link href={`/blog/chapters/${post.title.toLowerCase().replace(/ /g, "-")}`}>
                    <Button variant="outline">Read More</Button>
                    </Link>
                </CardFooter>
              </Card>
            ))}
          </section>

          {/* Sidebar Section */}
          <aside className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>About Me</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Hi, I&apos;m a passionate developer sharing my journey and insights in web development, focusing on React, Next.js, and TypeScript.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Subscribe</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="flex space-x-2">
                  <Input type="email" placeholder="Enter your email" />
                  <Button type="submit">Subscribe</Button>
                </form>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="bg-background border-t">
        <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 sm:mb-0">© 2023 DevBlog. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="#" className="text-muted-foreground hover:text-primary">
            <Image src="/socials/github.png" alt="GitHub" width={24} height={24} />
              <span className="sr-only">GitHub</span>
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary">
              <Image src="/socials/twitter.png" alt="twitter" width={24} height={24} />
              <span className="sr-only">Twitter</span>
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary">
            <Image src="/socials/linkedin.png" alt="Linked In" width={24} height={24} />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary">
            <Image src="/socials/whatsappdark.png" alt="Whatsapp" width={24} height={24} />
              <span className="sr-only">RSS Feed</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
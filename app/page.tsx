"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { socialLinks } from "@/lib/data" // Import social links from data.ts
import { Card, CardContent } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-zinc-800 text-zinc-100">
      <main className="container mx-auto px-4 pt-20">
        {/* About Section */}
        <section id="about" className="relative py-40 overflow-hidden min-h-screen flex items-center justify-center">
          <div className="text-center px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto relative z-10">
            <div className="mb-8">
              <Image
                src="/profilepic.jpg"
                alt="Stephen Mola"
                width={200}
                height={200}
                className="rounded-full mx-auto border-4 border-yellow-300"
              />
            </div>
            <h2 className="text-4xl font-bold mb-4">Hello, I am Stephen Mola</h2>
            <p className="text-xl mb-8">
              A growing Developer passionate about creating beautiful and functional Web applications, APIs and Mobile
              Apps. I enjoy working with Typescript, Node.js, Python and other modern technologies. I eager to grow in
              the field especially in automation and AI and leverage my skills to build innovative solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-yellow-300 text-zinc-900 hover:bg-yellow-400 transition-all duration-300">
                <a href="/contact">Get in touch</a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-yellow-300 text-yellow-300 hover:bg-yellow-300 hover:text-zinc-900 transition-all duration-300 bg-transparent"
              >
                <a href="/stephen-mola-cv.pdf" download>
                  <Download className="mr-2 h-4 w-4" />
                  Download CV
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Contact Section - Moved here for easy access from About, but also has its own page */}
        <section id="contact" className="py-20">
          <h2 className="text-3xl font-bold mb-8 text-center">Get in Touch</h2>
          <Card className="bg-zinc-800">
            <CardContent className="flex flex-col items-center space-y-4 pt-6">
              <p className="text-center mb-4">Feel free to reach out for collaborations or just a friendly hello</p>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <Button
                    key={social.name}
                    variant="outline"
                    size="icon"
                    className="bg-transparent border-yellow-300 hover:bg-yellow-300 transition-all duration-300"
                  >
                    <a href={social.url} target="_blank" rel="noopener noreferrer">
                      <Image src={social.icon || "/placeholder.svg"} alt={social.name} width={24} height={24} />
                      <span className="sr-only">{social.name}</span>
                    </a>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}

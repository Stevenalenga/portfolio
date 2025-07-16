import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { socialLinks } from "@/lib/data"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-zinc-800 text-zinc-100">
      <main className="container mx-auto px-4 py-20 flex items-center justify-center">
        <section id="contact" className="py-20 w-full max-w-2xl">
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

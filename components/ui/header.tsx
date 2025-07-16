"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

export default function SiteHeader() {
  const navItems = [
    { name: "About", href: "/" },
    { name: "Skills", href: "/skills" },
    { name: "Projects", href: "/projects" },
    { name: "Market Assets", href: "/market-assets" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-900/80 backdrop-blur-sm shadow-md">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-yellow-300 hover:text-yellow-400 transition-colors">
          Stephen Mola
        </Link>
        <div className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <Button
              key={item.name}
              asChild
              variant="ghost"
              className="text-zinc-100 hover:bg-zinc-700 hover:text-yellow-300"
            >
              <Link href={item.href}>{item.name}</Link>
            </Button>
          ))}
        </div>
        {/* Mobile navigation using Sheet */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-zinc-100 hover:bg-zinc-700">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-zinc-900 text-zinc-100 border-l border-zinc-700">
              <VisuallyHidden asChild>
                <SheetTitle>Mobile Navigation Menu</SheetTitle>
              </VisuallyHidden>
              <VisuallyHidden asChild>
                <SheetDescription>Navigation links for the website.</SheetDescription>
              </VisuallyHidden>
              <div className="flex flex-col gap-4 py-6">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-lg font-semibold hover:text-yellow-300 transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}

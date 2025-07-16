"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

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
        {/* Mobile navigation can be added here using Sheet/Dialog */}
      </nav>
    </header>
  )
}

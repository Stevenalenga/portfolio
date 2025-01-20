"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

const navItems = ["About", "Skills", "Projects", "Contact", "Blog"]

export default function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center backdrop-blur-sm">
        <Logo />
        <DesktopNav />
        <MobileMenuButton isOpen={isMenuOpen} onClick={toggleMenu} />
      </div>
      <MobileNav isOpen={isMenuOpen} onClose={toggleMenu} />
    </header>
  )
}

function Logo() {
  return (
    <motion.div
      className="text-2xl font-bold text-white"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Image src="/stephenmola.png" alt="Logo" width={75} height={75} />
    </motion.div>
  )
}

function DesktopNav() {
  return (
    <nav className="hidden md:flex space-x-4">
      {navItems.map((item, index) => (
        <NavLink key={item} item={item} index={index} />
      ))}
    </nav>
  )
}

function NavLink({ item, index }: { item: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        href={item === "Blog" ? "/blog" : `#${item.toLowerCase()}`}
        className="text-white hover:text-yellow-300 transition-colors"
      >
        {item}
      </Link>
    </motion.div>
  )
}

function MobileMenuButton({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) {
  return (
    <Button variant="ghost" size="icon" className="md:hidden text-white" onClick={onClick}>
      {isOpen ? <X /> : <Menu />}
    </Button>
  )
}

function MobileNav({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.nav
          className="fixed top-0 right-0 bottom-0 w-64 bg-zinc-900 z-40 p-4 flex flex-col justify-center"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {navItems.map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link
                href={item === "Blog" ? "/blog" : `#${item.toLowerCase()}`}
                className="block py-2 text-white hover:text-yellow-300 transition-colors"
                onClick={onClose}
              >
                {item}
              </Link>
            </motion.div>
          ))}
        </motion.nav>
      )}
    </AnimatePresence>
  )
}


'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Menu, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Component() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const menuVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "100%" },
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Jane Doe</h1>
          <nav className="hidden md:flex space-x-4">
            <a href="#about" className="hover:text-primary transition-colors">About</a>
            <a href="#skills" className="hover:text-primary transition-colors">Skills</a>
            <a href="#projects" className="hover:text-primary transition-colors">Projects</a>
            <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
          </nav>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </header>

      {/* Mobile Menu */}
      <motion.nav 
        className="fixed top-0 right-0 bottom-0 w-64 bg-background z-40 p-4 flex flex-col justify-center md:hidden"
        initial="closed"
        animate={isMenuOpen ? "open" : "closed"}
        variants={menuVariants}
      >
        <a href="#about" className="py-2 hover:text-primary transition-colors" onClick={toggleMenu}>About</a>
        <a href="#skills" className="py-2 hover:text-primary transition-colors" onClick={toggleMenu}>Skills</a>
        <a href="#projects" className="py-2 hover:text-primary transition-colors" onClick={toggleMenu}>Projects</a>
        <a href="#contact" className="py-2 hover:text-primary transition-colors" onClick={toggleMenu}>Contact</a>
      </motion.nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-20">
        {/* About Section */}
        <section id="about" className="py-20">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold mb-4">Hi, I'm Jane Doe</h2>
            <p className="text-xl mb-8">Full-stack developer passionate about creating beautiful and functional web applications.</p>
            <Button asChild>
              <a href="#contact">Get in touch</a>
            </Button>
          </motion.div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20">
          <h2 className="text-3xl font-bold mb-8 text-center">My Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'Git', 'AWS', 'Docker'].map((skill) => (
              <Card key={skill}>
                <CardHeader>
                  <CardTitle>{skill}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20">
          <h2 className="text-3xl font-bold mb-8 text-center">My Projects</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: 'E-commerce Platform', description: 'A full-stack e-commerce solution built with React and Node.js' },
              { title: 'Task Management App', description: 'A productivity app created using React Native and Firebase' },
              { title: 'Data Visualization Dashboard', description: 'An interactive dashboard built with D3.js and Vue.js' },
              { title: 'AI Chatbot', description: 'A machine learning powered chatbot using Python and TensorFlow' }
            ].map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline">View Project</Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20">
          <h2 className="text-3xl font-bold mb-8 text-center">Get in Touch</h2>
          <Card>
            <CardContent className="flex flex-col items-center space-y-4 pt-6">
              <p className="text-center mb-4">Feel free to reach out for collaborations or just a friendly hello</p>
              <div className="flex space-x-4">
                <Button variant="outline" size="icon">
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                    <Github className="h-6 w-6" />
                    <span className="sr-only">GitHub</span>
                  </a>
                </Button>
                <Button variant="outline" size="icon">
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-6 w-6" />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                </Button>
                <Button variant="outline" size="icon">
                  <a href="mailto:jane@example.com">
                    <Mail className="h-6 w-6" />
                    <span className="sr-only">Email</span>
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-muted py-4 mt-20">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 Jane Doe. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
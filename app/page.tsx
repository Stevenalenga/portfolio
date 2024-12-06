'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useInView } from 'react-intersection-observer'

const backgroundImages = [
  '/images/apiroutes.png',
  '/images/code.png',
  '/images/dashboards.png',
  '/images/visualpages.png',
  '/images/mobileui.png',
  '/images/uidashboards.png',
]

const skills = ['aws', 'CSS', 'Data-Analysis', 'Data-Visualisation', 'Docker', 'Firebase', 'Git', 'Javascript', 'MongoDB', 'Nodejs', 'Postgres', 'Python', 'React', 'Sql', 'Typescript', 'Office']

const projects = [
  { title: 'E-commerce Platform', description: 'A full-stack e-commerce solution built with React and Node.js', url: "https://github.com/Stevenalenga/onlinestores" },
  { title: 'Task Management App', description: 'A productivity app created using React Native and Firebase', url: "https://github.com/Stevenalenga/todo" },
  { title: 'Data Visualization Dashboard', description: 'An interactive dashboard built with D3.js and Vue.js', url: "https://github.com/Stevenalenga/worko" },
  { title: 'AI Chess', description: 'A machine learning powered chess using Python and TensorFlow meant to help you improve your game', url: "https://github.com/Stevenalenga/AI-Chess" },
  { title: 'My Maps', description: 'An application meant to share secret spots and locations with friends or general pubic', url: "https://github.com/Stevenalenga/maps" },
  { title: 'Portfolio Page', description: 'A site shows developers skills and projects', url: "https://github.com/Stevenalenga/portfolio" }
]

export default function Component() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const { ref: skillsRef, inView: skillsInView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const { ref: projectsRef, inView: projectsInView } = useInView({ triggerOnce: true, threshold: 0.1 })

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length)
    }, 5000)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.h1 
            className="text-2xl font-bold"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Stephen Mola
          </motion.h1>
          <nav className="hidden md:flex space-x-4">
            {['About', 'Skills', 'Projects', 'Contact', 'Blog'].map((item, index) => (
              <motion.a
                key={item}
                href={item === 'Blog' ? '/blog' : `#${item.toLowerCase()}`}
                className="hover:text-yellow-300 transition-colors"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {item}
              </motion.a>
            ))}
          </nav>
          <Button variant="ghost" size="icon" className="md:hidden text-white" onClick={toggleMenu}>
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav 
            className="fixed top-0 right-0 bottom-0 w-64 bg-gradient-to-b from-blue-600 to-purple-600 z-40 p-4 flex flex-col justify-center"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {['About', 'Skills', 'Projects', 'Contact', 'Blog'].map((item, index) => (
              <motion.a
                key={item}
                href={item === 'Blog' ? '/blog' : `#${item.toLowerCase()}`}
                className="py-2 hover:text-yellow-300 transition-colors"
                onClick={toggleMenu}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {item}
              </motion.a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-20">
        {/* About Section */}
        <section id="about" className="relative py-40 overflow-hidden min-h-screen flex items-center justify-center">
          {backgroundImages.map((image, index) => (
            <motion.div
              key={index}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${image})` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: index === currentImageIndex ? 1 : 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              aria-hidden="true"
            />
          ))}
          <motion.div 
            className="text-center px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto relative z-10 [text-shadow:_0_1px_2px_rgba(0,0,0,0.8)]"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h2 className="text-4xl font-bold mb-4">Hello, I am Stephen Mola</h2>
            <p className="text-xl mb-8">Full-Stack Developer passionate about creating beautiful and functional Web applications, APIs and Mobile Apps.</p>
            <Button asChild className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300">
              <a href="#contact">Get in touch</a>
            </Button>
          </motion.div>
        </section>

        {/* Skills Section */}
        <section id="skills" ref={skillsRef} className="py-20 min-h-screen">
          <motion.h2 
            className="text-3xl font-bold mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={skillsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            My Skills
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {skills.map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={skillsInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-gray-800 to-gray-700 hover:from-blue-600 hover:to-purple-600 transition-all duration-300">
                  <CardHeader>
                    <Image
                      src={`/assets/${skill.toLowerCase()}.png`}
                      alt={`${skill} logo`}
                      width={100}
                      height={50}
                      className="mx-auto"
                    />
                  </CardHeader>
                  <CardContent className="text-center"><strong>{skill}</strong></CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" ref={projectsRef} className="py-20 min-h-screen">
          <motion.h2 
            className="text-3xl font-bold mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={projectsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            My Projects
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={projectsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-gray-800 to-gray-700 hover:from-blue-600 hover:to-purple-600 transition-all duration-300">
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" asChild className="bg-transparent border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-gray-900 transition-all duration-300">
                      <a href={project.url} target="_blank" rel="noopener noreferrer">View Project</a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 min-h-screen">
          <motion.h2 
            className="text-3xl font-bold mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Get in Touch
          </motion.h2>
          <Card className="bg-gradient-to-br from-gray-800 to-gray-700">
            <CardContent className="flex flex-col items-center space-y-4 pt-6">
              <p className="text-center mb-4">Feel free to reach out for collaborations or just a friendly hello</p>
              <div className="flex space-x-4">
                {[
                  { name: 'GitHub', url: 'https://github.com/Stevenalenga', icon: '/socials/github.png' },
                  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/stephen-mola/', icon: '/socials/linkedin.png' },
                  { name: 'Email', url: 'mailto:stevenkmola@gmail.com', icon: '/socials/email.png' },
                  { name: 'WhatsApp', url: 'https://wa.link/f73yev', icon: '/socials/whatsappdark.png' },
                ].map((social) => (
                  <motion.div
                    key={social.name}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button variant="outline" size="icon" className="bg-transparent border-yellow-400 hover:bg-yellow-400 transition-all duration-300">
                      <a href={social.url} target="_blank" rel="noopener noreferrer">
                        <Image src={social.icon} alt={social.name} width={24} height={24} />
                        <span className="sr-only">{social.name}</span>
                      </a>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-600 to-purple-600 py-4 mt-20">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Stephen Mola. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
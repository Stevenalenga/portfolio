'use client'
// import { SpeedInsights } from "@vercel/speed-insights/next"
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
// import ErrorMessage from '../errors/errors' 
import { useInView } from 'react-intersection-observer'

const backgroundImages = [
  '/images/apiroutes.png',
  '/images/code.png',
  '/images/dashboards.png',
  '/images/visualpages.png',
  '/images/mobileui.png',
  '/images/uidashboards.png',
]

export default function Component() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const { ref: skillsRef, inView: skillsInView } = useInView({ triggerOnce: true })
  const { ref: projectsRef, inView: projectsInView } = useInView({ triggerOnce: true })
  const { ref: contactRef, inView: contactInView } = useInView({ triggerOnce: true })

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const menuVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "100%" },
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length)
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-500 to-purple-500 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center flex-wrap">
          <h1 className="text-2xl font-bold text-white">Stephen Mola</h1>
          <nav className="hidden md:flex space-x-4">
            <a href="#about" className="transition-colors text-white">About</a>
            <a href="#skills" className="transition-colors text-white">Skills</a>
            <a href="#projects" className="transition-colors text-white">Projects</a>
            <a href="#contact" className="transition-colors text-white">Contact</a>
            <a href="/blog" className="transition-colors text-white">Blog</a>
          </nav>
          <Button variant="ghost" size="icon" className="md:hidden text-white" onClick={toggleMenu}>
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </header>

      {/* Mobile Menu */}
      <motion.nav 
        className="fixed top-0 right-0 bottom-0 w-full bg-background z-40 p-4 flex flex-col justify-center md:hidden"
        initial="closed"
        animate={isMenuOpen ? "open" : "closed"}
        variants={menuVariants}
      >
        <a href="#about" className="py-2 hover:text-primary transition-colors" onClick={toggleMenu}>About</a>
        <a href="#skills" className="py-2 hover:text-primary transition-colors" onClick={toggleMenu}>Skills</a>
        <a href="#projects" className="py-2 hover:text-primary transition-colors" onClick={toggleMenu}>Projects</a>
        <a href="#contact" className="py-2 hover:text-primary transition-colors" onClick={toggleMenu}>Contact</a>
        <a href="/blog" className="py-2 hover:text-primary transition-colors" onClick={toggleMenu}>Blog</a>
      </motion.nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-20">
        {/* About Section */}
        <section id="about" className="relative py-40 overflow-hidden min-h-screen flex items-center justify-center"> 
          {backgroundImages.map((image, index) => (
            <div
              key={index}
              className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
              style={{
                backgroundImage: `url(${image})`,
                opacity: index === currentImageIndex ? 1 : 0,
                height: '100vh',
                width: '100%',
              }}
              aria-hidden="true"
            />
          ))}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center text-white px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto relative z-10 [text-shadow:_0_1px_2px_rgba(0,0,0,0.8)]"
          >
            <h2 className="text-4xl font-bold mb-4">Hello, I am Stephen Mola</h2>
            <p className="text-xl mb-8">Full-stack developer passionate about creating beautiful and functional web applications, APIs and Mobile Apps .</p>
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
              <a href="#contact">Get in touch</a>
            </Button>
          </motion.div>
        </section>

        {/* Skills Section */}
        <section id="skills" ref={skillsRef} className="py-20 min-h-screen">
          <h2 className="text-3xl font-bold mb-8 text-center">My Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {['aws', 'CSS', 'Data-Analysis', 'Data-Visualisation', 'Docker', 'Firebase', 'Git', 'Javascript', 'MongoDB', 'Nodejs', 'Postgres', 'Python', 'React', 'Sql', 'Typescript', 'Office'].map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: skillsInView ? 1 : 0, x: skillsInView ? 0 : 50 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <Image
                      src={`/assets/${skill.toLowerCase()}.png`}
                      alt={`${skill} logo`}
                      width={100}
                      height={50} 
                    />
                  </CardHeader>
                  <CardContent><strong>{skill}</strong></CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" ref={projectsRef} className="py-20 min-h-screen">
          <h2 className="text-3xl font-bold mb-8 text-center">My Projects</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: 'E-commerce Platform', description: 'A full-stack e-commerce solution built with React and Node.js' ,url: "https://github.com/Stevenalenga/onlinestores"},
              { title: 'Task Management App', description: 'A productivity app created using React Native and Firebase',url: "https://github.com/Stevenalenga/todo" },
              { title: 'Data Visualization Dashboard', description: 'An interactive dashboard built with D3.js and Vue.js',url: "https://github.com/Stevenalenga/worko" },
              { title: 'AI Chess', description: 'A machine learning powered chess using Python and TensorFlow meant to help you improve your game' ,url: "https://github.com/Stevenalenga/AI-Chess"},
              { title: 'My Maps', description: 'An application meant to share secret spots and locations with friends or general pubic',url: "https://github.com/Stevenalenga/maps" },
              { title: 'Porfolio Page', description: 'A site shows developers skills and projects ',url: "https://github.com/Stevenalenga/portfolio" }
            ].map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: projectsInView ? 1 : 0, y: projectsInView ? 0 : 50 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" asChild>
                      <a href={project.url} target="_blank" rel="noopener noreferrer">View Project</a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" ref={contactRef} className="py-20 min-h-screen">
          <h2 className="text-3xl font-bold mb-8 text-center">Get in Touch</h2>
          <Card>
            <CardContent className="flex flex-col items-center space-y-4 pt-6">
              <p className="text-center mb-4">Feel free to reach out for collaborations or just a friendly hello</p>
              <div className="flex space-x-4">
                <Button variant="outline" size="icon">
                    <a href="https://github.com/Stevenalenga" target="_blank" rel="noopener noreferrer">
                    <Image src="/socials/github.png" alt="GitHub" width={24} height={24} />
                    <span className="sr-only">GitHub</span>
                    </a>
                </Button>
                <Button variant="outline" size="icon">
                  <a href="https://www.linkedin.com/in/stephen-mola/" target="_blank" rel="noopener noreferrer">
                  <Image src="/socials/linkedin.png" alt="Linked In" width={24} height={24} />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                </Button>
                <Button variant="outline" size="icon">
                  <a href="mailto:stevenkmola@gmail.com">
                  <Image src="/socials/email.png" alt="Email" width={24} height={24} />
                    <span className="sr-only">Email</span>
                  </a>
                </Button>
                <Button variant="outline" size="icon">
                  <a href="https://wa.link/f73yev" target="_blank" rel="noopener noreferrer">
                  <Image src="/socials/whatsappdark.png" alt="Whatsapp" width={24} height={24} />
                  <span className="sr-only">Whatsapp</span>
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-500 to-purple-500 py-4 mt-20">
        <div className="container mx-auto px-4 text-center text-white">
          <p>&copy; 2024 Stephen Mola. All rights reserved.</p>
        </div>
      </footer>

      <style jsx>{`
        a:hover, button:hover {
          background: linear-gradient(to right, #3b82f6, #9333ea);
          color: white;
        }
      `}</style>
    </div>
  )
}
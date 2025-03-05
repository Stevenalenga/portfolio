"use client"

import Image from "next/image"
import SiteHeader from "@/components/ui/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { MarketAssets } from "@/components/ui/MarketAssets"
import { Download } from "lucide-react"

// Skills categorized by type
const skills = {
  frontend: ["React", "Javascript", "Typescript", "CSS"],
  backend: ["Nodejs", "Python", "MongoDB", "Postgres", "Sql", "Firebase"],
  devops: ["Docker", "aws"],
  tools: ["Git", "GitHub", "Vercel", "Postman", "Data-Analysis", "Data-Visualisation", "Office"],
}

const projects = [
  {
    title: "E-commerce Platform",
    description: "A full-stack e-commerce solution built with React and Node.js",
    url: "https://github.com/Stevenalenga/onlinestores",
  },
  {
    title: "Task Management App",
    description: "A productivity app created using React Native and Firebase",
    url: "https://github.com/Stevenalenga/todo",
  },
  {
    title: "Data Visualization Dashboard",
    description: "An interactive dashboard built with D3.js and Vue.js",
    url: "https://github.com/Stevenalenga/worko",
  },
  {
    title: "AI Chess",
    description: "A machine learning powered chess using Python and TensorFlow meant to help you improve your game",
    url: "https://github.com/Stevenalenga/AI-Chess",
  },
  {
    title: "My Maps",
    description: "An application meant to share secret spots and locations with friends or general pubic",
    url: "https://github.com/Stevenalenga/maps",
  },
  {
    title: "Portfolio Page",
    description: "A site shows developers skills and projects",
    url: "https://github.com/Stevenalenga/portfolio",
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-zinc-800 text-zinc-100">
      <SiteHeader />
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
              Full-Stack Developer passionate about creating beautiful and functional Web applications, APIs and Mobile
              Apps.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-yellow-300 text-zinc-900 hover:bg-yellow-400 transition-all duration-300">
                <a href="#contact">Get in touch</a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-yellow-300 text-yellow-300 hover:bg-yellow-300 hover:text-zinc-900 transition-all duration-300"
              >
                <a href="/stephen-mola-cv.pdf" download>
                  <Download className="mr-2 h-4 w-4" />
                  Download CV
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20">
          <h2 className="text-3xl font-bold mb-8 text-center">My Skills</h2>

          {/* Frontend Skills */}
          <div className="mb-10">
            <h3 className="text-2xl font-semibold mb-4 text-yellow-300">Frontend</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {skills.frontend.map((skill) => (
                <Card key={skill} className="bg-zinc-800 hover:bg-zinc-700 transition-all duration-300">
                  <CardHeader>
                    <Image
                      src={`/assets/${skill.toLowerCase()}.png`}
                      alt={`${skill} logo`}
                      width={100}
                      height={50}
                      className="mx-auto"
                    />
                  </CardHeader>
                  <CardContent className="text-center">
                    <strong>{skill}</strong>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Backend Skills */}
          <div className="mb-10">
            <h3 className="text-2xl font-semibold mb-4 text-yellow-300">Backend</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {skills.backend.map((skill) => (
                <Card key={skill} className="bg-zinc-800 hover:bg-zinc-700 transition-all duration-300">
                  <CardHeader>
                    <Image
                      src={`/assets/${skill.toLowerCase()}.png`}
                      alt={`${skill} logo`}
                      width={100}
                      height={50}
                      className="mx-auto"
                    />
                  </CardHeader>
                  <CardContent className="text-center">
                    <strong>{skill}</strong>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* DevOps Skills */}
          <div className="mb-10">
            <h3 className="text-2xl font-semibold mb-4 text-yellow-300">DevOps</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {skills.devops.map((skill) => (
                <Card key={skill} className="bg-zinc-800 hover:bg-zinc-700 transition-all duration-300">
                  <CardHeader>
                    <Image
                      src={`/assets/${skill.toLowerCase()}.png`}
                      alt={`${skill} logo`}
                      width={100}
                      height={50}
                      className="mx-auto"
                    />
                  </CardHeader>
                  <CardContent className="text-center">
                    <strong>{skill}</strong>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-yellow-300">Tools</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {skills.tools.map((skill) => (
                <Card key={skill} className="bg-zinc-800 hover:bg-zinc-700 transition-all duration-300">
                  <CardHeader>
                    <Image
                      src={`/assets/${skill.toLowerCase()}.png`}
                      alt={`${skill} logo`}
                      width={100}
                      height={50}
                      className="mx-auto"
                    />
                  </CardHeader>
                  <CardContent className="text-center">
                    <strong>{skill}</strong>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20">
          <h2 className="text-3xl font-bold mb-8 text-center">My Projects</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="bg-zinc-800 hover:bg-zinc-700 transition-all duration-300">
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="outline"
                    asChild
                    className="bg-transparent border-yellow-300 text-yellow-300 hover:bg-yellow-300 hover:text-zinc-900 transition-all duration-300"
                  >
                    <a href={project.url} target="_blank" rel="noopener noreferrer">
                      View Project
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Market Assets Section */}
        <section id="market-assets" className="py-20">
          <h2 className="text-3xl font-bold mb-8 text-center">Market Assets</h2>
          <div className="bg-zinc-800 p-6 rounded-lg shadow-lg">
            <MarketAssets />
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20">
          <h2 className="text-3xl font-bold mb-8 text-center">Get in Touch</h2>
          <Card className="bg-zinc-800">
            <CardContent className="flex flex-col items-center space-y-4 pt-6">
              <p className="text-center mb-4">Feel free to reach out for collaborations or just a friendly hello</p>
              <div className="flex space-x-4">
                {[
                  { name: "GitHub", url: "https://github.com/Stevenalenga", icon: "/socials/github.png" },
                  { name: "LinkedIn", url: "https://www.linkedin.com/in/stephen-mola/", icon: "/socials/linkedin.png" },
                  { name: "Email", url: "mailto:stevenkmola@gmail.com", icon: "/socials/email.png" },
                  { name: "WhatsApp", url: "https://wa.link/f73yev", icon: "/socials/whatsappdark.png" },
                ].map((social) => (
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


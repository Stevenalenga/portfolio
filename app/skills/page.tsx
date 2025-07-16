import Image from "next/image"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { skills } from "@/lib/data"

export default function SkillsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-zinc-800 text-zinc-100">
      <main className="container mx-auto px-4 py-20">
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
      </main>
    </div>
  )
}

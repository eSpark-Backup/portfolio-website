import Image from "next/image"
import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { getProjects } from "@/lib/sanity-queries"
import { urlFor } from "@/lib/sanity"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h1 className="section-heading">My Projects</h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            A selection of projects I've worked on throughout my career. Each project represents a unique challenge and
            solution.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Card key={project._id} className="overflow-hidden">
                <div className="aspect-[16/9] relative">
                  {project.image ? (
                    <Image
                      src={urlFor(project.image).url() || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <Image
                      src="/placeholder.svg?height=300&width=400"
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  {project.link && (
                    <Link
                      href={project.link}
                      className="text-primary hover:text-primary/80 flex items-center"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Project <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-2xl text-center">
          <h2 className="section-subheading">Want to see more?</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            These are just a few examples of my work. If you'd like to see more or discuss a specific type of project,
            please get in touch.
          </p>
        </div>
      </div>
    </div>
  )
}

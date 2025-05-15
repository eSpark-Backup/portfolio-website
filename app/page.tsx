import Link from "next/link"
import { ArrowRight, Download, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getPersonalInfo, getSkills } from "@/lib/sanity-queries"

export default async function Home() {
  const personalInfo = await getPersonalInfo()
  const skills = await getSkills()

  return (
    <div>
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-primary/10 to-background py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">{personalInfo.name}</h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">{personalInfo.title}</p>
            <p className="mt-6 text-lg leading-8">{personalInfo.summary}</p>
            <div className="mt-10 flex items-center gap-x-6">
              <Button asChild>
                <Link href="/contact">
                  Contact Me <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/resume.pdf" download>
                  Download CV <Download className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Overview */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="section-heading">Skills Overview</h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              I specialize in frontend development with a focus on creating responsive, accessible, and
              performance-optimized interfaces.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
              {Object.keys(skills).map((category) => (
                <div key={category}>
                  <dt className="section-subheading">{category}</dt>
                  <dd className="mt-4">
                    <ul className="space-y-2">
                      {skills[category].map((skill: string) => (
                        <li key={skill} className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-primary mr-2" />
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-muted py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Let's work together</h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              I'm currently available for freelance work. If you have a project that you want to get started, think you
              need my help with something, or just want to say hello, then get in touch.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href={`mailto:${personalInfo.email}`}
                className="flex items-center text-primary hover:text-primary/80"
              >
                <Mail className="mr-2 h-5 w-5" />
                {personalInfo.email}
              </Link>
              <Link href={`tel:${personalInfo.phone}`} className="flex items-center text-primary hover:text-primary/80">
                <Phone className="mr-2 h-5 w-5" />
                {personalInfo.phone}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

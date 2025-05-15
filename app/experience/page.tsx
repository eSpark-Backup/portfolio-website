import { getExperiences } from "@/lib/sanity-queries"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function ExperiencePage() {
  const experiences = await getExperiences()

  return (
    <div className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h1 className="section-heading">Work Experience</h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Over 6 years of professional experience in frontend development, working with various technologies and
            clients from around the world.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {experiences.map((exp) => (
              <Card key={exp._id} className="border-l-4 border-primary">
                <CardHeader>
                  <CardTitle>{exp.position}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold">{exp.company}</h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(exp.startDate).toLocaleDateString("en-US", { year: "numeric", month: "long" })} -
                        {exp.current
                          ? " Present"
                          : exp.endDate
                            ? ` ${new Date(exp.endDate).toLocaleDateString("en-US", { year: "numeric", month: "long" })}`
                            : ""}
                      </p>
                      <p className="text-sm text-muted-foreground">{exp.location}</p>
                    </div>
                    <p>{exp.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-2xl lg:mx-0">
          <h2 className="section-subheading">My Approach</h2>
          <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">User-Centric Design</h3>
              <p>
                I prioritize the end-user experience in every project, ensuring that interfaces are intuitive,
                accessible, and enjoyable to use.
              </p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Performance Optimization</h3>
              <p>
                I focus on creating fast, efficient applications that provide a smooth experience across all devices and
                network conditions.
              </p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Clean, Maintainable Code</h3>
              <p>
                I write clean, well-documented code that is easy to maintain and extend, following best practices and
                industry standards.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import { getSkills } from "@/lib/sanity-queries"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function SkillsPage() {
  const skills = await getSkills()

  // Get the category names
  const categories = Object.keys(skills)

  return (
    <div className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h1 className="section-heading">Skills & Expertise</h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            I have expertise in a wide range of technologies and tools, allowing me to tackle various challenges in web
            development.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <Card key={category}>
                <CardHeader>
                  <CardTitle>{category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {skills[category].map((skill: string) => (
                      <li key={skill} className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-primary mr-2" />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-2xl lg:mx-0">
          <h2 className="section-subheading">Development Process</h2>
          <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="border rounded-lg p-6">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground mb-4">
                1
              </div>
              <h3 className="text-lg font-semibold mb-2">Planning</h3>
              <p>Understanding requirements, creating wireframes, and planning the architecture.</p>
            </div>
            <div className="border rounded-lg p-6">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground mb-4">
                2
              </div>
              <h3 className="text-lg font-semibold mb-2">Design</h3>
              <p>Creating responsive designs that provide an excellent user experience across all devices.</p>
            </div>
            <div className="border rounded-lg p-6">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground mb-4">
                3
              </div>
              <h3 className="text-lg font-semibold mb-2">Development</h3>
              <p>Writing clean, efficient, and maintainable code following best practices.</p>
            </div>
            <div className="border rounded-lg p-6">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground mb-4">
                4
              </div>
              <h3 className="text-lg font-semibold mb-2">Testing & Deployment</h3>
              <p>Thorough testing and smooth deployment to ensure a high-quality end product.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

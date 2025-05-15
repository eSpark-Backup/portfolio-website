import Image from "next/image"
import { getPersonalInfo, getEducation } from "@/lib/sanity-queries"
import { urlFor } from "@/lib/sanity"

export default async function AboutPage() {
  const personalInfo = await getPersonalInfo()
  const education = await getEducation()

  return (
    <div className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
          <h1 className="section-heading">About Me</h1>

          <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
            <div>
              <p className="text-lg leading-8">{personalInfo.summary}</p>
              <p className="mt-6 text-lg leading-8">
                I am passionate about developing solutions for a better world. With a strong foundation in frontend
                development and a keen eye for design, I strive to create web applications that not only look great but
                also provide exceptional user experiences.
              </p>
              <p className="mt-6 text-lg leading-8">
                Based in {personalInfo.location}, I have worked with clients from around the world, helping them bring
                their ideas to life through clean, efficient, and maintainable code.
              </p>

              <div className="mt-10">
                <h2 className="section-subheading">Contact Information</h2>
                <ul className="mt-6 space-y-4">
                  <li className="flex items-start">
                    <span className="font-semibold min-w-32">Location:</span>
                    <span>{personalInfo.location}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold min-w-32">Phone:</span>
                    <span>{personalInfo.phone}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold min-w-32">Email:</span>
                    <span>{personalInfo.email}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold min-w-32">LinkedIn:</span>
                    <span>{personalInfo.linkedin}</span>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <div className="aspect-[4/5] relative overflow-hidden rounded-2xl bg-gray-100">
                {personalInfo.profileImage ? (
                  <Image
                    src={urlFor(personalInfo.profileImage).url() || "/placeholder.svg"}
                    alt={personalInfo.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <Image
                    src="/placeholder.svg?height=600&width=480"
                    alt={personalInfo.name}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="section-subheading">Education</h2>
            <div className="mt-6 space-y-8">
              {education.map((edu) => (
                <div key={edu._id} className="border-l-4 border-primary pl-6 py-2">
                  <h3 className="text-lg font-semibold">{edu.institution}</h3>
                  <p className="mt-1 text-muted-foreground">{edu.degree}</p>
                  <p className="mt-1 text-sm">
                    {new Date(edu.startDate).getFullYear()} -{" "}
                    {edu.endDate ? new Date(edu.endDate).getFullYear() : "Present"}
                  </p>
                  {edu.description && <p className="mt-2">{edu.description}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

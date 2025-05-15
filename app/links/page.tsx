"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getPersonalInfo, getLinkTreeItems } from "@/lib/sanity-queries"
import { urlFor } from "@/lib/sanity"
import type { PersonalInfo, LinkTreeItem } from "@/lib/sanity-queries"

export default function LinksPage() {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null)
  const [links, setLinks] = useState<LinkTreeItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const personalInfoData = await getPersonalInfo()
        const linksData = await getLinkTreeItems()

        setPersonalInfo(personalInfoData)
        setLinks(linksData)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading || !personalInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary/10 to-background py-16 px-4 flex flex-col items-center justify-center">
        <div className="text-center">
          <p className="text-lg">Loading links...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 to-background py-16 px-4 flex flex-col items-center">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center mb-10">
          <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-primary">
            {personalInfo.profileImage ? (
              <Image
                src={urlFor(personalInfo.profileImage).url() || "/placeholder.svg"}
                alt={personalInfo.name}
                fill
                className="object-cover"
              />
            ) : (
              <Image
                src="/placeholder.svg?height=200&width=200"
                alt={personalInfo.name}
                fill
                className="object-cover"
              />
            )}
          </div>
          <h1 className="text-2xl font-bold">{personalInfo.name}</h1>
          <p className="text-muted-foreground">{personalInfo.title}</p>
        </div>

        <div className="space-y-4">
          {links.length > 0 ? (
            links.map((link) => (
              <Button
                key={link._id}
                variant="outline"
                className="w-full py-6 flex justify-between items-center hover:bg-muted"
                asChild
              >
                <Link
                  href={link.url}
                  target={link.isExternal ? "_blank" : undefined}
                  rel={link.isExternal ? "noopener noreferrer" : undefined}
                >
                  <div className="flex flex-col items-start">
                    <span className="font-medium">{link.title}</span>
                    {link.description && <span className="text-sm text-muted-foreground">{link.description}</span>}
                  </div>
                  {link.isExternal && <ExternalLink className="h-4 w-4 text-muted-foreground" />}
                </Link>
              </Button>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No links available.</p>
            </div>
          )}
        </div>

        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} {personalInfo.name}
          </p>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ImageModal from "@/components/image-modal"
import { getCertifications, getBadges } from "@/lib/sanity-queries"
import { urlFor } from "@/lib/sanity"
import type { Certification, Badge } from "@/lib/sanity-queries"

export default function CertificationsPage() {
  const [certificates, setCertificates] = useState<Certification[]>([])
  const [badges, setBadges] = useState<Badge[]>([])
  const [selectedCertificate, setSelectedCertificate] = useState<Certification | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const certificatesData = await getCertifications()
        const badgesData = await getBadges()

        setCertificates(certificatesData)
        setBadges(badgesData)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const openModal = (certificate: Certification) => {
    setSelectedCertificate(certificate)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  if (isLoading) {
    return (
      <div className="bg-background py-24 sm:py-32 flex justify-center items-center">
        <div className="text-center">
          <p className="text-lg">Loading certifications...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h1 className="section-heading">Certifications & Badges</h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            A showcase of my professional certifications, achievements, and digital badges.
          </p>
        </div>

        <div className="mt-16">
          <Tabs defaultValue="certificates" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger value="certificates">Certificates</TabsTrigger>
              <TabsTrigger value="badges">Badges</TabsTrigger>
            </TabsList>

            <TabsContent value="certificates" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificates.map((certificate) => (
                  <Card key={certificate._id} className="overflow-hidden">
                    <div className="aspect-[3/4] relative cursor-pointer" onClick={() => openModal(certificate)}>
                      {certificate.image ? (
                        <Image
                          src={urlFor(certificate.image).url() || "/placeholder.svg"}
                          alt={certificate.title}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <Image
                          src="/placeholder.svg?height=800&width=600"
                          alt={certificate.title}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
                        <div className="text-white">
                          <h3 className="font-semibold">{certificate.title}</h3>
                          <p className="text-sm opacity-90">{certificate.issuer}</p>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">{certificate.date}</span>
                        {certificate.url && (
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={certificate.url} target="_blank" rel="noopener noreferrer">
                              <span className="sr-only">View certificate</span>
                              <ExternalLink className="h-4 w-4" />
                            </Link>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="badges" className="mt-8">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {badges.map((badge) => (
                  <Link
                    key={badge._id}
                    href={badge.url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <div className="flex flex-col items-center p-4 border rounded-lg hover:border-primary transition-colors">
                      <div className="relative w-24 h-24 mb-4">
                        {badge.image ? (
                          <Image
                            src={urlFor(badge.image).url() || "/placeholder.svg"}
                            alt={badge.title}
                            fill
                            className="object-contain group-hover:scale-110 transition-transform duration-300"
                          />
                        ) : (
                          <Image
                            src="/placeholder.svg?height=200&width=200"
                            alt={badge.title}
                            fill
                            className="object-contain group-hover:scale-110 transition-transform duration-300"
                          />
                        )}
                      </div>
                      <h3 className="font-medium text-center">{badge.title}</h3>
                      <p className="text-sm text-muted-foreground text-center">{badge.issuer}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Certificate Modal */}
        {selectedCertificate && selectedCertificate.image && (
          <ImageModal
            isOpen={isModalOpen}
            onClose={closeModal}
            imageSrc={urlFor(selectedCertificate.image).url()}
            imageAlt={selectedCertificate.title}
          />
        )}
      </div>
    </div>
  )
}

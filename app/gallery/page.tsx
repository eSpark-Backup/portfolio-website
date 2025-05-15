"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import ImageModal from "@/components/image-modal"
import { getGalleryImages } from "@/lib/sanity-queries"
import { urlFor } from "@/lib/sanity"
import type { GalleryImage } from "@/lib/sanity-queries"

export default function GalleryPage() {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([])
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState("All")
  const [categories, setCategories] = useState<string[]>(["All"])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const images = await getGalleryImages()
        setGalleryImages(images)

        // Extract unique categories
        const uniqueCategories = Array.from(new Set(images.map((img) => img.category)))
        setCategories(["All", ...uniqueCategories])
      } catch (error) {
        console.error("Error fetching gallery images:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredImages =
    activeCategory === "All" ? galleryImages : galleryImages.filter((img) => img.category === activeCategory)

  const openModal = (image: GalleryImage) => {
    setSelectedImage(image)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  if (isLoading) {
    return (
      <div className="bg-background py-24 sm:py-32 flex justify-center items-center">
        <div className="text-center">
          <p className="text-lg">Loading gallery...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h1 className="section-heading">Media Gallery</h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            A collection of images showcasing my work, events, and professional journey.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mt-10 flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.length > 0 ? (
            filteredImages.map((image) => (
              <div
                key={image._id}
                className="group relative aspect-square overflow-hidden rounded-lg bg-gray-100 cursor-pointer transition-transform hover:scale-[1.02]"
                onClick={() => openModal(image)}
              >
                <Image
                  src={urlFor(image.image).url() || "/placeholder.svg"}
                  alt={image.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <div>
                    <h3 className="text-white font-medium">{image.title}</h3>
                    <p className="text-white/80 text-sm">{image.category}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No images found in this category.</p>
            </div>
          )}
        </div>

        {/* Image Modal */}
        {selectedImage && (
          <ImageModal
            isOpen={isModalOpen}
            onClose={closeModal}
            imageSrc={urlFor(selectedImage.image).url()}
            imageAlt={selectedImage.title}
          />
        )}
      </div>
    </div>
  )
}

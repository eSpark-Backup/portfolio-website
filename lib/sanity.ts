import { createClient } from "next-sanity"
import imageUrlBuilder from "@sanity/image-url"
import type { SanityImageSource } from "@sanity/image-url/lib/types/types"

// Ensure the dataset name follows Sanity's requirements
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.toLowerCase() || "production"

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: dataset,
  apiVersion: "2023-05-03", // Use the latest API version
  useCdn: process.env.NODE_ENV === "production", // Use CDN in production
})

// Set up image URL builder
const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// Helper function to handle empty responses
export function handleEmptyResponse<T>(response: T | null, fallback: T): T {
  return response || fallback
}

import { client, handleEmptyResponse } from "./sanity"
import { personalInfo, skills, experiences, education, projects, certificateGallery, badges } from "./data"

// Types for Sanity data
export interface SanityImage {
  _type: "image"
  asset: {
    _ref: string
    _type: "reference"
  }
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
}

export interface PersonalInfo {
  _id: string
  name: string
  title: string
  summary: string
  location: string
  phone: string
  email: string
  linkedin: string
  whatsapp: string
  profileImage?: SanityImage
}

export interface Skill {
  _id: string
  category: string
  name: string
  level?: number
}

export interface Experience {
  _id: string
  company: string
  position: string
  startDate: string
  endDate?: string
  current: boolean
  location: string
  description: string
}

export interface EducationItem {
  _id: string
  institution: string
  degree: string
  startDate: string
  endDate: string
  description?: string
}

export interface Certification {
  _id: string
  title: string
  issuer: string
  date: string
  description?: string
  image?: SanityImage
  url?: string
}

export interface Badge {
  _id: string
  title: string
  issuer: string
  image?: SanityImage
  url?: string
}

export interface Project {
  _id: string
  title: string
  description: string
  technologies: string[]
  image?: SanityImage
  link?: string
}

export interface GalleryImage {
  _id: string
  title: string
  category: string
  image: SanityImage
}

export interface LinkTreeItem {
  _id: string
  title: string
  url: string
  description?: string
  isExternal: boolean
  order: number
}

export interface BlogPost {
  _id: string
  title: string
  slug: {
    current: string
  }
  excerpt: string
  publishedAt: string
  mainImage?: SanityImage
  body: any[] // This would be a Portable Text block
}

// Fetch personal info
export async function getPersonalInfo(): Promise<PersonalInfo> {
  try {
    const data = await client.fetch(`*[_type == "personalInfo"][0]`)
    return handleEmptyResponse(data, personalInfo as unknown as PersonalInfo)
  } catch (error) {
    console.error("Error fetching personal info:", error)
    return personalInfo as unknown as PersonalInfo
  }
}

// Fetch skills grouped by category
export async function getSkills() {
  try {
    const data = await client.fetch(`*[_type == "skill"]`)

    if (!data || data.length === 0) {
      return skills
    }

    // Group skills by category
    const groupedSkills = data.reduce((acc: Record<string, string[]>, skill: Skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = []
      }
      acc[skill.category].push(skill.name)
      return acc
    }, {})

    return groupedSkills
  } catch (error) {
    console.error("Error fetching skills:", error)
    return skills
  }
}

// Fetch experiences
export async function getExperiences(): Promise<Experience[]> {
  try {
    const data = await client.fetch(`
      *[_type == "experience"] | order(startDate desc)
    `)
    return handleEmptyResponse(data, experiences as unknown as Experience[])
  } catch (error) {
    console.error("Error fetching experiences:", error)
    return experiences as unknown as Experience[]
  }
}

// Fetch education
export async function getEducation(): Promise<EducationItem[]> {
  try {
    const data = await client.fetch(`
      *[_type == "education"] | order(startDate desc)
    `)
    return handleEmptyResponse(data, education as unknown as EducationItem[])
  } catch (error) {
    console.error("Error fetching education:", error)
    return education as unknown as EducationItem[]
  }
}

// Fetch certifications
export async function getCertifications(): Promise<Certification[]> {
  try {
    const data = await client.fetch(`
      *[_type == "certification"] | order(date desc)
    `)
    return handleEmptyResponse(data, certificateGallery as unknown as Certification[])
  } catch (error) {
    console.error("Error fetching certifications:", error)
    return certificateGallery as unknown as Certification[]
  }
}

// Fetch badges
export async function getBadges(): Promise<Badge[]> {
  try {
    const data = await client.fetch(`
      *[_type == "badge"]
    `)
    return handleEmptyResponse(data, badges as unknown as Badge[])
  } catch (error) {
    console.error("Error fetching badges:", error)
    return badges as unknown as Badge[]
  }
}

// Fetch projects
export async function getProjects(): Promise<Project[]> {
  try {
    const data = await client.fetch(`
      *[_type == "project"]
    `)
    return handleEmptyResponse(data, projects as unknown as Project[])
  } catch (error) {
    console.error("Error fetching projects:", error)
    return projects as unknown as Project[]
  }
}

// Fetch gallery images
export async function getGalleryImages(): Promise<GalleryImage[]> {
  try {
    const data = await client.fetch(`
      *[_type == "galleryImage"]
    `)
    return handleEmptyResponse(data, [] as GalleryImage[])
  } catch (error) {
    console.error("Error fetching gallery images:", error)
    return [] as GalleryImage[]
  }
}

// Fetch link tree items
export async function getLinkTreeItems(): Promise<LinkTreeItem[]> {
  try {
    const data = await client.fetch(`
      *[_type == "linkTreeItem"] | order(order asc)
    `)
    return handleEmptyResponse(data, [] as LinkTreeItem[])
  } catch (error) {
    console.error("Error fetching link tree items:", error)
    return [] as LinkTreeItem[]
  }
}

// Fetch blog posts
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const data = await client.fetch(`
      *[_type == "post"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        excerpt,
        publishedAt,
        mainImage,
      }
    `)
    return handleEmptyResponse(data, [] as BlogPost[])
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return [] as BlogPost[]
  }
}

// Fetch a single blog post by slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const data = await client.fetch(
      `
      *[_type == "post" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        excerpt,
        publishedAt,
        mainImage,
        body,
      }
    `,
      { slug },
    )
    return data
  } catch (error) {
    console.error(`Error fetching blog post with slug ${slug}:`, error)
    return null
  }
}

// This file provides guidance on how to integrate Sanity.io with this portfolio website
// It's not functional code but serves as documentation for future implementation

/*
SANITY.IO INTEGRATION GUIDE

1. Install Sanity dependencies:
   npm install next-sanity @sanity/image-url

2. Create a Sanity configuration file (sanity.config.ts):

   import { defineConfig } from 'sanity';
   import { deskTool } from 'sanity/desk';
   
   export default defineConfig({
     name: 'portfolio-cms',
     title: 'Portfolio CMS',
     projectId: 'your-project-id',
     dataset: 'production',
     plugins: [deskTool()],
     schema: {
       types: [
         // Define your schema types here
       ],
     },
   });

3. Create Sanity client (lib/sanity.ts):

   import { createClient } from 'next-sanity';
   import imageUrlBuilder from '@sanity/image-url';
   
   export const client = createClient({
     projectId: 'your-project-id',
     dataset: 'production',
     apiVersion: '2023-05-03',
     useCdn: true,
   });
   
   const builder = imageUrlBuilder(client);
   
   export function urlFor(source) {
     return builder.image(source);
   }

4. Example schema definitions (schemas/):

   // Personal Info Schema
   export const personalInfo = {
     name: 'personalInfo',
     title: 'Personal Information',
     type: 'document',
     fields: [
       {
         name: 'name',
         title: 'Name',
         type: 'string',
       },
       {
         name: 'title',
         title: 'Professional Title',
         type: 'string',
       },
       {
         name: 'summary',
         title: 'Professional Summary',
         type: 'text',
       },
       {
         name: 'location',
         title: 'Location',
         type: 'string',
       },
       {
         name: 'phone',
         title: 'Phone',
         type: 'string',
       },
       {
         name: 'email',
         title: 'Email',
         type: 'string',
       },
       {
         name: 'linkedin',
         title: 'LinkedIn URL',
         type: 'string',
       },
       {
         name: 'whatsapp',
         title: 'WhatsApp URL',
         type: 'string',
       },
       {
         name: 'profileImage',
         title: 'Profile Image',
         type: 'image',
         options: {
           hotspot: true,
         },
       },
     ],
   };
   
   // Experience Schema
   export const experience = {
     name: 'experience',
     title: 'Work Experience',
     type: 'document',
     fields: [
       {
         name: 'company',
         title: 'Company',
         type: 'string',
       },
       {
         name: 'position',
         title: 'Position',
         type: 'string',
       },
       {
         name: 'startDate',
         title: 'Start Date',
         type: 'date',
       },
       {
         name: 'endDate',
         title: 'End Date',
         type: 'date',
       },
       {
         name: 'current',
         title: 'Current Position',
         type: 'boolean',
       },
       {
         name: 'location',
         title: 'Location',
         type: 'string',
       },
       {
         name: 'description',
         title: 'Description',
         type: 'text',
       },
     ],
   };
   
   // Project Schema
   export const project = {
     name: 'project',
     title: 'Project',
     type: 'document',
     fields: [
       {
         name: 'title',
         title: 'Title',
         type: 'string',
       },
       {
         name: 'description',
         title: 'Description',
         type: 'text',
       },
       {
         name: 'technologies',
         title: 'Technologies',
         type: 'array',
         of: [{ type: 'string' }],
       },
       {
         name: 'image',
         title: 'Image',
         type: 'image',
         options: {
           hotspot: true,
         },
       },
       {
         name: 'link',
         title: 'Project Link',
         type: 'url',
       },
     ],
   };
   
   // Certificate Schema
   export const certificate = {
     name: 'certificate',
     title: 'Certificate',
     type: 'document',
     fields: [
       {
         name: 'title',
         title: 'Title',
         type: 'string',
       },
       {
         name: 'issuer',
         title: 'Issuer',
         type: 'string',
       },
       {
         name: 'date',
         title: 'Issue Date',
         type: 'date',
       },
       {
         name: 'description',
         title: 'Description',
         type: 'text',
       },
       {
         name: 'image',
         title: 'Certificate Image',
         type: 'image',
         options: {
           hotspot: true,
         },
       },
       {
         name: 'url',
         title: 'Certificate URL',
         type: 'url',
       },
     ],
   };
   
   // Badge Schema
   export const badge = {
     name: 'badge',
     title: 'Badge',
     type: 'document',
     fields: [
       {
         name: 'title',
         title: 'Title',
         type: 'string',
       },
       {
         name: 'issuer',
         title: 'Issuer',
         type: 'string',
       },
       {
         name: 'image',
         title: 'Badge Image',
         type: 'image',
         options: {
           hotspot: true,
         },
       },
       {
         name: 'url',
         title: 'Badge URL',
         type: 'url',
       },
     ],
   };
   
   // Gallery Image Schema
   export const galleryImage = {
     name: 'galleryImage',
     title: 'Gallery Image',
     type: 'document',
     fields: [
       {
         name: 'title',
         title: 'Title',
         type: 'string',
       },
       {
         name: 'category',
         title: 'Category',
         type: 'string',
       },
       {
         name: 'image',
         title: 'Image',
         type: 'image',
         options: {
           hotspot: true,
         },
       },
     ],
   };
   
   // Link Tree Item Schema
   export const linkTreeItem = {
     name: 'linkTreeItem',
     title: 'Link Tree Item',
     type: 'document',
     fields: [
       {
         name: 'title',
         title: 'Title',
         type: 'string',
       },
       {
         name: 'url',
         title: 'URL',
         type: 'url',
       },
       {
         name: 'description',
         title: 'Description',
         type: 'string',
       },
       {
         name: 'isExternal',
         title: 'Is External Link',
         type: 'boolean',
       },
       {
         name: 'order',
         title: 'Display Order',
         type: 'number',
       },
     ],
   };

5. Example query to fetch data:

   // Fetch personal info
   export async function getPersonalInfo() {
     return client.fetch(`*[_type == "personalInfo"][0]`);
   }
   
   // Fetch experiences
   export async function getExperiences() {
     return client.fetch(`*[_type == "experience"] | order(startDate desc)`);
   }
   
   // Fetch projects
   export async function getProjects() {
     return client.fetch(`*[_type == "project"]`);
   }
   
   // Fetch certificates
   export async function getCertificates() {
     return client.fetch(`*[_type == "certificate"] | order(date desc)`);
   }
   
   // Fetch badges
   export async function getBadges() {
     return client.fetch(`*[_type == "badge"]`);
   }
   
   // Fetch gallery images
   export async function getGalleryImages() {
     return client.fetch(`*[_type == "galleryImage"]`);
   }
   
   // Fetch link tree items
   export async function getLinkTreeItems() {
     return client.fetch(`*[_type == "linkTreeItem"] | order(order asc)`);
   }

6. Example usage in a component:

   import { getProjects } from '@/lib/sanity-queries';
   import { urlFor } from '@/lib/sanity';
   
   export default async function ProjectsPage() {
     const projects = await getProjects();
     
     return (
       <div>
         {projects.map((project) => (
           <div key={project._id}>
             <h2>{project.title}</h2>
             <p>{project.description}</p>
             <img src={urlFor(project.image).url() || "/placeholder.svg"} alt={project.title} />
           </div>
         ))}
       </div>
     );
   }
*/

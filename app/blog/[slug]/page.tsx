import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getBlogPostBySlug } from "@/lib/sanity-queries"
import { urlFor } from "@/lib/sanity"
import { PortableText } from "@portabletext/react"

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug)

  if (!post) {
    return (
      <div className="bg-background py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold">Blog Post Not Found</h1>
          <p className="mt-6">The blog post you're looking for doesn't exist or has been removed.</p>
          <Button variant="ghost" asChild className="mt-8">
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="mb-8">
          <Button variant="ghost" asChild>
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>

        <article>
          <header className="mb-10">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">{post.title}</h1>
            <div className="flex items-center text-muted-foreground">
              <span>{formatDate(post.publishedAt)}</span>
            </div>
          </header>

          {post.mainImage && (
            <div className="aspect-[2/1] relative mb-10">
              <Image
                src={urlFor(post.mainImage).url() || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          )}

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <PortableText value={post.body} />
          </div>
        </article>

        <div className="mt-16 border-t pt-8">
          <h2 className="text-xl font-semibold mb-4">Share this article</h2>
          <div className="flex space-x-4">
            <Button variant="outline" size="sm">
              Twitter
            </Button>
            <Button variant="outline" size="sm">
              LinkedIn
            </Button>
            <Button variant="outline" size="sm">
              Facebook
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

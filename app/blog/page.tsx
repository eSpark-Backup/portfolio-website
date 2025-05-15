import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { getBlogPosts } from "@/lib/sanity-queries"
import { urlFor } from "@/lib/sanity"

export default async function BlogPage() {
  const blogPosts = await getBlogPosts()

  // Format date function
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h1 className="section-heading">Blog</h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Thoughts, insights, and updates on web development, design, and technology.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl lg:mx-0 lg:max-w-none">
          {blogPosts.length > 0 ? (
            <div className="grid grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-2">
              {blogPosts.map((post) => (
                <Card key={post._id} className="overflow-hidden">
                  <div className="aspect-[16/9] relative">
                    {post.mainImage ? (
                      <Image
                        src={urlFor(post.mainImage).url() || "/placeholder.svg"}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <Image
                        src="/placeholder.svg?height=300&width=600"
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <CardContent className="p-6">
                    <div className="text-sm text-muted-foreground mb-2">{formatDate(post.publishedAt)}</div>
                    <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                    <p className="text-muted-foreground">{post.excerpt}</p>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Button variant="link" asChild className="px-0">
                      <Link href={`/blog/${post.slug.current}`}>
                        Read more <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No blog posts available yet. Check back soon!</p>
            </div>
          )}
        </div>

        <div className="mx-auto mt-16 max-w-2xl text-center">
          <h2 className="section-subheading">Subscribe to My Newsletter</h2>
          <p className="mt-4 text-muted-foreground">
            Get the latest articles and updates delivered straight to your inbox.
          </p>
          <div className="mt-6 flex max-w-md mx-auto gap-x-4">
            <Input type="email" placeholder="Enter your email" className="min-w-0 flex-auto" />
            <Button type="submit">Subscribe</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

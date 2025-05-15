import Link from "next/link"
import { Github, Linkedin, Mail, Phone } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-muted py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-xl font-bold">Syed Ali Naqi Hasni</h2>
            <p className="mt-2 text-muted-foreground">Senior Frontend Developer</p>
          </div>
          <div className="flex space-x-6">
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground"
            >
              <span className="sr-only">GitHub</span>
              <Github className="h-6 w-6" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/syedalinaqihasni-frontend-developer"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground"
            >
              <span className="sr-only">LinkedIn</span>
              <Linkedin className="h-6 w-6" />
            </Link>
            <Link href="mailto:engr.syedalinaqihasni@gmail.com" className="text-muted-foreground hover:text-foreground">
              <span className="sr-only">Email</span>
              <Mail className="h-6 w-6" />
            </Link>
            <Link href="tel:+923162265948" className="text-muted-foreground hover:text-foreground">
              <span className="sr-only">Phone</span>
              <Phone className="h-6 w-6" />
            </Link>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-900/10 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            <Link href="/about" className="text-sm leading-6 text-muted-foreground hover:text-foreground">
              About
            </Link>
            <Link href="/experience" className="text-sm leading-6 text-muted-foreground hover:text-foreground">
              Experience
            </Link>
            <Link href="/contact" className="text-sm leading-6 text-muted-foreground hover:text-foreground">
              Contact
            </Link>
          </div>
          <p className="mt-8 text-xs leading-5 text-muted-foreground md:order-1 md:mt-0">
            &copy; {new Date().getFullYear()} Syed Ali Naqi Hasni. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

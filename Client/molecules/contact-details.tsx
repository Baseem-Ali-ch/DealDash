import { Building, Phone, Mail, Clock, Facebook, Twitter, Instagram, Youtube, Linkedin } from "lucide-react"

interface ContactDetailsProps {
  company: {
    name: string
    address: string
    phone: string
    email: string
    hours: {
      days: string
      hours: string
    }[]
    socialMedia: {
      platform: string
      url: string
    }[]
  }
}

export function ContactDetails({ company }: ContactDetailsProps) {
  // Function to render the appropriate social media icon
  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "facebook":
        return <Facebook className="h-5 w-5" />
      case "twitter":
        return <Twitter className="h-5 w-5" />
      case "instagram":
        return <Instagram className="h-5 w-5" />
      case "youtube":
        return <Youtube className="h-5 w-5" />
      case "linkedin":
        return <Linkedin className="h-5 w-5" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start space-x-4">
        <Building className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
        <div>
          <h3 className="font-medium">{company.name}</h3>
          <address className="mt-1 not-italic text-muted-foreground">{company.address}</address>
        </div>
      </div>

      <div className="flex items-start space-x-4">
        <Phone className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
        <div>
          <h3 className="font-medium">Phone</h3>
          <p className="mt-1 text-muted-foreground">
            <a href={`tel:${company.phone.replace(/\D/g, "")}`} className="hover:text-primary">
              {company.phone}
            </a>
          </p>
        </div>
      </div>

      <div className="flex items-start space-x-4">
        <Mail className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
        <div>
          <h3 className="font-medium">Email</h3>
          <p className="mt-1 text-muted-foreground">
            <a href={`mailto:${company.email}`} className="hover:text-primary">
              {company.email}
            </a>
          </p>
        </div>
      </div>

      <div className="flex items-start space-x-4">
        <Clock className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
        <div>
          <h3 className="font-medium">Business Hours</h3>
          <ul className="mt-1 space-y-1 text-muted-foreground">
            {company.hours.map((item, index) => (
              <li key={index} className="flex justify-between">
                <span>{item.days}</span>
                <span className="ml-4 font-medium">{item.hours}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex items-center space-x-4 pt-2">
        {company.socialMedia.map((social, index) => (
          <a
            key={index}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-muted p-2 text-muted-foreground hover:bg-primary hover:text-white transition-colors"
            aria-label={`Follow us on ${social.platform}`}
          >
            {getSocialIcon(social.platform)}
          </a>
        ))}
      </div>
    </div>
  )
}

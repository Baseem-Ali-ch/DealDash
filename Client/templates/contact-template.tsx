"use client"

import { Header } from "@/organisms/header"
import { Footer } from "@/organisms/footer"
import { ContactForm } from "@/molecules/contact-form"
import { ContactDetails } from "@/molecules/contact-details"
import { MapComponent } from "@/molecules/map-component"
import { FAQAccordion } from "@/molecules/faq-accordion"
import { NewsletterSignup } from "@/molecules/newsletter-signup"
import { LiveChatButton } from "@/molecules/live-chat-button"

// Company information
const companyInfo = {
  name: "DealDash",
  address: "123 Commerce Street, New York, NY 10001, United States",
  phone: "+1 (555) 123-4567",
  email: "support@dealdash.com",
  hours: [
    { days: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
    { days: "Saturday", hours: "10:00 AM - 4:00 PM" },
    { days: "Sunday", hours: "Closed" },
  ],
  socialMedia: [
    { platform: "Facebook", url: "https://facebook.com" },
    { platform: "Twitter", url: "https://twitter.com" },
    { platform: "Instagram", url: "https://instagram.com" },
    { platform: "LinkedIn", url: "https://linkedin.com" },
  ],
}

// FAQ data
const faqs = [
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy for all items. Products must be in their original condition with tags attached. Please note that shipping costs are non-refundable.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "Standard shipping typically takes 3-5 business days within the continental United States. Express shipping options are available at checkout for 1-2 business day delivery.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes, we ship to most countries worldwide. International shipping times vary by location, typically taking 7-14 business days. Additional customs fees may apply.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order ships, you'll receive a tracking number via email. You can also view your order status by logging into your account on our website.",
  },
  {
    question: "Are there any discounts for bulk orders?",
    answer:
      "Yes, we offer special pricing for bulk orders. Please contact our sales team at sales@dealdash.com for a custom quote based on your specific requirements.",
  },
]

export function ContactTemplate() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary/5 dark:bg-primary/10">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-3xl font-bold md:text-5xl">Get in Touch</h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Have questions about our products or services? Our team is here to help you.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form and Details Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold">Send Us a Message</h2>
              <p className="mt-2 text-muted-foreground">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold">Contact Information</h2>
              <p className="mt-2 text-muted-foreground">You can also reach us using the information below.</p>
              <div className="mt-6">
                <ContactDetails company={companyInfo} />
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold">Our Location</h2>
          <p className="mt-2 text-muted-foreground">Visit our store at the address below.</p>
          <div className="mt-6">
            <MapComponent address={companyInfo.address} />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-muted">
          <div className="container mx-auto px-4 py-16">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-2xl font-bold text-center">Frequently Asked Questions</h2>
              <p className="mt-2 text-center text-muted-foreground">
                Find answers to common questions about our products and services.
              </p>
              <div className="mt-8">
                <FAQAccordion faqs={faqs} />
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="bg-primary/5 dark:bg-primary/10">
          <div className="container mx-auto px-4 py-16">
            <div className="mx-auto max-w-xl text-center">
              <h2 className="text-2xl font-bold">Subscribe to Our Newsletter</h2>
              <p className="mt-2 text-muted-foreground">
                Stay updated with the latest products, exclusive offers, and helpful tips.
              </p>
              <div className="mt-6">
                <NewsletterSignup />
              </div>
            </div>
          </div>
        </section>

        {/* Live Chat Button */}
        <LiveChatButton />
      </main>

      <Footer />
    </div>
  )
}

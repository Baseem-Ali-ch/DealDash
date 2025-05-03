import { CountdownTimer } from "@/molecules/countdown-timer"
import { Button } from "@/atoms/button"
import Image from "next/image"

// Set end date to 7 days from now
const endDate = new Date()
endDate.setDate(endDate.getDate() + 7)

export function SpecialOffers() {
  return (
    <section className="py-12 md:py-16 bg-primary/5 dark:bg-primary/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold">Special Offers</h2>
          <p className="text-muted-foreground mt-2">Limited time deals you don't want to miss</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-background rounded-lg shadow-md overflow-hidden">
            <div className="relative aspect-[16/9]">
              <Image
                src="/placeholder.svg?height=400&width=800"
                alt="Special offer"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute top-4 left-4 bg-highlight text-white px-3 py-1 rounded-full text-sm font-medium">
                30% OFF
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Summer Collection Sale</h3>
              <p className="text-muted-foreground mb-4">
                Get 30% off on all summer collection items. Limited time offer.
              </p>

              <div className="mb-4">
                <p className="text-sm font-medium mb-2">Offer ends in:</p>
                <CountdownTimer endTime={endDate} />
              </div>

              <Button className="w-full">Shop Now</Button>
            </div>
          </div>

          <div className="bg-background rounded-lg shadow-md overflow-hidden">
            <div className="relative aspect-[16/9]">
              <Image
                src="/placeholder.svg?height=400&width=800"
                alt="Special offer"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute top-4 left-4 bg-highlight text-white px-3 py-1 rounded-full text-sm font-medium">
                BUY 1 GET 1
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Accessories Bundle</h3>
              <p className="text-muted-foreground mb-4">
                Buy one accessory and get another one free. Mix and match from our collection.
              </p>

              <div className="mb-4">
                <p className="text-sm font-medium mb-2">Offer ends in:</p>
                <CountdownTimer endTime={endDate} />
              </div>

              <Button className="w-full">Shop Now</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

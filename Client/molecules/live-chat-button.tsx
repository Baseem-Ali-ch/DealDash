"use client"

import { useState } from "react"
import { Button } from "@/atoms/button"
import { MessageSquare, X } from "lucide-react"

export function LiveChatButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="animate-in fade-in slide-in-from-bottom-5 w-72 rounded-lg border bg-background shadow-lg">
          <div className="flex items-center justify-between border-b p-4">
            <h3 className="font-medium">Live Chat</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1 hover:bg-muted"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="flex h-64 flex-col justify-between p-4">
            <div className="space-y-2 overflow-auto">
              <div className="rounded-lg bg-primary/10 p-3 text-sm">
                <p className="font-medium">Support Agent</p>
                <p>Hello 👋 How can I help you today?</p>
              </div>
            </div>
            <div className="mt-4">
              <textarea
                className="w-full resize-none rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                placeholder="Type your message..."
                rows={2}
              />
              <Button className="mt-2 w-full">Send</Button>
            </div>
          </div>
        </div>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          className="h-12 w-12 rounded-full shadow-lg"
          aria-label="Open live chat"
        >
          <MessageSquare className="h-5 w-5" />
        </Button>
      )}
    </div>
  )
}

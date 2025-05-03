"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CustomerTag } from "@/molecules/customer-tag"
import { PlusCircle } from "lucide-react"

interface CustomerSegmentationProps {
  customerId: string
  initialTags: string[]
  onAddTag: (customerId: string, tag: string) => Promise<void>
  onRemoveTag: (customerId: string, tag: string) => Promise<void>
}

export function CustomerSegmentation({ customerId, initialTags, onAddTag, onRemoveTag }: CustomerSegmentationProps) {
  const [tags, setTags] = useState<string[]>(initialTags)
  const [newTag, setNewTag] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAddTag = async () => {
    if (!newTag.trim()) return

    // Check if tag already exists
    if (tags.includes(newTag.trim())) {
      setNewTag("")
      return
    }

    setIsSubmitting(true)
    try {
      await onAddTag(customerId, newTag.trim())
      setTags([...tags, newTag.trim()])
      setNewTag("")
    } catch (error) {
      console.error("Failed to add tag:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRemoveTag = async (tagToRemove: string) => {
    try {
      await onRemoveTag(customerId, tagToRemove)
      setTags(tags.filter((tag) => tag !== tagToRemove))
    } catch (error) {
      console.error("Failed to remove tag:", error)
    }
  }

  // Predefined tags for quick selection
  const suggestedTags = ["VIP", "High Value", "Loyal", "New", "At Risk", "Churned", "Wholesale"].filter(
    (tag) => !tags.includes(tag),
  )

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          placeholder="Add a tag..."
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          className="flex-1"
        />
        <Button onClick={handleAddTag} disabled={!newTag.trim() || isSubmitting} className="flex-shrink-0">
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Tag
        </Button>
      </div>

      {suggestedTags.length > 0 && (
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Suggested tags:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedTags.map((tag) => (
              <Button
                key={tag}
                variant="outline"
                size="sm"
                onClick={() => {
                  setNewTag(tag)
                }}
              >
                {tag}
              </Button>
            ))}
          </div>
        </div>
      )}

      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Current tags:</p>
        <div className="flex flex-wrap gap-2">
          {tags.length > 0 ? (
            tags.map((tag) => <CustomerTag key={tag} tag={tag} onRemove={() => handleRemoveTag(tag)} />)
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">No tags yet. Add tags to segment this customer.</p>
          )}
        </div>
      </div>
    </div>
  )
}

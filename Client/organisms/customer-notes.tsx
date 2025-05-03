"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, Trash2 } from "lucide-react"

interface Note {
  id: string
  content: string
  createdAt: string
  createdBy: string
}

interface CustomerNotesProps {
  initialNotes: Note[]
  onAddNote: (content: string) => Promise<void>
  onDeleteNote: (id: string) => Promise<void>
}

export function CustomerNotes({ initialNotes, onAddNote, onDeleteNote }: CustomerNotesProps) {
  const [notes, setNotes] = useState<Note[]>(initialNotes)
  const [newNote, setNewNote] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAddNote = async () => {
    if (!newNote.trim()) return

    setIsSubmitting(true)
    try {
      await onAddNote(newNote)
      // In a real app, the API would return the new note with an ID
      // For now, we'll simulate it
      const mockNewNote: Note = {
        id: `note_${Date.now()}`,
        content: newNote,
        createdAt: new Date().toISOString(),
        createdBy: "Current Admin User",
      }
      setNotes([mockNewNote, ...notes])
      setNewNote("")
    } catch (error) {
      console.error("Failed to add note:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteNote = async (id: string) => {
    try {
      await onDeleteNote(id)
      setNotes(notes.filter((note) => note.id !== id))
    } catch (error) {
      console.error("Failed to delete note:", error)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Notes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Textarea
            placeholder="Add a note about this customer..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="min-h-[80px]"
          />
          <Button onClick={handleAddNote} disabled={!newNote.trim() || isSubmitting} className="flex-shrink-0">
            <PlusCircle className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>

        <div className="space-y-3 mt-4">
          {notes.length > 0 ? (
            notes.map((note) => (
              <div key={note.id} className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md relative group">
                <div className="flex justify-between items-start">
                  <p className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-wrap">{note.content}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteNote(note.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-2 right-2 h-6 w-6 p-0"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                    <span className="sr-only">Delete note</span>
                  </Button>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Added by {note.createdBy} on {new Date(note.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
              No notes yet. Add one to keep track of important customer information.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

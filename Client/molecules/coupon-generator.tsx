"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { RefreshCw } from "lucide-react"

interface CouponGeneratorProps {
  onGenerate: (code: string) => void
}

export function CouponGenerator({ onGenerate }: CouponGeneratorProps) {
  const [prefix, setPrefix] = useState("DEAL")
  const [length, setLength] = useState(8)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeLetters, setIncludeLetters] = useState(true)
  const [generatedCode, setGeneratedCode] = useState("")

  const generateCode = () => {
    const charset = [...(includeLetters ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : ""), ...(includeNumbers ? "0123456789" : "")]

    if (charset.length === 0) {
      setGeneratedCode("Please select at least one character type")
      return
    }

    let result = prefix ? `${prefix}-` : ""
    for (let i = 0; i < length; i++) {
      result += charset[Math.floor(Math.random() * charset.length)]
    }

    setGeneratedCode(result)
    onGenerate(result)
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="prefix">Prefix</Label>
          <Input
            id="prefix"
            value={prefix}
            onChange={(e) => setPrefix(e.target.value.toUpperCase())}
            placeholder="SUMMER"
            maxLength={10}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="length">Length: {length}</Label>
          <Slider
            id="length"
            min={4}
            max={12}
            step={1}
            value={[length]}
            onValueChange={(value) => setLength(value[0])}
          />
        </div>
      </div>

      <div className="flex space-x-4">
        <div className="flex items-center space-x-2">
          <Switch id="includeNumbers" checked={includeNumbers} onCheckedChange={setIncludeNumbers} />
          <Label htmlFor="includeNumbers">Include Numbers</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="includeLetters" checked={includeLetters} onCheckedChange={setIncludeLetters} />
          <Label htmlFor="includeLetters">Include Letters</Label>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Button onClick={generateCode} variant="outline" size="sm">
          <RefreshCw className="mr-2 h-4 w-4" />
          Generate
        </Button>
        {generatedCode && (
          <div className="text-sm font-mono bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded">{generatedCode}</div>
        )}
      </div>
    </div>
  )
}

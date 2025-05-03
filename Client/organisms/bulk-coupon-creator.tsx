"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CouponCode } from "@/atoms/coupon-code"
import { Download, RefreshCw } from "lucide-react"

interface BulkCouponCreatorProps {
  onGenerate: (codes: string[]) => void
}

export function BulkCouponCreator({ onGenerate }: BulkCouponCreatorProps) {
  const [prefix, setPrefix] = useState("SUMMER")
  const [quantity, setQuantity] = useState(10)
  const [length, setLength] = useState(8)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeLetters, setIncludeLetters] = useState(true)
  const [generatedCodes, setGeneratedCodes] = useState<string[]>([])

  const generateCodes = () => {
    const charset = [...(includeLetters ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : ""), ...(includeNumbers ? "0123456789" : "")]

    if (charset.length === 0) {
      alert("Please select at least one character type")
      return
    }

    const codes: string[] = []
    const usedCodes = new Set()

    for (let i = 0; i < quantity; i++) {
      let code = prefix ? `${prefix}-` : ""
      for (let j = 0; j < length; j++) {
        code += charset[Math.floor(Math.random() * charset.length)]
      }

      if (usedCodes.has(code)) {
        i-- // Try again if we generated a duplicate
      } else {
        usedCodes.add(code)
        codes.push(code)
      }
    }

    setGeneratedCodes(codes)
    onGenerate(codes)
  }

  const downloadCSV = () => {
    if (generatedCodes.length === 0) return

    const csvContent = "data:text/csv;charset=utf-8," + generatedCodes.join("\n")
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `${prefix}-coupons.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bulk Coupon Generator</CardTitle>
        <CardDescription>Generate multiple coupon codes for marketing campaigns</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="prefix">Prefix</Label>
            <Input
              id="prefix"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value.toUpperCase())}
              placeholder="SUMMER"
              maxLength={10}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">Common prefix for all generated codes</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity: {quantity}</Label>
            <Slider
              id="quantity"
              min={1}
              max={100}
              step={1}
              value={[quantity]}
              onValueChange={(value) => setQuantity(value[0])}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">Number of unique codes to generate</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="length">Code Length: {length}</Label>
            <Slider
              id="length"
              min={4}
              max={12}
              step={1}
              value={[length]}
              onValueChange={(value) => setLength(value[0])}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">Length of the random part (excluding prefix)</p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch id="includeNumbers" checked={includeNumbers} onCheckedChange={setIncludeNumbers} />
              <Label htmlFor="includeNumbers">Include Numbers</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="includeLetters" checked={includeLetters} onCheckedChange={setIncludeLetters} />
              <Label htmlFor="includeLetters">Include Letters</Label>
            </div>
          </div>
        </div>

        <Button onClick={generateCodes} className="w-full">
          <RefreshCw className="mr-2 h-4 w-4" />
          Generate {quantity} Codes
        </Button>

        {generatedCodes.length > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Generated Codes</Label>
              <Button variant="outline" size="sm" onClick={downloadCSV}>
                <Download className="mr-2 h-4 w-4" />
                Download CSV
              </Button>
            </div>
            <div className="max-h-60 overflow-y-auto border rounded-md p-2">
              {generatedCodes.length <= 10 ? (
                <div className="space-y-2">
                  {generatedCodes.map((code, index) => (
                    <div key={index} className="flex items-center">
                      <span className="w-8 text-gray-500 dark:text-gray-400">{index + 1}.</span>
                      <CouponCode code={code} />
                    </div>
                  ))}
                </div>
              ) : (
                <Textarea readOnly value={generatedCodes.join("\n")} className="font-mono text-xs h-40" />
              )}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-xs text-gray-500 dark:text-gray-400">
        Generated codes are guaranteed to be unique within this batch.
      </CardFooter>
    </Card>
  )
}

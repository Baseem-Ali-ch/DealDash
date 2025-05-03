"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, FileText, AlertCircle, Check } from "lucide-react"

export function ImportProductsModal({ isOpen, onClose }) {
  const [file, setFile] = useState(null)
  const [step, setStep] = useState(1)
  const [options, setOptions] = useState({
    overwriteExisting: true,
    importImages: true,
    skipErrors: false,
  })
  const [isUploading, setIsUploading] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState(null)

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile && (selectedFile.type === "text/csv" || selectedFile.name.endsWith(".csv"))) {
      setFile(selectedFile)
    } else {
      setFile(null)
    }
  }

  // Handle option change
  const handleOptionChange = (option, checked) => {
    setOptions((prev) => ({ ...prev, [option]: checked }))
  }

  // Handle upload
  const handleUpload = () => {
    if (!file) return

    setIsUploading(true)

    // Simulate upload delay
    setTimeout(() => {
      setIsUploading(false)
      setStep(2)
    }, 1500)
  }

  // Handle process
  const handleProcess = () => {
    setIsProcessing(true)

    // Simulate processing delay
    setTimeout(() => {
      setIsProcessing(false)
      setResult({
        total: 120,
        imported: 118,
        errors: 2,
        warnings: 3,
      })
      setStep(3)
    }, 2000)
  }

  // Handle close
  const handleClose = () => {
    setFile(null)
    setStep(1)
    setOptions({
      overwriteExisting: true,
      importImages: true,
      skipErrors: false,
    })
    setResult(null)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Import Products</DialogTitle>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="csv-file">Upload CSV File</Label>
              <div className="mt-2">
                {file ? (
                  <div className="flex items-center p-4 border rounded-md">
                    <FileText className="h-6 w-6 text-primary mr-2" />
                    <div className="flex-1">
                      <p className="font-medium">{file.name}</p>
                      <p className="text-sm text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setFile(null)}>
                      Change
                    </Button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center h-32 cursor-pointer border-2 border-dashed rounded-md border-gray-300 hover:border-gray-400 transition-colors">
                    <Upload className="h-10 w-10 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">Click to upload or drag and drop</span>
                    <span className="text-xs text-gray-400">CSV files only</span>
                    <input
                      id="csv-file"
                      type="file"
                      accept=".csv,text/csv"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="overwriteExisting"
                  checked={options.overwriteExisting}
                  onCheckedChange={(checked) => handleOptionChange("overwriteExisting", checked)}
                />
                <Label htmlFor="overwriteExisting">Overwrite existing products</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="importImages"
                  checked={options.importImages}
                  onCheckedChange={(checked) => handleOptionChange("importImages", checked)}
                />
                <Label htmlFor="importImages">Import images from URLs in CSV</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="skipErrors"
                  checked={options.skipErrors}
                  onCheckedChange={(checked) => handleOptionChange("skipErrors", checked)}
                />
                <Label htmlFor="skipErrors">Skip rows with errors</Label>
              </div>
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Make sure your CSV file follows the required format.
                <a href="#" className="text-primary hover:underline ml-1">
                  Download template
                </a>
              </AlertDescription>
            </Alert>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="text-center py-4">
              <Check className="h-10 w-10 text-green-500 mx-auto mb-2" />
              <h3 className="text-lg font-medium">File Uploaded Successfully</h3>
              <p className="text-gray-500">Your file has been uploaded and is ready to be processed.</p>
            </div>

            <div className="border rounded-md p-4">
              <h4 className="font-medium mb-2">File Details</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-gray-500">Filename</p>
                  <p>{file?.name}</p>
                </div>
                <div>
                  <p className="text-gray-500">Size</p>
                  <p>{(file?.size / 1024).toFixed(2)} KB</p>
                </div>
                <div>
                  <p className="text-gray-500">Estimated Products</p>
                  <p>120</p>
                </div>
              </div>
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                This will import products based on your selected options. The process cannot be interrupted once
                started.
              </AlertDescription>
            </Alert>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div className="text-center py-4">
              <Check className="h-10 w-10 text-green-500 mx-auto mb-2" />
              <h3 className="text-lg font-medium">Import Completed</h3>
              <p className="text-gray-500">Your products have been imported successfully.</p>
            </div>

            <div className="border rounded-md p-4">
              <h4 className="font-medium mb-2">Import Results</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-gray-500">Total Products</p>
                  <p>{result?.total}</p>
                </div>
                <div>
                  <p className="text-gray-500">Successfully Imported</p>
                  <p className="text-green-500">{result?.imported}</p>
                </div>
                <div>
                  <p className="text-gray-500">Errors</p>
                  <p className="text-red-500">{result?.errors}</p>
                </div>
                <div>
                  <p className="text-gray-500">Warnings</p>
                  <p className="text-amber-500">{result?.warnings}</p>
                </div>
              </div>
            </div>

            {result?.errors > 0 && (
              <Button variant="outline" className="w-full">
                Download Error Log
              </Button>
            )}
          </div>
        )}

        <DialogFooter className="mt-6">
          {step === 1 && (
            <>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={handleUpload} disabled={!file || isUploading}>
                {isUploading ? "Uploading..." : "Upload & Continue"}
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button onClick={handleProcess} disabled={isProcessing}>
                {isProcessing ? "Processing..." : "Process Import"}
              </Button>
            </>
          )}

          {step === 3 && <Button onClick={handleClose}>Close</Button>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

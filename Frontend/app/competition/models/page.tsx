"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { FileUpload } from "@/components/ui/file-upload"
import { useAuth } from "@/contexts/auth-context"
import { Upload } from "lucide-react"

interface Model {
  id: number
  name: string
  path: string
  user_id: number
  rating?: number
  win_rate?: number
}

export default function ModelsPage() {
  const [selectedModel, setSelectedModel] = useState<string | null>(null)
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
  const [models, setModels] = useState<Model[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  const fetchModels = async () => {
    try {
      const token = localStorage.getItem("access_token")
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/models/`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setModels(data)
      }
    } catch (error) {
      console.error("Failed to fetch models:", error)
    } finally {
      setLoading(false)
    }
  }

  // Fetch models on component mount
  useEffect(() => {
    fetchModels()
  }, [])

  const handleFileUpload = async (file: File) => {
    if (!user) {
      throw new Error("ログインが必要です")
    }

    const token = localStorage.getItem("access_token")
    if (!token) {
      throw new Error("認証トークンが見つかりません")
    }

    const formData = new FormData()
    formData.append("model_file", file)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/models/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || "アップロードに失敗しました")
      }

      const result = await response.json()
      console.log("Upload successful:", result)
      
      // Close dialog and refresh the models list
      setUploadDialogOpen(false)
      await fetchModels()
      
    } catch (error) {
      console.error("Upload error:", error)
      throw error
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Your Models</h2>
        <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Upload New Model
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>新しいモデルをアップロード</DialogTitle>
              <DialogDescription>
                ZIPファイル形式でモデルをアップロードしてください。ファイルには必要なモデルファイルとコードが含まれている必要があります。
              </DialogDescription>
            </DialogHeader>
            <FileUpload
              onUpload={handleFileUpload}
              maxSize={100}
              className="mt-4"
            />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Model Name</TableHead>
                <TableHead>Framework</TableHead>
                <TableHead>Win Rate</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    モデルを読み込み中...
                  </TableCell>
                </TableRow>
              ) : models.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    アップロードされたモデルがありません。上の「Upload New Model」ボタンからZIPファイルをアップロードしてください。
                  </TableCell>
                </TableRow>
              ) : (
                models.map((model) => (
                  <TableRow key={model.id}>
                    <TableCell className="font-medium">{model.name}</TableCell>
                    <TableCell>ZIP Archive</TableCell>
                    <TableCell>{model.win_rate ? `${(model.win_rate * 100).toFixed(1)}%` : "N/A"}</TableCell>
                    <TableCell>最近</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        Uploaded
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Model Performance</CardTitle>
          <CardDescription>Compare the performance of your models</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center border rounded-md bg-muted/40">
            <p className="text-muted-foreground">Performance chart will be displayed here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

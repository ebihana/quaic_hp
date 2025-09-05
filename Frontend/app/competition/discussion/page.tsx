"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/auth-context"

type Thread = {
  id: number
  title: string
  body: string
  author_id: number
  created_at: string
}

export default function DiscussionPage() {
  const [threads, setThreads] = useState<Thread[]>([])
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  // スレッド一覧取得
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/threads/`)
      .then(res => res.json())
      .then(data => setThreads(data))
      .catch(err => {
        console.error("スレッド取得エラー:", err)
        setError("スレッド一覧の取得に失敗しました")
      })
  }, [])

  // 新規スレッド作成
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    const token = localStorage.getItem("access_token")
    
    if (!token) {
      setError("認証トークンが見つかりません。再度ログインしてください。")
      setLoading(false)
      return
    }

    if (!user) {
      setError("ユーザー情報が見つかりません。再度ログインしてください。")
      setLoading(false)
      return
    }

    console.log("投稿データ:", { title, body, user: user.id, token: token.substring(0, 20) + "..." })
    console.log("トークン全体:", token)

    // まず認証テストを実行
    try {
      const authTestRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/debug/auth`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      })
      
      console.log("認証テスト結果:", authTestRes.status)
      if (!authTestRes.ok) {
        const authError = await authTestRes.text()
        console.error("認証テストエラー:", authError)
        setError("認証に失敗しました。再度ログインしてください。")
        setLoading(false)
        return
      }
      
      const authData = await authTestRes.json()
      console.log("認証テスト成功:", authData)
    } catch (authErr) {
      console.error("認証テスト例外:", authErr)
      setError("認証テストでエラーが発生しました。")
      setLoading(false)
      return
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/threads/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ title, body }),
      })

      console.log("レスポンスステータス:", res.status)
      console.log("レスポンスヘッダー:", Object.fromEntries(res.headers.entries()))

      if (res.ok) {
        const newThread = await res.json()
        console.log("作成されたスレッド:", newThread)
        setThreads([newThread, ...threads])
        setTitle("")
        setBody("")
        setError(null)
      } else {
        const errorData = await res.text()
        console.error("エラーレスポンス:", errorData)
        
        try {
          const errorJson = JSON.parse(errorData)
          setError(`スレッド作成に失敗しました: ${errorJson.detail || errorJson.message || '不明なエラー'}`)
        } catch {
          setError(`スレッド作成に失敗しました (ステータス: ${res.status}): ${errorData}`)
        }
      }
    } catch (err) {
      console.error("ネットワークエラー:", err)
      setError(`ネットワークエラー: ${err instanceof Error ? err.message : '不明なエラー'}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-8 space-y-8">
      <h1 className="text-2xl font-bold mb-4">Discussion</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          <strong>エラー:</strong> {error}
        </div>
      )}

      {user && (
        <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded-lg">
          <div>
            <input
              className="w-full border rounded px-2 py-1"
              placeholder="タイトル"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <textarea
              className="w-full border rounded px-2 py-1"
              placeholder="本文"
              value={body}
              onChange={e => setBody(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-700 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? "投稿中..." : "新規スレッド作成"}
          </button>
        </form>
      )}

      <div className="space-y-4">
        {threads.map(thread => (
          <div key={thread.id} className="border p-4 rounded-lg">
            <h2 className="font-bold text-lg">{thread.title}</h2>
            <p className="text-sm text-gray-600">{new Date(thread.created_at).toLocaleString()}</p>
            <p className="mt-2">{thread.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

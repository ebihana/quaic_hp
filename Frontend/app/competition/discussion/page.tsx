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
  const { user } = useAuth()

  // スレッド一覧取得
  useEffect(() => {
    fetch("http://localhost:8000/threads/")
      .then(res => res.json())
      .then(data => setThreads(data))
  }, [])

  // 新規スレッド作成
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const token = localStorage.getItem("access_token")
    const res = await fetch("http://localhost:8000/threads/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ title, body }),
    })
    if (res.ok) {
      const newThread = await res.json()
      setThreads([newThread, ...threads])
      setTitle("")
      setBody("")
    } else {
      alert("スレッド作成に失敗しました")
    }
    setLoading(false)
  }

  return (
    <div className="max-w-2xl mx-auto py-8 space-y-8">
      <h1 className="text-2xl font-bold mb-4">Discussion</h1>

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

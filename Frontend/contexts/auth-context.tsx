"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  name: string
  email: string
  initials: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock user database (in real app, this would be a backend)
const mockUsers: Array<User & { password: string }> = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    initials: "JD",
  },
  {
    id: "2",
    name: "Alice Smith",
    email: "alice@example.com",
    password: "password123",
    initials: "AS",
  },
]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  // Save user to localStorage when user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user))
    } else {
      localStorage.removeItem("user")
    }
  }, [user])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    setUser(null)
    try {
      const res = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username: email, // FastAPIのOAuth2PasswordRequestFormはusernameキー
          password,
        }),
      })
      if (!res.ok) {
        setIsLoading(false)
        return false
      }
      const data = await res.json()
      localStorage.setItem("access_token", data.access_token)

      // ユーザー情報を取得
      const meRes = await fetch("http://localhost:8000/users/me", {
        headers: {
          "Authorization": `Bearer ${data.access_token}`,
        },
      })
      if (!meRes.ok) {
        setIsLoading(false)
        return false
      }
      const me = await meRes.json()
      setUser({
        id: me.id ?? "",
        name: me.name ?? email.split("@")[0],
        email: me.email ?? email,
        initials: (me.name ?? email)[0]?.toUpperCase() ?? "U",
      })
      setIsLoading(false)
      return true
    } catch (e) {
      setIsLoading(false)
      return false
    }
  }

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      const res = await fetch("http://localhost:8000/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      })
      if (!res.ok) {
        setIsLoading(false)
        return false
      }
      const data = await res.json()
      // APIのレスポンスに合わせてuser情報をセット
      setUser({
        id: data.id ?? "",
        name: data.name ?? name,
        email: data.email ?? email,
        initials: (data.name ?? name)[0]?.toUpperCase() ?? "U",
      })
      setIsLoading(false)
      return true
    } catch (e) {
      setIsLoading(false)
      return false
    }
  }

  const logout = () => {
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

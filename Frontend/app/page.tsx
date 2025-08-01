"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trophy, Users, Calendar, Zap, Brain, Cpu, Upload, TrendingUp, Target, Award } from "lucide-react"
import { SignInModal, RegisterModal } from "@/components/auth-modals"
import { useAuth } from "@/contexts/auth-context"
import Image from "next/image"

function Dashboard() {
  const { user } = useAuth()
  const userStats = {
    uploadedModels: 3,
    currentRating: 1847,
    bestRank: 12,
    competitionsJoined: 2,
    totalSubmissions: 8,
    bestScore: 0.9234,
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4 py-8">
        <div className="flex justify-center mb-6">
          <Image src="/images/quaic-logo.png" alt="QuAic Logo" width={300} height={300} className="rounded-lg" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-blue-700">おかえりなさい、{user?.name}さん！</h1>
        <p className="text-lg text-muted-foreground">量子機械学習コンペティションでの進捗を確認しましょう</p>
      </div>
    </div>
  )
}

function LandingPage() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-6 py-12">
        <div className="flex justify-center mb-6">
          <Image src="/images/quaic-logo.png" alt="QuAic Logo" width={300} height={300} className="rounded-lg" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-blue-700">QuAicへようこそ！</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          量子機械学習を用いて、ガイスターのゲームAIを開発し、その戦績を競います。皆さんの力で、量子層活用の新たなアイディアを発見していきましょう。
        </p>
      </div>
      <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">今すぐ参加しよう！</CardTitle>
          <CardDescription className="text-lg">
            量子機械学習の最前線で、あなたのアイデアを世界に示しませんか？
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <SignInModal>
              <Button size="lg" className="bg-blue-700 hover:bg-blue-800">
                Sign in
              </Button>
            </SignInModal>
            <RegisterModal>
              <Button
                size="lg"
                variant="outline"
                className="border-blue-700 text-blue-700 hover:bg-blue-50"
              >
                Register
              </Button>
            </RegisterModal>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function Home() {
  const { user } = useAuth()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <LandingPage />
  }

  return user ? <Dashboard /> : <LandingPage />
}
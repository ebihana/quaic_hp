import type React from "react"
import CompetitionNav from "@/components/competition-nav"

export default function CompetitionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">不完全情報ゲームAI対戦コンペティション</h1>
        <p className="text-muted-foreground">量子機械学習を用いて、古典機械学習モデルに勝利しよう！</p>
      </div>
      <CompetitionNav />
      <div>{children}</div>
    </div>
  )
}

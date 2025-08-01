import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Trophy, Users } from "lucide-react"

export default function OverviewPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">賞品</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">名誉</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">締切</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">残り30日</div>
            <p className="text-xs text-muted-foreground">2026年2月10日に終了</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">参加人数</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247名</div>
            <p className="text-xs text-muted-foreground">78カ国からの参加</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>コンペ概要</CardTitle>
          <CardDescription>
            <div className="flex gap-2 mt-2">
              <Badge variant="secondary">量子機械学習</Badge>
              <Badge variant="secondary">ゲームAI</Badge>
              <Badge variant="secondary">不完全情報ゲーム</Badge>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            量子層統合型不完全情報ゲームAI実証チャレンジにようこそ！このコンペでは、量子機械学習を用いて、ガイスターのゲームAIを開発し、その戦績を競います。皆さんの力で、量子層活用の新たなアイディアを発見していきましょう。
          </p>

          <h3 className="text-lg font-semibold">コンペティションの目標</h3>
          <p>
            このコンペティションの目標は、量子機械学習アルゴリズムを使用して、不完全情報ゲーム「ガイスター」で勝利できるAIエージェントを開発することです。参加者は量子回路を設計し、古典的な機械学習手法と組み合わせて、最適な戦略を学習するモデルを構築します。
          </p>

          <h3 className="text-lg font-semibold">評価方法</h3>
          <p>
            提出されたモデルは、他の参加者のAIエージェントとの対戦を通じて評価されます。勝率、平均ゲーム時間、戦略の多様性などの指標を総合的に評価し、最終的なランキングを決定します。量子アルゴリズムの革新性も評価の対象となります。
          </p>

          <h3 className="text-lg font-semibold">賞品と特典</h3>
          <p>
            上位入賞者には名誉ある表彰が授与され、量子機械学習の研究コミュニティでの発表機会が提供されます。また、優秀なアイデアは学術論文として発表される可能性があり、量子コンピューティング業界のパートナー企業からのスカウトの機会もあります。
          </p>

          <h3 className="text-lg font-semibold">参加要件</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>量子機械学習フレームワーク（Qiskit、Cirq、PennyLaneなど）の使用</li>
            <li>ガイスターのルールに従ったAIエージェントの実装</li>
            <li>コードの可読性と再現性の確保</li>
            <li>倫理的なAI開発ガイドラインの遵守</li>
          </ul>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>重要な日程</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">コンペ開始</span>
              <span className="text-sm text-muted-foreground">2025年12月1日</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">最終提出締切</span>
              <span className="text-sm text-muted-foreground">2026年2月10日</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">結果発表</span>
              <span className="text-sm text-muted-foreground">2026年2月20日</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">表彰式</span>
              <span className="text-sm text-muted-foreground">2026年3月1日</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>推奨技術スタック</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <h4 className="font-medium text-sm">量子フレームワーク</h4>
              <p className="text-sm text-muted-foreground">Qiskit, Cirq, PennyLane</p>
            </div>
            <div>
              <h4 className="font-medium text-sm">機械学習</h4>
              <p className="text-sm text-muted-foreground">TensorFlow Quantum, PyTorch</p>
            </div>
            <div>
              <h4 className="font-medium text-sm">プログラミング言語</h4>
              <p className="text-sm text-muted-foreground">Python 3.8+</p>
            </div>
            <div>
              <h4 className="font-medium text-sm">ゲーム環境</h4>
              <p className="text-sm text-muted-foreground">OpenAI Gym, 専用ガイスター環境</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

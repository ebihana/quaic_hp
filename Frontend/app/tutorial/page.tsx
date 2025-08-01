import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Settings, Brain, Gamepad2, Play, Download, Code, Terminal, BookOpen, Zap, Trophy } from "lucide-react"
export default function TutorialPage() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">チュートリアル</h1>
        <p className="text-muted-foreground text-lg">量子機械学習を用いたガイスターAI開発のための包括的なガイド</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 環境構築チュートリアル */}
        <Card className="h-full">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Settings className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-xl">環境構築チュートリアル</CardTitle>
                <div className="flex gap-2 mt-2">
                  <Badge variant="secondary">初級</Badge>
                  <Badge variant="outline">30分</Badge>
                </div>
              </div>
            </div>
            <CardDescription>量子機械学習開発に必要な環境のセットアップ</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
            <a href="https://colab.research.google.com/drive/1_G1QxDQ_4txAkY8RmWwUiD_qtzj1SK7R?usp=sharing" target="_blank" rel="noopener noreferrer">
              <Button className="w-full bg-transparent" variant="outline">
                <Code className="h-4 w-4 mr-2" />
                Google Colabで試す
              </Button>
              </a>
            </div>
          </CardContent>
        </Card>

        {/* モデル学習チュートリアル */}
        <Card className="h-full">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <Brain className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-xl">モデル学習チュートリアル</CardTitle>
                <div className="flex gap-2 mt-2">
                  <Badge variant="secondary">中級</Badge>
                  <Badge variant="outline">90分</Badge>
                </div>
              </div>
            </div>
            <CardDescription>量子機械学習モデルの設計から学習まで</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <a href="https://colab.research.google.com/drive/1618ZT9SGsh4Eo9e762WTNm0W82jNsxFE?usp=sharing" target="_blank" rel="noopener noreferrer">
              <Button className="w-full bg-transparent" variant="outline">
                <Code className="h-4 w-4 mr-2" />
                Google Colabで試す
              </Button>
              </a>
            </div>
          </CardContent>
        </Card>

        {/* 対戦・棋譜再生チュートリアル */}
        <Card className="h-full">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Gamepad2 className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <CardTitle className="text-xl">対戦・棋譜再生チュートリアル</CardTitle>
                <div className="flex gap-2 mt-2">
                  <Badge variant="secondary">中級</Badge>
                  <Badge variant="outline">45分</Badge>
                </div>
              </div>
            </div>
            <CardDescription>AIエージェントの対戦実行と棋譜分析</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            
            <div className="space-y-3">
              <a href="https://colab.research.google.com/drive/1BX34yd-n1yuAyu0xIpo5VmrX_2gk6k0J?usp=sharing" target="_blank" rel="noopener noreferrer">
              <Button className="w-full bg-transparent" variant="outline">
                <Code className="h-4 w-4 mr-2" />
                Google Colabで試す
              </Button>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 追加リソース */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-amber-500" />
            追加リソース
          </CardTitle>
          <CardDescription>さらなる学習のための参考資料とコミュニティリソース</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              <h4 className="font-semibold text-sm mb-2">📚 理論解説</h4>
              <p className="text-sm text-muted-foreground">量子機械学習の基礎理論から応用まで</p>
            </div>
            <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              <h4 className="font-semibold text-sm mb-2">💻 コードサンプル</h4>
              <p className="text-sm text-muted-foreground">実装例とベストプラクティス集</p>
            </div>
            <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              <h4 className="font-semibold text-sm mb-2">🎥 動画チュートリアル</h4>
              <p className="text-sm text-muted-foreground">ステップバイステップの解説動画</p>
            </div>
            <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              <h4 className="font-semibold text-sm mb-2">💬 コミュニティ</h4>
              <p className="text-sm text-muted-foreground">質問・議論・情報交換の場</p>
            </div>
          </div>
        </CardContent>
      </Card>

      
    </div>
  )
}

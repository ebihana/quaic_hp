'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Trophy, Users, Gamepad2, BookOpen } from "lucide-react"
import { useState } from "react"
import GeisterDemoGame from "@/components/GeisterDemoGame"

export default function OverviewPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'rules'>('overview');

  return (
    <div className="space-y-6">
      {/* タブナビゲーション */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'overview'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              コンペ概要
            </div>
          </button>
          <button
            onClick={() => setActiveTab('rules')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'rules'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <Gamepad2 className="h-4 w-4" />
              ガイスターのルール
            </div>
          </button>
        </nav>
      </div>

      {activeTab === 'overview' && (
      <div className="space-y-6">

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
          QuAicは不完全情報ゲームである『ガイスター』を皆さんが自作した量子ゲームAIでプレーし競い合うことで、量子機械学習の新たな活用方法を作り出そうというプラットフォームです。皆さんの力で、量子層活用の新たなアイディアを発見していきましょう。
量子機械学習なんて難しそう！そう感じる方も大丈夫です。サイト内のステップを踏めば誰でも量子ゲームAIを作ることができます。
          </p>
          <h3 className="text-lg font-semibold">コンペティションの目標</h3>
          <p>
            このコンペティションの目標は、量子機械学習アルゴリズムを使用して、不完全情報ゲーム「ガイスター」で勝利できるAIエージェントを開発することです。参加者は量子回路を設計し、古典的な機械学習手法と組み合わせて、最適な戦略を学習するモデルを構築します。
          </p>

          <h3 className="text-lg font-semibold">量子ゲームAI作成・対戦の流れ</h3>
          <h4 className="text-lg font-semibold">①AIrecipeによるコード作成</h4>
          <p>
          サイドバーのAI recipeのボタンから、ゲームAIの元となるコードを作成します。このページでは、学習方法選択、モジュール設計、パラメータ設定の3ステップを踏めば、誰でも量子機械学習ようのコードが生成できます。
          </p>

          <h4 className="text-lg font-semibold">②Google Colaboratoryで作成したコードを実行</h4>
          <p>
          AI recipeの最後のページには、『コードをコピー』と『notebookを開く』の二つのボタンがあります。まず、『コードをコピー』をクリックして、作成したコードをコピーし、それを『notebookを開く』によって開いたColaboratoryのnotebookにペーストしてください。ペーストする位置は、notebook内に指定されています。
ペーストしたら、上から順にセルを実行してみてください。あなたが作成したコードを元に、学習が開始し、あなただけのAIモデルが生まれます。
          </p>

          <h4 className="text-lg font-semibold">③作成したモデルの提出</h4>
          <p>
          サイドバーのSubmissionボタンから、作成したモデルとそのパラメータを提出します。
          </p>

          <h4 className="text-lg font-semibold">④リーダーボードへの反映</h4>
          <p>
          提出されたコードは、バックエンドで対戦が行われ、勝敗に応じたレーティングが算出されます。レーティングは、リーダーボードから見ることができます。
          </p>

          <h3 className="text-lg font-semibold">評価方法</h3>
          <p>
            提出されたモデルは、他の参加者のAIエージェントとの対戦を通じて評価されます。勝率、平均ゲーム時間、戦略の多様性などの指標を総合的に評価し、最終的なランキングを決定します。量子アルゴリズムの革新性も評価の対象となります。
          </p>



          {/* <h3 className="text-lg font-semibold">参加要件</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>量子機械学習フレームワーク（Qiskit、Cirq、PennyLaneなど）の使用</li>
            <li>ガイスターのルールに従ったAIエージェントの実装</li>
            <li>コードの可読性と再現性の確保</li>
            <li>倫理的なAI開発ガイドラインの遵守</li>
          </ul> */}
        </CardContent>
      </Card>

      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
      </div> */}
        </div>
      )}

      {/* ガイスターのルールタブ */}
      {activeTab === 'rules' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gamepad2 className="h-5 w-5" />
                ガイスターのルール
              </CardTitle>
              <CardDescription>
                不完全情報ゲーム「ガイスター」の基本ルールと戦略
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">🎯 ゲームの目的</h3>
                <p className="text-blue-800">
                  ガイスターは2人対戦の不完全情報ゲームです。相手の善いおばけ（○）をすべて取るか、自分の善いおばけを相手の陣地の角（脱出口）に移動させることで勝利します。
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                <h3 className="text-lg font-semibold mb-3">♟️ 駒の種類</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-300 rounded-full flex items-center justify-center text-green-800 font-bold">○</div>
                      <div>
                        <strong>良いおばけ（○）</strong>
                        <p className="text-sm text-gray-600">相手の良いおばけを取るか、脱出口に移動させると勝利</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-red-300 rounded-full flex items-center justify-center text-red-800 font-bold">●</div>
                      <div>
                        <strong>悪いおばけ（●）</strong>
                        <p className="text-sm text-gray-600">相手に取らせると相手に有利になる駒</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">🎲 ゲームの流れ</h3>
                  <ol className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="bg-indigo-100 text-indigo-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">1</span>
                      <span>各プレイヤーは良いおばけ4個、悪いおばけ4個を自分の陣地に配置</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-indigo-100 text-indigo-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">2</span>
                      <span>相手の駒の種類は見えない（不完全情報）</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-indigo-100 text-indigo-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">3</span>
                      <span>交互に駒を1つずつ移動（縦横のみ）</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-indigo-100 text-indigo-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">4</span>
                      <span>勝利条件を満たしたプレイヤーが勝利</span>
                    </li>
                  </ol>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">🏆 勝利条件</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">条件1: 良いおばけの脱出</h4>
                    <p className="text-sm text-green-800">自分の良いおばけを相手の陣地の角（脱出口）に移動させる</p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-900 mb-2">条件2: 良いおばけの全取得</h4>
                    <p className="text-sm text-red-800">相手の良いおばけをすべて取る</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">⚠️ 重要なルール</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-yellow-100 text-yellow-800 rounded-full flex items-center justify-center text-xs font-bold">!</div>
                    <div>
                      <strong>不完全情報</strong>
                      <p className="text-sm text-gray-600">相手の駒の種類（良いおばけ/悪いおばけ）は最初は分からない</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-yellow-100 text-yellow-800 rounded-full flex items-center justify-center text-xs font-bold">!</div>
                    <div>
                      <strong>移動制限</strong>
                      <p className="text-sm text-gray-600">駒は縦横に1マスずつしか移動できない</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-yellow-100 text-yellow-800 rounded-full flex items-center justify-center text-xs font-bold">!</div>
                    <div>
                      <strong>捕獲ルール</strong>
                      <p className="text-sm text-gray-600">移動先に相手の駒がある場合、その駒を取る</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">💡 戦略のヒント</h3>
                <ul className="space-y-2 text-sm">
                  <li>• 相手の駒の種類を推測しながら戦略を立てる</li>
                  <li>• 良いおばけの脱出ルートを確保する</li>
                  <li>• 悪いおばけを相手に取らせて戦略的優位を得る</li>
                  <li>• 相手の動きを観察してパターンを読み取る</li>
                </ul>
              </div>

              {/* デモゲーム */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border-2 border-blue-200">
                <h3 className="text-lg font-semibold mb-4 text-blue-900">🎮 デモゲーム - ガイスターをプレイしてみよう！</h3>
                <GeisterDemoGame />
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

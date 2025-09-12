'use client';

import React, { useState } from 'react';
import { QuantumBattleConfig } from '../../../types/quantum-battle';

interface Module3RewardProps {
  config: QuantumBattleConfig;
  onConfigChange: (config: QuantumBattleConfig) => void;
}

export default function Module3Reward({ config, onConfigChange }: Module3RewardProps) {
  const [output, setOutput] = useState<string>('');

  const selectModule = (type: string, value: string) => {
    onConfigChange({ ...config, [type]: value });
  };

  const runReward = () => {
    const rewards = {
      balanced: '捕獲: +10, 脱出: +50, 被捕獲: -10',
      aggressive: '捕獲: +20, 脱出: +30, 被捕獲: -5',
      defensive: '捕獲: +5, 脱出: +40, 被捕獲: -20',
      escape: '捕獲: +5, 脱出: +100, 被捕獲: -10'
    };
    setOutput(`✅ 報酬関数設定完了
戦略: ${config.reward}
${rewards[config.reward as keyof typeof rewards]}`);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-2xl">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-gray-200">
        <span className="text-2xl">💰</span>
        <h3 className="text-2xl font-bold text-indigo-500">モジュール3: 報酬関数</h3>
      </div>
      
      <div className="bg-white border-l-4 border-green-500 p-4 rounded-lg shadow-md mb-6">
        <div className="text-gray-600 mb-2 font-mono">In [3]:</div>
        
        {/* 報酬戦略選択 */}
        <div className="mb-6">
          <div className="font-medium text-gray-600 mb-3">報酬戦略：</div>
          <div className="grid grid-cols-1 gap-3">
            <button
              className="p-3 rounded-lg border-2 bg-indigo-500 text-white border-indigo-600"
            >
              ⚖️ バランス型
            </button>
          </div>
        </div>

        {/* 説明欄 */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
          <h5 className="text-gray-700 font-semibold mb-3">💰 報酬戦略の説明</h5>
          <div className="text-sm text-gray-600 space-y-2">
            <div><strong>修正エンジン対応報酬設計（ガイスタールール準拠）</strong></div>
            <div>• 相手の善玉を捕獲: +10ポイント（有利になる）</div>
            <div>• 相手の悪玉を捕獲: -5ポイント（相手に有利を与える）</div>
            <div>• 脱出成功: +100ポイント（勝利条件）</div>
            <div>• 善玉が取られる: -20ポイント（不利になる）</div>
            <div>• 悪玉を取らせる: +10ポイント（戦略的価値）</div>
            <div>• 相手陣地への前進: +3ポイント（脱出への道筋）</div>
            <div>• 中央制御: +1ポイント（盤面支配）</div>
            <div>• AIがどのような行動を学習するかを決める重要な要素です</div>
          </div>
        </div>
        
        <button
          onClick={runReward}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300"
        >
          ▶ 報酬関数を設定
        </button>
        
        {output && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg font-mono text-sm whitespace-pre-wrap">
            {output}
          </div>
        )}
      </div>
    </div>
  );
}

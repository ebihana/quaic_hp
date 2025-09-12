'use client';

import React, { useState } from 'react';
import { QuantumBattleConfig } from '../../../types/quantum-battle';

interface Module5ActionProps {
  config: QuantumBattleConfig;
  onConfigChange: (config: QuantumBattleConfig) => void;
}

export default function Module5Action({ config, onConfigChange }: Module5ActionProps) {
  const [output, setOutput] = useState<string>('');

  const selectModule = (type: string, value: string) => {
    onConfigChange({ ...config, [type]: value });
  };

  const runAction = () => {
    const strategies = {
      epsilon: 'ε=0.1で10%の確率でランダム探索',
      boltzmann: '温度τ=1.0でソフトマックス選択',
      ucb: '信頼区間による楽観的探索',
      thompson: 'ベイズ的確率分布からサンプリング'
    };
    setOutput(`✅ 行動選択戦略設定完了
戦略: ${config.action}
${strategies[config.action as keyof typeof strategies]}`);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-2xl">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-gray-200">
        <span className="text-2xl">🎯</span>
        <h3 className="text-2xl font-bold text-indigo-500">モジュール5: 行動選択</h3>
      </div>
      
      <div className="bg-white border-l-4 border-green-500 p-4 rounded-lg shadow-md mb-6">
        <div className="text-gray-600 mb-2 font-mono">In [5]:</div>
        
        {/* 行動選択戦略選択 */}
        <div className="mb-6">
          <div className="font-medium text-gray-600 mb-3">行動選択戦略：</div>
          <div className="grid grid-cols-1 gap-3">
            <button
              className="p-3 rounded-lg border-2 bg-indigo-500 text-white border-indigo-600"
            >
              🎰 ε-greedy
            </button>
          </div>
        </div>
        
        <button
          onClick={runAction}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300"
        >
          ▶ 行動選択戦略を設定
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

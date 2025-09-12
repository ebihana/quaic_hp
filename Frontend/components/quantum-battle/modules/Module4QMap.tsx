'use client';

import React, { useState } from 'react';
import { QuantumBattleConfig } from '../../../types/quantum-battle';

interface Module4QMapProps {
  config: QuantumBattleConfig;
  onConfigChange: (config: QuantumBattleConfig) => void;
}

export default function Module4QMap({ config, onConfigChange }: Module4QMapProps) {
  const [output, setOutput] = useState<string>('');

  const selectModule = (type: string, value: string) => {
    onConfigChange({ ...config, [type]: value });
  };

  const runQMap = () => {
    setOutput(`✅ Q値マップ生成完了
方法: ${config.qmap}
状態空間: 6x6x4 = 144次元
行動空間: 4方向`);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-2xl">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-gray-200">
        <span className="text-2xl">🗺️</span>
        <h3 className="text-2xl font-bold text-indigo-500">モジュール4: Q値マップ</h3>
      </div>
      
      <div className="bg-white border-l-4 border-green-500 p-4 rounded-lg shadow-md mb-6">
        <div className="text-gray-600 mb-2 font-mono">In [4]:</div>
        
        {/* Q値計算方法選択 */}
        <div className="mb-6">
          <div className="font-medium text-gray-600 mb-3">Q値計算方法：</div>
          <div className="grid grid-cols-1 gap-3">
            <button
              className="p-3 rounded-lg border-2 bg-indigo-500 text-white border-indigo-600"
            >
              🧠 DQN
            </button>
          </div>
        </div>

        {/* 説明欄 */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
          <h5 className="text-gray-700 font-semibold mb-3">🗺️ Q値学習方式の説明</h5>
          <div className="text-sm text-gray-600">
            DQNによるQ値学習：深層強化学習で価値関数を近似
          </div>
        </div>
        
        <button
          onClick={runQMap}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300"
        >
          ▶ Q値マップを生成
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

'use client';

import React from 'react';
import { QuantumBattleConfig } from '../../types/quantum-battle';
import Module1Placement from './modules/Module1Placement';
import Module2Quantum from './modules/Module2Quantum';
import Module3Reward from './modules/Module3Reward';
import Module4QMap from './modules/Module4QMap';
import Module5Action from './modules/Module5Action';

interface Step2ModuleDesignProps {
  config: QuantumBattleConfig;
  onConfigChange: (config: QuantumBattleConfig) => void;
  onBack: () => void;
  onProceed: () => void;
}

export default function Step2ModuleDesign({ config, onConfigChange, onBack, onProceed }: Step2ModuleDesignProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-6">
        {/* モジュール1: 初期配置 */}
        <Module1Placement 
          config={config}
          onConfigChange={onConfigChange}
        />

        {/* モジュール2: 量子推定 */}
        <Module2Quantum 
          config={config}
          onConfigChange={onConfigChange}
        />

        {/* モジュール3: 報酬関数 */}
        <Module3Reward 
          config={config}
          onConfigChange={onConfigChange}
        />

        {/* モジュール4: Q値マップ */}
        <Module4QMap 
          config={config}
          onConfigChange={onConfigChange}
        />

        {/* モジュール5: 行動選択 */}
        <Module5Action 
          config={config}
          onConfigChange={onConfigChange}
        />
      </div>

      <div className="flex justify-center gap-4">
        <button 
          onClick={onBack}
          className="px-8 py-4 bg-gray-500 text-white text-lg font-bold rounded-xl hover:bg-gray-600 hover:transform hover:-translate-y-1 transition-all duration-300 shadow-lg"
        >
          ← 戻る
        </button>
        <button 
          onClick={onProceed}
          className="px-8 py-4 bg-indigo-500 text-white text-lg font-bold rounded-xl hover:bg-indigo-600 hover:transform hover:-translate-y-1 transition-all duration-300 shadow-lg"
        >
          次へ進む →
        </button>
      </div>
    </div>
  );
}

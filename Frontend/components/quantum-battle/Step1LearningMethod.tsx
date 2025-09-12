'use client';

import React from 'react';
import { QuantumBattleConfig } from '@/types/quantum-battle';

interface Step1LearningMethodProps {
  config: QuantumBattleConfig;
  onConfigChange: (config: QuantumBattleConfig) => void;
  onProceed: () => void;
}

export default function Step1LearningMethod({ config, onConfigChange, onProceed }: Step1LearningMethodProps) {
  const selectLearningMethod = (method: string) => {
    onConfigChange({ ...config, learningMethod: method });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row gap-8 max-w-4xl mx-auto">
        {/* 強化学習カード */}
        <div 
          className={`bg-white rounded-2xl p-8 shadow-2xl cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-3xl border-4 ${
            config.learningMethod === 'reinforcement' 
              ? 'border-indigo-500 bg-gradient-to-br from-indigo-50 to-purple-50' 
              : 'border-transparent'
          }`}
          onClick={() => selectLearningMethod('reinforcement')}
        >
          <div className="text-6xl text-center mb-4">🎮</div>
          <h3 className="text-2xl font-bold text-indigo-500 mb-4 text-center">
            強化学習
          </h3>
          <p className="text-gray-600 leading-relaxed mb-6">
            エージェントが環境と相互作用しながら、試行錯誤を通じて最適な戦略を学習します。
            実際に対戦を繰り返し、報酬を最大化する行動を習得します。
          </p>
          <div className="bg-gray-50 p-4 rounded-xl">
            <div className="space-y-2">
              <div className="flex items-center text-gray-600">
                <span className="text-green-500 mr-2">✓</span>
                自己対戦による学習
              </div>
              <div className="flex items-center text-gray-600">
                <span className="text-green-500 mr-2">✓</span>
                Q学習・DQNアルゴリズム
              </div>
              <div className="flex items-center text-gray-600">
                <span className="text-green-500 mr-2">✓</span>
                探索と活用のバランス
              </div>
              <div className="flex items-center text-gray-600">
                <span className="text-green-500 mr-2">✓</span>
                動的な戦略の獲得
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
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

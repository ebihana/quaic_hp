'use client';

import React, { useState } from 'react';
import { QuantumBattleConfig } from '../../../types/quantum-battle';

interface Module2QuantumProps {
  config: QuantumBattleConfig;
  onConfigChange: (config: QuantumBattleConfig) => void;
}

export default function Module2Quantum({ config, onConfigChange }: Module2QuantumProps) {
  const [output, setOutput] = useState<string>('');

  const updateSliderValue = (param: string, value: string) => {
    const numValue = parseInt(value);
    onConfigChange({ ...config, [param]: numValue });
  };

  const selectModule = (type: string, value: string) => {
    onConfigChange({ ...config, [type]: value });
  };

  const runQuantumConfig = () => {
    setOutput(`✅ 量子回路構築完了
量子ビット数: ${config.qubits}
レイヤー数: ${config.layers}
エンベディング: ${config.embedding}
エンタングルメント: ${config.entanglement}
総パラメータ数: ${config.qubits * config.layers * 3}`);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-2xl">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-gray-200">
        <span className="text-2xl">🔬</span>
        <h3 className="text-2xl font-bold text-indigo-500">モジュール2: 敵駒推定（CQCNN）</h3>
      </div>
      
      <div className="bg-white border-l-4 border-green-500 p-4 rounded-lg shadow-md mb-6">
        <div className="text-gray-600 mb-2 font-mono">In [2]:</div>
        
        {/* 量子ビット数設定 */}
        <div className="mb-6">
          <label className="block text-gray-600 font-medium mb-2">
            🔢 量子ビット数（n_qubits）:
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="4"
              max="12"
              value={config.qubits}
              onChange={(e) => updateSliderValue('qubits', e.target.value)}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="min-w-[60px] text-center bg-indigo-500 text-white px-3 py-1 rounded font-bold">
              {config.qubits}
            </div>
          </div>
        </div>
        
        {/* レイヤー数設定 */}
        <div className="mb-6">
          <label className="block text-gray-600 font-medium mb-2">
            📚 レイヤー数（n_layers）:
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="1"
              max="5"
              value={config.layers}
              onChange={(e) => updateSliderValue('layers', e.target.value)}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="min-w-[60px] text-center bg-indigo-500 text-white px-3 py-1 rounded font-bold">
              {config.layers}
            </div>
          </div>
        </div>
        
        {/* エンベディング方式選択 */}
        <div className="mb-6">
          <div className="font-medium text-gray-600 mb-3">エンベディング方式：</div>
          <div className="grid grid-cols-2 gap-3">
            <button
              className={`p-3 rounded-lg border-2 transition-all duration-300 ${
                config.embedding === 'angle'
                  ? 'bg-indigo-500 text-white border-indigo-600'
                  : 'bg-gray-100 border-gray-300 hover:bg-indigo-50 hover:border-indigo-400'
              }`}
              onClick={() => selectModule('embedding', 'angle')}
            >
              📐 Angle
            </button>
            <button
              className={`p-3 rounded-lg border-2 transition-all duration-300 ${
                config.embedding === 'amplitude'
                  ? 'bg-indigo-500 text-white border-indigo-600'
                  : 'bg-gray-100 border-gray-300 hover:bg-indigo-50 hover:border-indigo-400'
              }`}
              onClick={() => selectModule('embedding', 'amplitude')}
            >
              📊 Amplitude
            </button>
          </div>
        </div>
        
        {/* エンタングルメント構造選択 */}
        <div className="mb-6">
          <div className="font-medium text-gray-600 mb-3">エンタングルメント構造：</div>
          <div className="grid grid-cols-2 gap-3">
            <button
              className={`p-3 rounded-lg border-2 transition-all duration-300 ${
                config.entanglement === 'linear'
                  ? 'bg-indigo-500 text-white border-indigo-600'
                  : 'bg-gray-100 border-gray-300 hover:bg-indigo-50 hover:border-indigo-400'
              }`}
              onClick={() => selectModule('entanglement', 'linear')}
            >
              Linear
            </button>
            <button
              className={`p-3 rounded-lg border-2 transition-all duration-300 ${
                config.entanglement === 'full'
                  ? 'bg-indigo-500 text-white border-indigo-600'
                  : 'bg-gray-100 border-gray-300 hover:bg-indigo-50 hover:border-indigo-400'
              }`}
              onClick={() => selectModule('entanglement', 'full')}
            >
              Full
            </button>
          </div>
        </div>
        
        {/* 状態チャンネル数選択 */}
        <div className="mb-6">
          <div className="font-medium text-gray-600 mb-3">🧠 状態チャンネル数：</div>
          <div className="grid grid-cols-1 gap-3">
            <button
              className="p-3 rounded-lg border-2 bg-indigo-500 text-white border-indigo-600"
            >
              7CH (252次元)
            </button>
          </div>
        </div>

        {/* 説明欄 */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
          <h5 className="text-gray-700 font-semibold mb-3">🔬 量子推定システムの説明</h5>
          <div className="text-sm text-gray-600">
            確率的量子推定器による敵コマの善玉/悪玉確率推定
          </div>
        </div>
        
        <button
          onClick={runQuantumConfig}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300"
        >
          ▶ 量子回路を構築
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

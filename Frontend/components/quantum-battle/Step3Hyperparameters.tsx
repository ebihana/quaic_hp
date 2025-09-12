'use client';

import React, { useState } from 'react';
import { QuantumBattleConfig, Hyperparameters } from '../../types/quantum-battle';

interface Step3HyperparametersProps {
  config: QuantumBattleConfig;
  hyperparams: Hyperparameters;
  onHyperparamsChange: (hyperparams: Hyperparameters) => void;
  onBack: () => void;
}

export default function Step3Hyperparameters({ 
  config, 
  hyperparams, 
  onHyperparamsChange, 
  onBack 
}: Step3HyperparametersProps) {
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [showCode, setShowCode] = useState<boolean>(false);

  const updateSliderValue = (param: keyof Hyperparameters, value: string) => {
    const numValue = parseFloat(value);
    onHyperparamsChange({ ...hyperparams, [param]: numValue });
  };

  const updateLearningRate = (value: string) => {
    const lr = Math.pow(10, parseFloat(value));
    onHyperparamsChange({ ...hyperparams, learningRate: lr });
  };

  const updateL2Reg = (value: string) => {
    const l2 = Math.pow(10, parseFloat(value));
    onHyperparamsChange({ ...hyperparams, l2Reg: l2 });
  };

  const generateCode = () => {
    const code = `# ============================================
# Quantum Battle System - Auto-Generated Code
# ============================================
# 学習方法: ${config.learningMethod === 'reinforcement' ? '強化学習' : '教師あり学習'}
# 生成日時: ${new Date().toLocaleString('ja-JP')}
#
# ===== AI設計説明 =====
# 
# 【モジュール1: 初期配置戦略】
# 修正エンジン対応配置：ガイスタールール準拠
# - プレイヤーAは下側（y=4,5）に配置（修正された座標系）
# - プレイヤーBは上側（y=0,1）に配置
# - 脱出口：A=相手陣地の上側角(0,0),(5,0)、B=下側角(0,5),(5,5)
# - 相手の駒配置は完全に未知として学習
# 
# 【モジュール2: 量子推定システム】  
# 確率的量子推定器による敵コマの善玉/悪玉確率推定
# 
# 【モジュール3: 報酬戦略】
# バランス型報酬関数：捕獲・脱出・戦略的行動を総合評価
# 
# 【モジュール4: Q値学習方式】
# DQNによるQ値学習：深層強化学習で価値関数を近似
# 
# 【モジュール5: 行動選択戦略】
# ε-greedy戦略：探索と活用のバランスを動的調整
# 
# ============================================

import numpy as np
import torch
import torch.nn as nn
import torch.optim as optim
import sys
import os
from pathlib import Path

# 修正されたゲームエンジンのインポート
sys.path.append(str(Path(__file__).parent))
sys.path.append(str(Path(__file__).parent / "src"))
from src.qugeister_competitive.debug_game_viewer import DebugGeisterGame
from src.qugeister_competitive.ai_base import BaseAI

# ===== ゲームエンジン初期化（修正版） =====
game_engine = DebugGeisterGame()

# ===== 学習方法の設定 =====
learning_config = {
    'method': '${config.learningMethod}',
    'algorithm': '${config.learningMethod === 'reinforcement' ? config.qmap : 'supervised'}',
}

# ===== モジュール設定 =====
module_config = {
    # モジュール1: 初期配置（修正されたエンジン対応 - プレイヤーA下側配置）
    'placement': {
        'type': '${config.placement}',
        'player_a_bottom': True,    # プレイヤーAは下側（y=4,5）に配置
        'player_b_top': True,       # プレイヤーBは上側（y=0,1）に配置
        'my_pieces_only': np.array([
${config.board.slice(4, 6).map(row => '            ' + JSON.stringify(row.map(val => (val === 1 || val === -1) ? val : 0))).join(',\n')}
        ]),
        'escape_positions': {
            'player_a': [(0, 0), (5, 0)],  # A脱出口：相手陣地（上側角）
            'player_b': [(0, 5), (5, 5)]   # B脱出口：相手陣地（下側角）
        },
        'coordinate_system': 'corrected',  # 修正された座標系
        'opponent_unknown': True,          # 相手の駒配置は完全に未知
        'rule_compliant': True            # ガイスタールール準拠
    },
    
    # モジュール2: 敵駒推定（CQCNN）
    'quantum': {
        'n_qubits': ${config.qubits},
        'n_layers': ${config.layers},
        'embedding_type': '${config.embedding}',
        'entanglement': '${config.entanglement}',
        'total_params': ${config.qubits * config.layers * 3}
    },
    
    # モジュール3: 報酬関数（修正されたルール対応）
    'reward': {
        'strategy': '${config.reward}',
        'capture_good_reward': ${config.reward === 'aggressive' ? 20 : config.reward === 'defensive' ? 5 : 10},
        'capture_bad_penalty': -5,        # 相手の悪玉を取ることはマイナス
        'escape_reward': ${config.reward === 'escape' ? 100 : config.reward === 'defensive' ? 40 : 50},
        'captured_good_penalty': ${config.reward === 'defensive' ? -30 : -20},  # 善玉を取られる
        'captured_bad_reward': 10,        # 悪玉を取らせる（戦略的）
        'win_condition_rewards': {
            'escape_win': 100,            # 脱出勝利
            'eliminate_all_good': 100,    # 相手善玉全取得
            'eliminate_all_bad': 100      # 相手悪玉全取らせ
        },
        'position_rewards': {
            'advance_toward_escape': 2,   # 脱出口への前進
            'center_control': 1,          # 中央制御
            'opponent_territory': 3       # 相手陣地への侵入
        }
    },
    
    # モジュール4: Q値計算（修正されたエンジン対応）
    'qmap': {
        'method': '${config.qmap}',
        'state_dim': 252,  # 6x6x7チャンネル
        'action_dim': 5,         # 4方向 + 脱出
        'selected_channels': 7,
        'state_channels': {
            'my_good_pieces': 1,     # 自分の善玉位置
            'my_bad_pieces': 1,      # 自分の悪玉位置  
            'opponent_pieces': 1,    # 相手の駒位置（種類不明）
            'known_opponent_good': 1, # 確認済み相手善玉
            'known_opponent_bad': 1,  # 確認済み相手悪玉
            'legal_moves': 1,        # 移動可能位置
            'escape_positions': 1,   # 脱出可能位置
        },
        'legal_moves_only': True, # 合法手のみ考慮
        'game_engine': 'DebugGeisterGame',  # 使用するゲームエンジン
        'move_validation': True   # 手の有効性検証
    },
    
    # モジュール5: 行動選択
    'action': {
        'strategy': '${config.action}',
        'epsilon': ${config.action === 'epsilon' ? hyperparams.epsilon : 'null'},
        # 'temperature': ${config.action === 'boltzmann' ? '1.0' : 'null'}
    }
}

# ===== ハイパーパラメータ =====
hyperparameters = {
    # 基本学習設定
    'learning_rate': ${hyperparams.learningRate},
    'batch_size': ${hyperparams.batchSize},
    'epochs': ${hyperparams.epochs},
    'validation_split': ${hyperparams.validation},
    
    # 最適化設定
    'optimizer': '${hyperparams.optimizer}',
    'scheduler': '${hyperparams.scheduler}',
    'dropout_rate': ${hyperparams.dropout},
    'l2_regularization': ${hyperparams.l2Reg},
    ${config.learningMethod === 'reinforcement' ? `
    # 強化学習パラメータ
    'epsilon': ${hyperparams.epsilon},
    'epsilon_decay': ${hyperparams.epsilonDecay},
    'epsilon_min': 0.01,
    'gamma': ${hyperparams.gamma},
    'replay_buffer_size': ${hyperparams.replayBuffer},
    'target_update_freq': 100,` : `
    # 教師あり学習パラメータ
    'dataset_path': 'path/to/dataset.csv',
    'augmentation': 'basic',
    'class_weight': 'balanced',
    'loss_function': 'cross_entropy',`}
}

print("========================================")
print("Quantum Battle System - Training Started")
print("========================================")
print("学習方法: 強化学習")
print(f"量子ビット数: {module_config['quantum']['n_qubits']}")
print(f"レイヤー数: {module_config['quantum']['n_layers']}")
print("========================================")`;

    setGeneratedCode(code);
    setShowCode(true);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode).then(() => {
      alert('コードをクリップボードにコピーしました！');
    });
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl p-8 shadow-2xl">
        {/* 学習設定 */}
        <div className="mb-8 p-6 bg-gray-50 rounded-xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">⚙️</span>
            <h3 className="text-xl font-bold text-indigo-500">学習設定</h3>
          </div>
          
          <div className="space-y-6">
            {/* 学習率 */}
            <div>
              <label className="block text-gray-600 font-medium mb-2">
                <span className="text-lg">📊</span> 学習率 (Learning Rate)
                <small className="text-gray-500 font-normal ml-2">- AIの学習速度を制御</small>
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="-4"
                  max="-1"
                  step="0.1"
                  value={Math.log10(hyperparams.learningRate)}
                  onChange={(e) => updateLearningRate(e.target.value)}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="min-w-[80px] text-center bg-indigo-500 text-white px-3 py-1 rounded font-bold">
                  {hyperparams.learningRate.toFixed(4)}
                </div>
              </div>
            </div>

            {/* バッチサイズ */}
            <div>
              <label className="block text-gray-600 font-medium mb-2">
                <span className="text-lg">📦</span> バッチサイズ
                <small className="text-gray-500 font-normal ml-2">- 一度に処理する経験数</small>
              </label>
              <select
                value={hyperparams.batchSize}
                onChange={(e) => onHyperparamsChange({ ...hyperparams, batchSize: parseInt(e.target.value) })}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
              >
                <option value={16}>16</option>
                <option value={32}>32</option>
                <option value={64}>64</option>
                <option value={128}>128</option>
                <option value={256}>256</option>
              </select>
            </div>

            {/* エポック数 */}
            <div>
              <label className="block text-gray-600 font-medium mb-2">
                <span className="text-lg">🔄</span> エポック数
                <small className="text-gray-500 font-normal ml-2">- 学習の繰り返し回数</small>
              </label>
              <input
                type="number"
                value={hyperparams.epochs}
                onChange={(e) => onHyperparamsChange({ ...hyperparams, epochs: parseInt(e.target.value) })}
                min="10"
                max="1000"
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
              />
            </div>

            {/* 検証データ割合 */}
            <div>
              <label className="block text-gray-600 font-medium mb-2">
                <span className="text-lg">🎯</span> 検証データ割合
                <small className="text-gray-500 font-normal ml-2">- 学習効果の検証用データ比率</small>
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0.1"
                  max="0.4"
                  step="0.05"
                  value={hyperparams.validation}
                  onChange={(e) => updateSliderValue('validation', e.target.value)}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="min-w-[60px] text-center bg-indigo-500 text-white px-3 py-1 rounded font-bold">
                  {hyperparams.validation}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 強化学習パラメータ */}
        <div className="mb-8 p-6 bg-gray-50 rounded-xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">🎮</span>
            <h3 className="text-xl font-bold text-indigo-500">強化学習パラメータ</h3>
          </div>
          
          <div className="space-y-6">
            {/* ε (Epsilon) */}
            <div>
              <label className="block text-gray-600 font-medium mb-2">
                <span className="text-lg">🎰</span> ε (Epsilon)
                <small className="text-gray-500 font-normal ml-2">- ランダム探索の確率</small>
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={hyperparams.epsilon}
                  onChange={(e) => updateSliderValue('epsilon', e.target.value)}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="min-w-[60px] text-center bg-indigo-500 text-white px-3 py-1 rounded font-bold">
                  {hyperparams.epsilon}
                </div>
              </div>
            </div>

            {/* ε減衰率 */}
            <div>
              <label className="block text-gray-600 font-medium mb-2">
                <span className="text-lg">📉</span> ε減衰率
                <small className="text-gray-500 font-normal ml-2">- 探索率を徐々に減らす速度</small>
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0.99"
                  max="1"
                  step="0.001"
                  value={hyperparams.epsilonDecay}
                  onChange={(e) => updateSliderValue('epsilonDecay', e.target.value)}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="min-w-[60px] text-center bg-indigo-500 text-white px-3 py-1 rounded font-bold">
                  {hyperparams.epsilonDecay}
                </div>
              </div>
            </div>

            {/* リプレイバッファサイズ */}
            <div>
              <label className="block text-gray-600 font-medium mb-2">
                <span className="text-lg">💾</span> リプレイバッファサイズ
                <small className="text-gray-500 font-normal ml-2">- 過去の経験を記憶する容量</small>
              </label>
              <select
                value={hyperparams.replayBuffer}
                onChange={(e) => onHyperparamsChange({ ...hyperparams, replayBuffer: parseInt(e.target.value) })}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
              >
                <option value={1000}>1,000</option>
                <option value={5000}>5,000</option>
                <option value={10000}>10,000</option>
                <option value={50000}>50,000</option>
              </select>
            </div>

            {/* 割引率 (γ) */}
            <div>
              <label className="block text-gray-600 font-medium mb-2">
                <span className="text-lg">🎯</span> 割引率 (γ)
                <small className="text-gray-500 font-normal ml-2">- 未来報酬の重視度</small>
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0.9"
                  max="1"
                  step="0.01"
                  value={hyperparams.gamma}
                  onChange={(e) => updateSliderValue('gamma', e.target.value)}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="min-w-[60px] text-center bg-indigo-500 text-white px-3 py-1 rounded font-bold">
                  {hyperparams.gamma}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 最適化設定 */}
        <div className="mb-8 p-6 bg-gray-50 rounded-xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">🚀</span>
            <h3 className="text-xl font-bold text-indigo-500">最適化設定</h3>
          </div>
          
          <div className="space-y-6">
            {/* オプティマイザ */}
            <div>
              <label className="block text-gray-600 font-medium mb-2">
                <span className="text-lg">⚡</span> オプティマイザ
                <small className="text-gray-500 font-normal ml-2">- 重み更新の方法</small>
              </label>
              <select
                value={hyperparams.optimizer}
                onChange={(e) => onHyperparamsChange({ ...hyperparams, optimizer: e.target.value })}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
              >
                <option value="adam">Adam</option>
                <option value="sgd">SGD</option>
                <option value="rmsprop">RMSprop</option>
                <option value="adamw">AdamW</option>
              </select>
            </div>

            {/* 学習率スケジューラ */}
            <div>
              <label className="block text-gray-600 font-medium mb-2">
                <span className="text-lg">📈</span> 学習率スケジューラ
                <small className="text-gray-500 font-normal ml-2">- 学習率の動的調整</small>
              </label>
              <select
                value={hyperparams.scheduler}
                onChange={(e) => onHyperparamsChange({ ...hyperparams, scheduler: e.target.value })}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
              >
                <option value="none">なし</option>
                <option value="step">Step</option>
                <option value="cosine">Cosine</option>
                <option value="exponential">Exponential</option>
              </select>
            </div>

            {/* Dropout率 */}
            <div>
              <label className="block text-gray-600 font-medium mb-2">
                <span className="text-lg">💧</span> Dropout率
                <small className="text-gray-500 font-normal ml-2">- 過学習防止のための無効化率</small>
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0"
                  max="0.5"
                  step="0.05"
                  value={hyperparams.dropout}
                  onChange={(e) => updateSliderValue('dropout', e.target.value)}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="min-w-[60px] text-center bg-indigo-500 text-white px-3 py-1 rounded font-bold">
                  {hyperparams.dropout}
                </div>
              </div>
            </div>

            {/* L2正則化 */}
            <div>
              <label className="block text-gray-600 font-medium mb-2">
                <span className="text-lg">🔒</span> L2正則化
                <small className="text-gray-500 font-normal ml-2">- 重みの大きさにペナルティ</small>
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="-5"
                  max="-2"
                  step="0.5"
                  value={Math.log10(hyperparams.l2Reg)}
                  onChange={(e) => updateL2Reg(e.target.value)}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="min-w-[80px] text-center bg-indigo-500 text-white px-3 py-1 rounded font-bold">
                  {hyperparams.l2Reg.toFixed(5)}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <button 
            onClick={onBack}
            className="px-8 py-4 bg-gray-500 text-white text-lg font-bold rounded-xl hover:bg-gray-600 hover:transform hover:-translate-y-1 transition-all duration-300 shadow-lg"
          >
            ← 戻る
          </button>
          <button 
            onClick={generateCode}
            className="px-8 py-4 bg-green-500 text-white text-lg font-bold rounded-xl hover:bg-green-600 hover:transform hover:-translate-y-1 transition-all duration-300 shadow-lg"
          >
            コード生成 🚀
          </button>
        </div>
      </div>

      {/* コード出力エリア */}
      {showCode && (
        <div className="bg-gray-900 text-gray-100 p-6 rounded-2xl shadow-2xl">
          <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-700">
            <h3 className="text-green-400 font-bold text-lg">📝 Generated Python Code</h3>
            <div className="flex gap-3">
              <button 
                onClick={copyCode}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300"
              >
                📋 コピー
              </button>
              <a href="https://colab.research.google.com/github/ebihana/quantum_battle_system_designer/blob/main/Quantum_battle_system_designer.ipynb" target="_blank">
                <button 
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300" >
                  notebookを開く
                </button>
              </a>
            </div>
          </div>
          <pre className="overflow-x-auto text-sm leading-relaxed">
            {generatedCode}
          </pre>
        </div>
      )}
    </div>
  );
}

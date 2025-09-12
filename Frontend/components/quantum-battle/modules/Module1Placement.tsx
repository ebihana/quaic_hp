'use client';

import React, { useState, useEffect } from 'react';
import { QuantumBattleConfig } from '../../../types/quantum-battle';

interface Module1PlacementProps {
  config: QuantumBattleConfig;
  onConfigChange: (config: QuantumBattleConfig) => void;
}

export default function Module1Placement({ config, onConfigChange }: Module1PlacementProps) {
  const [output, setOutput] = useState<string>('');

  const initializeBoard = () => {
    const newBoard = Array(6).fill(null).map(() => Array(6).fill(0));
    
    // プレイヤーA: 下側2行（0-1行）中央4列（1-4列）にランダム配置
    const playerAPositions = [
      [0, 1], [0, 2], [0, 3], [0, 4],
      [1, 1], [1, 2], [1, 3], [1, 4]
    ];
    
    // プレイヤーB: 上側2行（4-5行）中央4列（1-4列）
    const playerBPositions = [
      [4, 1], [4, 2], [4, 3], [4, 4],
      [5, 1], [5, 2], [5, 3], [5, 4]
    ];
    
    // 駒の種類をランダムに配置（善玉4個、悪玉4個）
    const pieceTypes = ['good', 'good', 'good', 'good', 'bad', 'bad', 'bad', 'bad'];
    
    // プレイヤーAの配置
    const shuffledTypesA = [...pieceTypes].sort(() => Math.random() - 0.5);
    const newPlayerAPieces: { good: number[][]; bad: number[][] } = { good: [], bad: [] };
    playerAPositions.forEach(([row, col], index) => {
      const type = shuffledTypesA[index];
      newBoard[row][col] = type === 'good' ? 1 : -1;
      if (type === 'good') {
        newPlayerAPieces.good.push([row, col]);
      } else {
        newPlayerAPieces.bad.push([row, col]);
      }
    });
    
    // プレイヤーBの配置（内部でのみ管理、表示は全てグレー駒）
    const shuffledTypesB = [...pieceTypes].sort(() => Math.random() - 0.5);
    const newPlayerBPieces: { good: number[][]; bad: number[][] } = { good: [], bad: [] };
    playerBPositions.forEach(([row, col], index) => {
      const type = shuffledTypesB[index];
      newBoard[row][col] = 9; // 9 = 相手の駒（種類不明）
      if (type === 'good') {
        newPlayerBPieces.good.push([row, col]);
      } else {
        newPlayerBPieces.bad.push([row, col]);
      }
    });
    
    onConfigChange({
      ...config,
      board: newBoard,
      playerAPieces: newPlayerAPieces,
      playerBPieces: newPlayerBPieces
    });
  };

  useEffect(() => {
    if (config.placement === 'standard') {
      initializeBoard();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.placement]);

  const togglePiece = (row: number, col: number) => {
    if (config.placement !== 'custom') {
      alert('カスタムモードを選択してから駒を編集してください');
      return;
    }
    
    const isPlayerAArea = (row === 0 || row === 1) && (col >= 1 && col <= 4);
    if (!isPlayerAArea) {
      alert('この位置には駒を配置できません（ガイスタールール準拠）');
      return;
    }
    
    const newBoard = [...config.board];
    const current = newBoard[row][col];
    const next = current === 0 ? 1 : current === 1 ? -1 : 0;
    newBoard[row][col] = next;
    
    onConfigChange({ ...config, board: newBoard });
  };

  const runPlacement = () => {
    let goodCount = 0, badCount = 0;
    for (let row of config.board) {
      for (let val of row) {
        if (val > 0) goodCount++;
        if (val < 0) badCount++;
      }
    }
    setOutput(`✅ 初期配置設定完了
配置タイプ: ${config.placement}
善玉の位置: ${goodCount}個
悪玉の位置: ${badCount}個`);
  };

  const selectModule = (type: string, value: string) => {
    onConfigChange({ ...config, [type]: value });
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-2xl">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-gray-200">
        <span className="text-2xl">♟️</span>
        <h3 className="text-2xl font-bold text-indigo-500">モジュール1: 初期配置戦略</h3>
      </div>
      
      <div className="bg-white border-l-4 border-green-500 p-4 rounded-lg shadow-md mb-6">
        <div className="text-gray-600 mb-2 font-mono">In [1]:</div>
        <p className="mb-4">駒の初期配置を設定します。クリックして配置を変更できます。</p>
        
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <h4 className="text-lg font-semibold mb-3">🎯 ガイスターのルール</h4>
          <ul className="space-y-2 ml-5">
            <li><strong>各プレイヤー8駒</strong>: 善玉4個 + 悪玉4個</li>
            <li><strong>自分の駒のみ配置可能</strong>: 下側2行の中央4列に配置</li>
            <li><strong>⚠️ 重要</strong>: 相手の駒配置は見えません（未知）</li>
            <li><strong>脱出口</strong>: 相手陣地の角（薄い色のセル）</li>
          </ul>
        </div>

        {/* 配置ボード */}
        <div className="grid grid-cols-6 gap-0.5 bg-gray-600 p-2 rounded-lg w-fit mx-auto mb-4">
          {Array.from({ length: 36 }, (_, index) => {
            const row = Math.floor(index / 6);
            const col = index % 6;
            const value = config.board[row][col];
            
            const isPlayerAArea = (row === 0 || row === 1) && (col >= 1 && col <= 4);
            const isPlayerBArea = (row === 4 || row === 5) && (col >= 1 && col <= 4);
            const isEscapeA = (row === 0 && col === 0) || (row === 0 && col === 5);
            const isEscapeB = (row === 5 && col === 0) || (row === 5 && col === 5);
            
            let cellClass = 'w-12 h-12 border border-gray-300 flex items-center justify-center text-xl font-bold cursor-pointer transition-all duration-200 ';
            
            if (isPlayerAArea) cellClass += 'border-2 border-dashed border-green-500 ';
            if (isPlayerBArea) cellClass += 'border-2 border-dashed border-blue-500 ';
            if (isEscapeA) cellClass += 'bg-green-200 ';
            if (isEscapeB) cellClass += 'bg-blue-200 ';
            
            if (value === 1) cellClass += 'bg-green-300 text-green-800 ';
            else if (value === -1) cellClass += 'bg-red-300 text-red-800 ';
            else if (value === 9) cellClass += 'bg-gray-400 text-gray-700 cursor-not-allowed ';
            
            let content = '';
            if (isEscapeA || isEscapeB) content = '🚪';
            else if (value === 1) content = '○';
            else if (value === -1) content = '●';
            else if (value === 9) content = '?';
            
            return (
              <div
                key={index}
                className={cellClass}
                onClick={() => togglePiece(row, col)}
                title={
                  isEscapeA ? 'プレイヤーA脱出口' :
                  isEscapeB ? 'プレイヤーB脱出口' :
                  value === 1 ? 'プレイヤーA 善玉' :
                  value === -1 ? 'プレイヤーA 悪玉' :
                  value === 9 ? '相手の駒（種類不明）' :
                  isPlayerAArea ? 'プレイヤーA配置エリア' :
                  isPlayerBArea ? 'プレイヤーB配置エリア' : ''
                }
              >
                {content}
              </div>
            );
          })}
        </div>
        
        <div className="text-center text-sm text-gray-600 mb-6">
          <div className="flex justify-center gap-4 flex-wrap">
            <span className="px-3 py-1 bg-green-300 rounded">A善玉（編集可能）</span>
            <span className="px-3 py-1 bg-red-300 rounded">A悪玉（編集可能）</span>
            <span className="px-3 py-1 bg-gray-400 text-gray-700 rounded">相手駒?（未知・編集不可）</span>
            <span className="px-3 py-1 bg-green-200 rounded">A脱出口</span>
            <span className="px-3 py-1 bg-blue-200 rounded">B脱出口</span>
          </div>
        </div>

        {/* 配置テンプレート選択 */}
        <div className="mb-6">
          <div className="font-medium text-gray-600 mb-3">配置テンプレート：</div>
          <div className="grid grid-cols-2 gap-3">
            <button
              className={`p-3 rounded-lg border-2 transition-all duration-300 ${
                config.placement === 'standard'
                  ? 'bg-indigo-500 text-white border-indigo-600'
                  : 'bg-gray-100 border-gray-300 hover:bg-indigo-50 hover:border-indigo-400'
              }`}
              onClick={() => selectModule('placement', 'standard')}
            >
              標準配置
            </button>
            <button
              className={`p-3 rounded-lg border-2 transition-all duration-300 ${
                config.placement === 'custom'
                  ? 'bg-indigo-500 text-white border-indigo-600'
                  : 'bg-gray-100 border-gray-300 hover:bg-indigo-50 hover:border-indigo-400'
              }`}
              onClick={() => selectModule('placement', 'custom')}
            >
              カスタム
            </button>
          </div>
        </div>

        {/* 説明欄 */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
          <h5 className="text-gray-700 font-semibold mb-3">📝 配置戦略の説明</h5>
          <textarea
            className="w-full min-h-[100px] p-3 border border-gray-300 rounded-lg resize-y focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="この配置戦略について説明してください..."
            defaultValue="修正エンジン対応配置：ガイスタールール準拠
- プレイヤーAは下側（y=4,5）に配置（修正された座標系）
- プレイヤーBは上側（y=0,1）に配置
- 脱出口：A=相手陣地の上側角(0,0),(5,0)、B=下側角(0,5),(5,5)
- 相手の駒配置は完全に未知として学習"
          />
          <div className="text-sm text-gray-500 mt-2 italic">
            AIがこの配置を選択する理由や戦略を記載してください
          </div>
        </div>
        
        <button
          onClick={runPlacement}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300"
        >
          ▶ 配置を実行
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

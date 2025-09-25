'use client';

import React, { useState, useEffect } from 'react';

interface Piece {
  type: 'good' | 'bad';
  player: 'human' | 'ai';
  position: [number, number];
}

interface GameState {
  board: (Piece | null)[][];
  currentPlayer: 'human' | 'ai';
  gameStatus: 'playing' | 'human_wins' | 'ai_wins' | 'draw';
  selectedPiece: [number, number] | null;
  humanPieces: { good: number; bad: number };
  aiPieces: { good: number; bad: number };
}

export default function GeisterDemoGame() {
  const [gameState, setGameState] = useState<GameState>({
    board: Array(6).fill(null).map(() => Array(6).fill(null)),
    currentPlayer: 'human',
    gameStatus: 'playing',
    selectedPiece: null,
    humanPieces: { good: 4, bad: 4 },
    aiPieces: { good: 4, bad: 4 }
  });

  const [message, setMessage] = useState('あなたのターンです。駒をクリックして移動してください。');

  // ゲーム初期化
  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const board = Array(6).fill(null).map(() => Array(6).fill(null));
    
    // 人間の駒を配置（下側2行）
    const humanPieces: Piece[] = [
      { type: 'good', player: 'human', position: [1, 4] },
      { type: 'good', player: 'human', position: [2, 4] },
      { type: 'good', player: 'human', position: [3, 4] },
      { type: 'good', player: 'human', position: [4, 4] },
      { type: 'bad', player: 'human', position: [1, 5] },
      { type: 'bad', player: 'human', position: [2, 5] },
      { type: 'bad', player: 'human', position: [3, 5] },
      { type: 'bad', player: 'human', position: [4, 5] },
    ];

    // AIの駒を配置（上側2行）
    const aiPieces: Piece[] = [
      { type: 'good', player: 'ai', position: [1, 0] },
      { type: 'good', player: 'ai', position: [2, 0] },
      { type: 'good', player: 'ai', position: [3, 0] },
      { type: 'good', player: 'ai', position: [4, 0] },
      { type: 'bad', player: 'ai', position: [1, 1] },
      { type: 'bad', player: 'ai', position: [2, 1] },
      { type: 'bad', player: 'ai', position: [3, 1] },
      { type: 'bad', player: 'ai', position: [4, 1] },
    ];

    // ボードに駒を配置
    [...humanPieces, ...aiPieces].forEach(piece => {
      const [x, y] = piece.position;
      board[y][x] = piece;
    });

    setGameState({
      board,
      currentPlayer: 'human',
      gameStatus: 'playing',
      selectedPiece: null,
      humanPieces: { good: 4, bad: 4 },
      aiPieces: { good: 4, bad: 4 }
    });
    setMessage('あなたのターンです。駒をクリックして移動してください。');
  };

  const isValidMove = (from: [number, number], to: [number, number]): boolean => {
    const [fromX, fromY] = from;
    const [toX, toY] = to;
    
    // 移動先がボード内かチェック
    if (toX < 0 || toX >= 6 || toY < 0 || toY >= 6) return false;
    
    // 隣接するマスかチェック（縦横のみ）
    const dx = Math.abs(toX - fromX);
    const dy = Math.abs(toY - fromY);
    if ((dx === 1 && dy === 0) || (dx === 0 && dy === 1)) return true;
    
    return false;
  };

  const checkWinCondition = (board: (Piece | null)[][]): 'human_wins' | 'ai_wins' | 'playing' => {
    // 人間の善玉が脱出口にいるかチェック
    const humanGoodAtExit = board[0][0]?.player === 'human' && board[0][0]?.type === 'good' ||
                           board[5][0]?.player === 'human' && board[5][0]?.type === 'good';
    
    // AIの善玉が脱出口にいるかチェック
    const aiGoodAtExit = board[0][5]?.player === 'ai' && board[0][5]?.type === 'good' ||
                        board[5][5]?.player === 'ai' && board[5][5]?.type === 'good';
    
    if (humanGoodAtExit) return 'human_wins';
    if (aiGoodAtExit) return 'ai_wins';
    
    // 善玉の数チェック
    let humanGoodCount = 0;
    let aiGoodCount = 0;
    
    for (let y = 0; y < 6; y++) {
      for (let x = 0; x < 6; x++) {
        const piece = board[y][x];
        if (piece?.player === 'human' && piece?.type === 'good') humanGoodCount++;
        if (piece?.player === 'ai' && piece?.type === 'good') aiGoodCount++;
      }
    }
    
    if (humanGoodCount === 0) return 'ai_wins';
    if (aiGoodCount === 0) return 'human_wins';
    
    return 'playing';
  };

  const handleCellClick = (x: number, y: number) => {
    if (gameState.gameStatus !== 'playing' || gameState.currentPlayer !== 'human') return;
    
    const piece = gameState.board[y][x];
    
    if (gameState.selectedPiece) {
      // 移動を試行
      const [fromX, fromY] = gameState.selectedPiece;
      if (isValidMove([fromX, fromY], [x, y])) {
        const newBoard = gameState.board.map(row => [...row]);
        const movingPiece = newBoard[fromY][fromX];
        
        if (movingPiece && movingPiece.player === 'human') {
          // 移動先に駒があるかチェック
          const targetPiece = newBoard[y][x];
          if (targetPiece && targetPiece.player === 'ai') {
            // 駒を取る
            setMessage(`AIの${targetPiece.type === 'good' ? '善玉' : '悪玉'}を取った！`);
          }
          
          // 駒を移動
          newBoard[y][x] = movingPiece;
          newBoard[fromY][fromX] = null;
          
          const winCondition = checkWinCondition(newBoard);
          if (winCondition !== 'playing') {
            setGameState(prev => ({
              ...prev,
              board: newBoard,
              gameStatus: winCondition,
              selectedPiece: null
            }));
            setMessage(winCondition === 'human_wins' ? '🎉 あなたの勝利！' : '🤖 AIの勝利！');
            return;
          }
          
          setGameState(prev => ({
            ...prev,
            board: newBoard,
            currentPlayer: 'ai',
            selectedPiece: null
          }));
          setMessage('AIのターンです...');
          
          // AIのターン
          setTimeout(() => {
            makeAIMove(newBoard);
          }, 1000);
        }
      } else {
        setGameState(prev => ({ ...prev, selectedPiece: null }));
        setMessage('無効な移動です。別の駒を選択してください。');
      }
    } else if (piece && piece.player === 'human') {
      // 駒を選択
      setGameState(prev => ({ ...prev, selectedPiece: [x, y] }));
      setMessage(`選択中: (${x}, ${y}) - 移動先をクリックしてください。`);
    }
  };

  const makeAIMove = (board: (Piece | null)[][]) => {
    const aiPieces: Array<{piece: Piece, position: [number, number]}> = [];
    
    // AIの駒を探す
    for (let y = 0; y < 6; y++) {
      for (let x = 0; x < 6; x++) {
        const piece = board[y][x];
        if (piece && piece.player === 'ai') {
          aiPieces.push({ piece, position: [x, y] });
        }
      }
    }
    
    if (aiPieces.length === 0) return;
    
    // ランダムに駒を選択
    const randomPiece = aiPieces[Math.floor(Math.random() * aiPieces.length)];
    const [fromX, fromY] = randomPiece.position;
    
    // 可能な移動先を探す
    const possibleMoves: [number, number][] = [];
    const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];
    
    for (const [dx, dy] of directions) {
      const newX = fromX + dx;
      const newY = fromY + dy;
      if (isValidMove([fromX, fromY], [newX, newY])) {
        possibleMoves.push([newX, newY]);
      }
    }
    
    if (possibleMoves.length > 0) {
      const [toX, toY] = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
      const newBoard = board.map(row => [...row]);
      const movingPiece = newBoard[fromY][fromX];
      const targetPiece = newBoard[toY][toX];
      
      if (targetPiece && targetPiece.player === 'human') {
        setMessage(`AIがあなたの${targetPiece.type === 'good' ? '善玉' : '悪玉'}を取った！`);
      }
      
      newBoard[toY][toX] = movingPiece;
      newBoard[fromY][fromX] = null;
      
      const winCondition = checkWinCondition(newBoard);
      if (winCondition !== 'playing') {
        setGameState(prev => ({
          ...prev,
          board: newBoard,
          gameStatus: winCondition
        }));
        setMessage(winCondition === 'ai_wins' ? '🤖 AIの勝利！' : '🎉 あなたの勝利！');
        return;
      }
      
      setGameState(prev => ({
        ...prev,
        board: newBoard,
        currentPlayer: 'human'
      }));
      setMessage('あなたのターンです。駒をクリックして移動してください。');
    }
  };

  const getCellContent = (x: number, y: number) => {
    const piece = gameState.board[y][x];
    if (!piece) return null;
    
    const isSelected = gameState.selectedPiece && 
                      gameState.selectedPiece[0] === x && 
                      gameState.selectedPiece[1] === y;
    
    const isHuman = piece.player === 'human';
    const isGood = piece.type === 'good';
    
    return (
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold ${
        isHuman 
          ? (isGood ? 'bg-green-300 text-green-800' : 'bg-red-300 text-red-800')
          : (isGood ? 'bg-blue-300 text-blue-800' : 'bg-gray-400 text-gray-800')
      } ${isSelected ? 'ring-2 ring-yellow-400' : ''}`}>
        {isHuman ? (isGood ? '○' : '●') : '?'}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <p className="text-sm text-gray-700 mb-2">{message}</p>
        <div className="flex justify-center gap-4 text-sm">
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded">あなた: ○善玉 ●悪玉</span>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded">AI: ?駒（種類不明）</span>
        </div>
      </div>
      
      <div className="flex justify-center">
        <div className="grid grid-cols-6 gap-1 bg-gray-800 p-2 rounded-lg">
          {Array.from({ length: 36 }, (_, index) => {
            const x = index % 6;
            const y = Math.floor(index / 6);
            const isEscapeA = (x === 0 && y === 0) || (x === 5 && y === 0);
            const isEscapeB = (x === 0 && y === 5) || (x === 5 && y === 5);
            
            return (
              <div
                key={index}
                className={`w-12 h-12 border border-gray-600 flex items-center justify-center cursor-pointer transition-colors ${
                  isEscapeA ? 'bg-green-200' : 
                  isEscapeB ? 'bg-blue-200' : 
                  'bg-gray-100 hover:bg-gray-200'
                } ${gameState.selectedPiece && gameState.selectedPiece[0] === x && gameState.selectedPiece[1] === y ? 'bg-yellow-200' : ''}`}
                onClick={() => handleCellClick(x, y)}
                title={
                  isEscapeA ? '人間の脱出口' :
                  isEscapeB ? 'AIの脱出口' :
                  `(${x}, ${y})`
                }
              >
                {getCellContent(x, y)}
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="flex justify-center gap-4">
        <button
          onClick={initializeGame}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          新しいゲーム
        </button>
        {gameState.gameStatus !== 'playing' && (
          <div className="text-lg font-bold text-center">
            {gameState.gameStatus === 'human_wins' && '🎉 あなたの勝利！'}
            {gameState.gameStatus === 'ai_wins' && '🤖 AIの勝利！'}
          </div>
        )}
      </div>
      
      <div className="text-xs text-gray-600 text-center">
        <p>💡 ヒント: 相手の駒の種類は分からないので、動きを観察して推測しましょう！</p>
      </div>
    </div>
  );
}

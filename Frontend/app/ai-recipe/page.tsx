'use client';

import React, { useState } from 'react';
import { QuantumBattleConfig, Hyperparameters } from '../../types/quantum-battle';
import StepNavigation from '../../components/quantum-battle/StepNavigation';
import Step1LearningMethod from '../../components/quantum-battle/Step1LearningMethod';
import Step2ModuleDesign from '../../components/quantum-battle/Step2ModuleDesign';
import Step3Hyperparameters from '../../components/quantum-battle/Step3Hyperparameters';

export default function QuantumBattlePage() {
  const [currentStep, setCurrentStep] = useState(1);
  
  const [config, setConfig] = useState<QuantumBattleConfig>({
    learningMethod: '',
    placement: 'standard',
    qubits: 8,
    layers: 3,
    embedding: 'angle',
    entanglement: 'linear',
    reward: 'balanced',
    qmap: 'dqn',
    action: 'epsilon',
    board: Array(6).fill(null).map(() => Array(6).fill(0)),
    playerAPieces: { good: [], bad: [] },
    playerBPieces: { good: [], bad: [] }
  });

  const [hyperparams, setHyperparams] = useState<Hyperparameters>({
    learningRate: 0.001,
    batchSize: 32,
    epochs: 100,
    validation: 0.2,
    epsilon: 0.1,
    epsilonDecay: 0.995,
    replayBuffer: 10000,
    gamma: 0.99,
    dropout: 0.2,
    l2Reg: 0.0001,
    optimizer: 'adam',
    scheduler: 'cosine'
  });

  const showStep = (stepNum: number) => {
    setCurrentStep(stepNum);
  };

  const proceedToStep2 = () => {
    setConfig(prev => ({ ...prev, learningMethod: 'reinforcement' }));
    setCurrentStep(2);
  };

  const proceedToStep3 = () => {
    setCurrentStep(3);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-5">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center text-white mb-8 p-6 bg-white/10 backdrop-blur-lg rounded-2xl">
          <h1 className="text-4xl font-bold mb-3 text-shadow-lg">
            🚀 Quantum Battle System Designer
          </h1>
          <p className="text-xl">3ステップでAI戦略を設計・学習・実行</p>
        </div>

        {/* Step Navigation */}
        <StepNavigation 
          currentStep={currentStep} 
          onStepClick={showStep}
        />

        {/* Step Content */}
        <div className="space-y-8">
          {currentStep === 1 && (
            <Step1LearningMethod 
              config={config}
              onConfigChange={setConfig}
              onProceed={proceedToStep2}
            />
          )}
          
          {currentStep === 2 && (
            <Step2ModuleDesign 
              config={config}
              onConfigChange={setConfig}
              onBack={() => showStep(1)}
              onProceed={proceedToStep3}
            />
          )}
          
          {currentStep === 3 && (
            <Step3Hyperparameters 
              config={config}
              hyperparams={hyperparams}
              onHyperparamsChange={setHyperparams}
              onBack={() => showStep(2)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

'use client';

import React from 'react';

interface StepNavigationProps {
  currentStep: number;
  onStepClick: (step: number) => void;
}

export default function StepNavigation({ currentStep, onStepClick }: StepNavigationProps) {
  const steps = [
    { number: 1, label: '学習方法選択' },
    { number: 2, label: 'モジュール設計' },
    { number: 3, label: 'パラメータ設定' }
  ];

  return (
    <div className="flex justify-center mb-10 bg-white p-6 rounded-2xl shadow-xl">
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <div 
            className={`flex items-center mx-5 cursor-pointer transition-all duration-300 ${
              currentStep === step.number 
                ? 'scale-110' 
                : currentStep > step.number 
                  ? 'opacity-60' 
                  : 'opacity-40'
            }`}
            onClick={() => onStepClick(step.number)}
          >
            <div 
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white mr-3 transition-all duration-300 ${
                currentStep === step.number
                  ? 'bg-indigo-500 scale-125'
                  : currentStep > step.number
                    ? 'bg-green-500'
                    : 'bg-gray-400'
              }`}
            >
              {step.number}
            </div>
            <div 
              className={`font-medium transition-colors duration-300 ${
                currentStep === step.number
                  ? 'text-indigo-500 font-bold'
                  : currentStep > step.number
                    ? 'text-green-500'
                    : 'text-gray-500'
              }`}
            >
              {step.label}
            </div>
          </div>
          {index < steps.length - 1 && (
            <div 
              className={`w-16 h-0.5 mx-2 transition-colors duration-300 ${
                currentStep > step.number ? 'bg-green-500' : 'bg-gray-300'
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

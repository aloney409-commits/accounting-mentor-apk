'use client';

import { motion } from 'framer-motion';

const FLOW_NODES = [
  { id: 'start', label: 'ماذا حدث؟', icon: '📖' },
  { id: 'change', label: 'ما الذي تغيّر؟', icon: '🔄' },
  { id: 'accounts', label: 'الحسابات المتأثرة', icon: '📋' },
  { id: 'classify', label: 'تصنيف الحسابات', icon: '🏷️' },
  { id: 'direction', label: 'زاد أم نقص؟', icon: '📊' },
  { id: 'side', label: 'مدين أم دائن؟', icon: '⚖️' },
  { id: 'balance', label: 'التحقق من التوازن', icon: '✅' },
  { id: 'journal', label: 'القيد المحاسبي', icon: '📝' },
];

export function Flowchart({ currentStep = 0 }: { currentStep?: number }) {
  return (
    <div className="flex flex-col items-stretch gap-1">
      {FLOW_NODES.map((node, idx) => {
        const isActive = idx === currentStep;
        const isDone = idx < currentStep;
        return (
          <div key={node.id} className="flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`
                w-full flex items-center gap-3 p-3 rounded-xl transition-all
                ${
                  isActive
                    ? 'bg-primary text-white shadow-elev-2 scale-105'
                    : isDone
                    ? 'bg-success-container text-success'
                    : 'bg-surface-container text-on-surface-variant opacity-60'
                }
              `}
            >
              <div
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0
                  ${isActive ? 'bg-white/20' : isDone ? 'bg-success/20' : 'bg-on-surface-variant/10'}
                `}
              >
                {isDone ? '✓' : idx + 1}
              </div>
              <div className="flex-1 flex items-center gap-2 min-w-0">
                <span className="text-lg flex-shrink-0">{node.icon}</span>
                <span className="text-sm font-medium truncate">{node.label}</span>
              </div>
            </motion.div>
            {idx < FLOW_NODES.length - 1 && (
              <div
                className={`w-0.5 h-3 ${isDone ? 'bg-success' : 'bg-outline-variant'}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

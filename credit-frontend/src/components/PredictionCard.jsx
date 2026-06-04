import React from 'react';
import RiskBadge from './RiskBadge';

function fmt(num) {
  if (num == null) return '-';
  return (Math.round(num * 100) / 100).toString();
}

export default function PredictionCard({ prediction }) {
  if (!prediction) return null;

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-slate-700 dark:text-slate-200">Prediction</h3>
          <div className="text-xs text-slate-500">Model: {prediction.modelVersion || 'n/a'}</div>
        </div>
        <RiskBadge risk={prediction.riskBand} />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div>
          <div className="text-xs text-slate-500">Default Probability</div>
          <div className="text-lg font-semibold text-slate-800 dark:text-slate-100">{fmt(prediction.defaultProbability)}</div>
        </div>
        <div>
          <div className="text-xs text-slate-500">Status</div>
          <div className="text-lg font-semibold text-slate-800 dark:text-slate-100">{prediction.predictionStatus || '-'}</div>
        </div>
        <div>
          <div className="text-xs text-slate-500">Application</div>
          <div className="text-sm text-slate-700 dark:text-slate-200">Linked</div>
        </div>
        <div>
          <div className="text-xs text-slate-500">Created</div>
          <div className="text-sm text-slate-700 dark:text-slate-200">{prediction.createdAt || '-'}</div>
        </div>
      </div>
    </div>
  );
}

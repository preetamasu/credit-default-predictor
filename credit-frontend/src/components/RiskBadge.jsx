import React from 'react';

const COLORS = {
  LOW: 'bg-emerald-100 text-emerald-800',
  MEDIUM: 'bg-amber-100 text-amber-800',
  HIGH: 'bg-rose-100 text-rose-800',
};

export default function RiskBadge({ risk }) {
  const cls = COLORS[risk] || 'bg-slate-100 text-slate-800';
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${cls}`}>
      {risk || 'UNKNOWN'}
    </span>
  );
}

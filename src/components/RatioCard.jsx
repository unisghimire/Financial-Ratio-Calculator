import React, { useState } from 'react'

export default function RatioCard({ name, formula, meaning, value, category }) {
  const [showDetail, setShowDetail] = useState(false)
  const hasValue = value != null && typeof value === 'number' && !Number.isNaN(value)
  const displayValue = hasValue
    ? (name.includes('Margin') || name.includes('ROA') || name.includes('ROE') || name.includes('Debt to Total'))
      ? `${Number(value).toFixed(2)}%`
      : Number(value).toFixed(2)
    : null

  return (
    <div className="rounded-lg border border-slate-700/60 bg-slate-850/50 overflow-hidden">
      <div className="px-4 py-3">
        <p className="font-display font-medium text-slate-200">{name}</p>
        {hasValue ? (
          <p className="mt-1 font-mono text-xl font-semibold text-emerald-400">{displayValue}</p>
        ) : (
          <p className="mt-1 text-sm text-slate-500">Need more data</p>
        )}
        <button
          type="button"
          onClick={() => setShowDetail(!showDetail)}
          className="mt-2 text-xs text-emerald-400 hover:text-emerald-300 hover:underline"
        >
          {showDetail ? 'Hide formula' : 'Show formula & meaning'}
        </button>
      </div>
      {showDetail && (
        <div className="border-t border-slate-700/60 px-4 py-3 space-y-2 bg-slate-900/40">
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider mb-0.5">Formula</p>
            <p className="text-sm text-slate-300 font-mono">{formula}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider mb-0.5">What it means</p>
            <p className="text-sm text-slate-400">{meaning}</p>
          </div>
        </div>
      )}
    </div>
  )
}

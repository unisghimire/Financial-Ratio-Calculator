import React from 'react'
import { getRatiosByCategory } from '../lib/ratioMetadata'
import RatioCard from './RatioCard'

export default function RatioResults({ ratios, hasData, hasAnyRatio }) {
  const byCategory = getRatiosByCategory()

  if (!hasData) {
    return (
      <div className="rounded-xl border border-dashed border-slate-600 bg-slate-850/30 p-8 text-center">
        <p className="text-slate-400">
          Enter numbers in <strong className="text-slate-300">Step 1</strong> above, or click <strong className="text-emerald-400">Try with sample data</strong> to see ratios here.
        </p>
      </div>
    )
  }

  if (!hasAnyRatio) {
    return (
      <div className="rounded-xl border border-dashed border-slate-600 bg-slate-850/30 p-8 text-center">
        <p className="text-slate-400">
          Add more numbers in Step 1. Many ratios need both income statement and balance sheet values (e.g. Revenue and Total Assets for Asset Turnover).
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {byCategory.map(({ category, ratios: ratioList }) => {
        const withValues = ratioList.filter((r) => {
          const v = ratios[r.key]
          return v != null && typeof v === 'number' && !Number.isNaN(v)
        })
        if (withValues.length === 0) return null
        return (
          <div key={category}>
            <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-3">
              {category}
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {ratioList.map(({ key, name, formula, meaning, category: cat }) => (
                <RatioCard
                  key={key}
                  name={name}
                  formula={formula}
                  meaning={meaning}
                  category={cat}
                  value={ratios[key]}
                />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

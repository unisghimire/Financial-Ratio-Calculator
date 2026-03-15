import React from 'react'

const FIELDS = [
  { key: 'salesRevenue', label: 'Sales Revenue', hint: 'Total revenue from sales' },
  { key: 'costOfGoodsSold', label: 'Cost of Goods Sold', hint: 'Direct cost to produce goods sold' },
  { key: 'operatingExpenses', label: 'Operating Expenses', hint: 'Rent, salaries, marketing, etc.' },
  { key: 'interest', label: 'Interest', hint: 'Interest expense on debt' },
  { key: 'tax', label: 'Tax', hint: 'Income tax expense' },
]

export default function IncomeStatementForm({ data, onChange }) {
  return (
    <div className="rounded-xl bg-slate-850/80 border border-slate-700/60 p-5">
      <h3 className="font-display font-semibold text-emerald-400 mb-1">
        Income Statement
      </h3>
      <p className="text-xs text-slate-500 mb-4">
        Revenue and costs over a period (e.g. one year)
      </p>
      <div className="space-y-3">
        {FIELDS.map(({ key, label, hint }) => (
          <label key={key} className="block">
            <span className="text-sm font-medium text-slate-300 block mb-0.5">{label}</span>
            <span className="text-xs text-slate-500 block mb-1">{hint}</span>
            <input
              type="text"
              inputMode="decimal"
              placeholder="0"
              value={data[key] ?? ''}
              onChange={(e) => onChange({ ...data, [key]: e.target.value })}
              className="w-full rounded-lg border border-slate-600 bg-slate-950/60 px-3 py-2 text-slate-100 placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </label>
        ))}
      </div>
    </div>
  )
}

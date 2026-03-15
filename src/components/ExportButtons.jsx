import React, { useState } from 'react'
import { exportToPDF, exportToExcel } from '../lib/exportReport'

export default function ExportButtons({ ratios }) {
  const [name, setName] = useState('')
  const hasAnyRatio = Object.values(ratios).some(
    (v) => v != null && v !== '' && typeof v === 'number' && !Number.isNaN(v)
  )

  return (
    <div className="rounded-xl bg-slate-850/80 border border-slate-700/60 p-5">
      <div className="flex flex-wrap items-end gap-4">
        <label className="flex-1 min-w-[180px]">
          <span className="text-sm text-slate-400 block mb-1">Report name (optional)</span>
          <input
            type="text"
            placeholder="e.g. Acme Corp 2024"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-slate-600 bg-slate-950/60 px-3 py-2 text-slate-100 placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => exportToPDF(ratios, name || 'Company')}
            disabled={!hasAnyRatio}
            className="rounded-lg bg-red-600/90 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Download PDF
          </button>
          <button
            type="button"
            onClick={() => exportToExcel(ratios, name || 'Company')}
            disabled={!hasAnyRatio}
            className="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Download Excel
          </button>
        </div>
      </div>
      {!hasAnyRatio && (
        <p className="mt-3 text-xs text-slate-500">
          Enter data in Step 1 and get ratios in Step 2 to enable export.
        </p>
      )}
    </div>
  )
}

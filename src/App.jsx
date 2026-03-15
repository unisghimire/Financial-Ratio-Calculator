import React, { useMemo, useState } from 'react'
import IncomeStatementForm from './components/IncomeStatementForm'
import BalanceSheetForm from './components/BalanceSheetForm'
import RatioResults from './components/RatioResults'
import RatioCharts from './components/RatioCharts'
import ExportButtons from './components/ExportButtons'
import {
  defaultIncomeStatement,
  defaultBalanceSheet,
  sampleIncomeStatement,
  sampleBalanceSheet,
} from './lib/financialData'
import { calculateRatios } from './lib/ratios'

function App() {
  const [incomeStatement, setIncomeStatement] = useState(defaultIncomeStatement)
  const [balanceSheet, setBalanceSheet] = useState(defaultBalanceSheet)

  const ratios = useMemo(
    () => calculateRatios(incomeStatement, balanceSheet),
    [incomeStatement, balanceSheet]
  )

  const hasAnyData =
    Object.values(incomeStatement).some((v) => String(v).trim() !== '') ||
    Object.values(balanceSheet).some((v) => String(v).trim() !== '')

  const hasAnyRatio = Object.values(ratios).some(
    (v) => v != null && v !== '' && typeof v === 'number' && !Number.isNaN(v)
  )

  const loadSample = () => {
    setIncomeStatement({ ...sampleIncomeStatement })
    setBalanceSheet({ ...sampleBalanceSheet })
  }

  const clearAll = () => {
    setIncomeStatement({ ...defaultIncomeStatement })
    setBalanceSheet({ ...defaultBalanceSheet })
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900/50">
        <div className="mx-auto max-w-4xl px-4 py-5 sm:px-6">
          <h1 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Financial Ratio Calculator
          </h1>
          <p className="mt-1 text-slate-400 text-sm sm:text-base">
            Enter your numbers below. We’ll calculate key ratios and you can export a report.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={loadSample}
              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500"
            >
              Try with sample data
            </button>
            {hasAnyData && (
              <button
                type="button"
                onClick={clearAll}
                className="rounded-lg border border-slate-600 bg-transparent px-4 py-2 text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-slate-200"
              >
                Clear all
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        {/* Step 1 */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 font-display font-semibold text-sm">
              1
            </span>
            <div>
              <h2 className="font-display text-lg font-semibold text-white">
                Enter your financial numbers
              </h2>
              <p className="text-sm text-slate-400">
                Use values from your income statement and balance sheet. You can use “Try with sample data” to see an example.
              </p>
            </div>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <IncomeStatementForm data={incomeStatement} onChange={setIncomeStatement} />
            <BalanceSheetForm data={balanceSheet} onChange={setBalanceSheet} />
          </div>
        </section>

        {/* Step 2 */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 font-display font-semibold text-sm">
              2
            </span>
            <div>
              <h2 className="font-display text-lg font-semibold text-white">
                Your ratios
              </h2>
              <p className="text-sm text-slate-400">
                Click any ratio to see the formula and what it means.
              </p>
            </div>
          </div>
          <RatioResults ratios={ratios} hasData={hasAnyData} hasAnyRatio={hasAnyRatio} />
          {hasAnyRatio && <RatioCharts ratios={ratios} />}
        </section>

        {/* Step 3 */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 font-display font-semibold text-sm">
              3
            </span>
            <div>
              <h2 className="font-display text-lg font-semibold text-white">
                Export your report
              </h2>
              <p className="text-sm text-slate-400">
                Download results as PDF or Excel.
              </p>
            </div>
          </div>
          <ExportButtons ratios={ratios} />
        </section>
      </main>

      <footer className="mt-12 border-t border-slate-800 py-6 text-center text-sm text-slate-500">
        For analysis only. Always verify with your own data.
      </footer>
    </div>
  )
}

export default App

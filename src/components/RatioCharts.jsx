import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'
import { Bar, Doughnut } from 'react-chartjs-2'
import { getRatiosByCategory } from '../lib/ratioMetadata'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { labels: { color: '#94a3b8' } },
  },
  scales: {
    x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(148,163,184,0.1)' } },
    y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(148,163,184,0.1)' } },
  },
}

export default function RatioCharts({ ratios }) {
  const byCategory = getRatiosByCategory()
  const barLabels = []
  const barValues = []
  const validKeys = []

  byCategory.forEach(({ ratios: list }) => {
    list.forEach(({ key, name }) => {
      const v = ratios[key]
      if (v != null && typeof v === 'number' && !Number.isNaN(v)) {
        barLabels.push(name.length > 20 ? name.slice(0, 18) + '…' : name)
        barValues.push(v)
        validKeys.push(key)
      }
    })
  })

  const barData = {
    labels: barLabels,
    datasets: [
      {
        label: 'Ratio value',
        data: barValues,
        backgroundColor: 'rgba(52, 211, 153, 0.6)',
        borderColor: 'rgb(52, 211, 153)',
        borderWidth: 1,
      },
    ],
  }

  const percentItems = [
    { key: 'grossProfitMargin', label: 'Gross Margin' },
    { key: 'netProfitMargin', label: 'Net Margin' },
    { key: 'returnOnAssets', label: 'ROA' },
    { key: 'returnOnEquity', label: 'ROE' },
    { key: 'debtToTotalCapital', label: 'Debt %' },
  ]
  const doughnutFiltered = percentItems
    .map(({ key, label }) => ({
      label,
      value: ratios[key],
    }))
    .filter(({ value }) => value != null && typeof value === 'number' && !Number.isNaN(value) && value >= 0)
  const doughnutLabels = doughnutFiltered.map((d) => d.label)
  const doughnutValues = doughnutFiltered.map((d) => d.value)

  const doughnutData = {
    labels: doughnutLabels,
    datasets: [
      {
        data: doughnutValues,
        backgroundColor: [
          'rgba(52, 211, 153, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(22, 163, 74, 0.8)',
          'rgba(20, 184, 166, 0.8)',
        ],
        borderColor: ['#34d399', '#10b981', '#22c55e', '#16a34a', '#14b8a6'],
        borderWidth: 1,
      },
    ],
  }

  const hasBar = barValues.length > 0
  const hasDoughnut = doughnutValues.length > 0

  if (!hasBar && !hasDoughnut) {
    return (
      <div className="rounded-xl bg-slate-850/80 border border-slate-700/60 p-6 text-center text-slate-500">
        Enter financial data and view ratios to see charts.
      </div>
    )
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {hasBar && (
        <div className="rounded-xl bg-slate-850/80 border border-slate-700/60 p-4">
          <h3 className="font-display text-sm font-semibold text-slate-300 mb-4">
            Ratios overview
          </h3>
          <div className="h-64">
            <Bar data={barData} options={chartOptions} />
          </div>
        </div>
      )}
      {hasDoughnut && (
        <div className="rounded-xl bg-slate-850/80 border border-slate-700/60 p-4">
          <h3 className="font-display text-sm font-semibold text-slate-300 mb-4">
            Profitability & debt (%)
          </h3>
          <div className="h-64">
            <Doughnut
              data={doughnutData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { labels: { color: '#94a3b8' } } },
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

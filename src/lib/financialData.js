/**
 * Financial statement input types and default values
 */

export const defaultIncomeStatement = {
  salesRevenue: '',
  costOfGoodsSold: '',
  operatingExpenses: '',
  interest: '',
  tax: '',
}

export const defaultBalanceSheet = {
  currentAssets: '',
  currentLiabilities: '',
  totalAssets: '',
  totalDebt: '',
  shareholderEquity: '',
  inventory: '',
}

/** Example data so users can try the calculator without looking up numbers */
export const sampleIncomeStatement = {
  salesRevenue: '1000000',
  costOfGoodsSold: '400000',
  operatingExpenses: '200000',
  interest: '25000',
  tax: '93750',
}

export const sampleBalanceSheet = {
  currentAssets: '350000',
  currentLiabilities: '150000',
  totalAssets: '800000',
  totalDebt: '200000',
  shareholderEquity: '500000',
  inventory: '80000',
}

export function parseNum(value) {
  if (value === '' || value == null) return 0
  const n = Number(String(value).replace(/[^0-9.-]/g, ''))
  return Number.isFinite(n) ? n : 0
}

export function toNum(obj) {
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [k, parseNum(v)])
  )
}

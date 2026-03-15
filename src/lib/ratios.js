import { parseNum } from './financialData'

/**
 * Compute all financial ratios from income statement and balance sheet inputs.
 * All inputs are raw form values (strings or numbers); parsing is done here.
 */
export function calculateRatios(incomeStatement, balanceSheet) {
  const i = {
    salesRevenue: parseNum(incomeStatement.salesRevenue),
    costOfGoodsSold: parseNum(incomeStatement.costOfGoodsSold),
    operatingExpenses: parseNum(incomeStatement.operatingExpenses),
    interest: parseNum(incomeStatement.interest),
    tax: parseNum(incomeStatement.tax),
  }
  const b = {
    currentAssets: parseNum(balanceSheet.currentAssets),
    currentLiabilities: parseNum(balanceSheet.currentLiabilities),
    totalAssets: parseNum(balanceSheet.totalAssets),
    totalDebt: parseNum(balanceSheet.totalDebt),
    shareholderEquity: parseNum(balanceSheet.shareholderEquity),
    inventory: parseNum(balanceSheet.inventory),
  }

  const grossProfit = i.salesRevenue - i.costOfGoodsSold
  const operatingIncome = grossProfit - i.operatingExpenses
  const netIncome = operatingIncome - i.interest - i.tax
  const totalCapital = b.totalDebt + b.shareholderEquity
  const quickAssets = b.currentAssets - b.inventory

  return {
    // Liquidity
    currentRatio: b.currentLiabilities > 0 ? b.currentAssets / b.currentLiabilities : null,
    quickRatio: b.currentLiabilities > 0 ? quickAssets / b.currentLiabilities : null,
    // Profitability
    grossProfitMargin: i.salesRevenue > 0 ? (grossProfit / i.salesRevenue) * 100 : null,
    netProfitMargin: i.salesRevenue > 0 ? (netIncome / i.salesRevenue) * 100 : null,
    returnOnAssets: b.totalAssets > 0 ? (netIncome / b.totalAssets) * 100 : null,
    returnOnEquity: b.shareholderEquity > 0 ? (netIncome / b.shareholderEquity) * 100 : null,
    // Solvency
    debtToEquity: b.shareholderEquity > 0 ? b.totalDebt / b.shareholderEquity : null,
    debtToTotalCapital: totalCapital > 0 ? (b.totalDebt / totalCapital) * 100 : null,
    // Efficiency
    inventoryTurnover: b.inventory > 0 ? i.costOfGoodsSold / b.inventory : null,
    assetTurnover: b.totalAssets > 0 ? i.salesRevenue / b.totalAssets : null,
  }
}

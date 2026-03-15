/**
 * Formula and explanation for each ratio (for display and export)
 */
export const ratioMetadata = {
  currentRatio: {
    name: 'Current Ratio',
    category: 'Liquidity',
    formula: 'Current Ratio = Current Assets / Current Liabilities',
    meaning: "Measures the company's ability to pay short-term obligations with current assets.",
  },
  quickRatio: {
    name: 'Quick Ratio',
    category: 'Liquidity',
    formula: 'Quick Ratio = (Current Assets - Inventory) / Current Liabilities',
    meaning: "Measures the company's ability to meet short-term obligations without selling inventory.",
  },
  grossProfitMargin: {
    name: 'Gross Profit Margin',
    category: 'Profitability',
    formula: 'Gross Profit Margin (%) = (Gross Profit / Sales Revenue) × 100',
    meaning: "Shows the percentage of revenue left after deducting cost of goods sold.",
  },
  netProfitMargin: {
    name: 'Net Profit Margin',
    category: 'Profitability',
    formula: 'Net Profit Margin (%) = (Net Income / Sales Revenue) × 100',
    meaning: "Indicates how much profit is generated from each dollar of revenue.",
  },
  returnOnAssets: {
    name: 'Return on Assets (ROA)',
    category: 'Profitability',
    formula: 'ROA (%) = (Net Income / Total Assets) × 100',
    meaning: "Measures how efficiently the company uses its assets to generate profit.",
  },
  returnOnEquity: {
    name: 'Return on Equity (ROE)',
    category: 'Profitability',
    formula: 'ROE (%) = (Net Income / Shareholder Equity) × 100',
    meaning: "Measures the return generated on shareholders' investment.",
  },
  debtToEquity: {
    name: 'Debt to Equity Ratio',
    category: 'Solvency',
    formula: 'Debt to Equity = Total Debt / Shareholder Equity',
    meaning: "Indicates the proportion of debt used to finance assets relative to equity.",
  },
  debtToTotalCapital: {
    name: 'Debt to Total Capital',
    category: 'Solvency',
    formula: 'Debt to Total Capital (%) = (Total Debt / (Total Debt + Equity)) × 100',
    meaning: "Shows the percentage of capital structure that is financed by debt.",
  },
  inventoryTurnover: {
    name: 'Inventory Turnover',
    category: 'Efficiency',
    formula: 'Inventory Turnover = Cost of Goods Sold / Average Inventory',
    meaning: "Shows how many times inventory is sold and replaced over a period.",
  },
  assetTurnover: {
    name: 'Asset Turnover',
    category: 'Efficiency',
    formula: 'Asset Turnover = Sales Revenue / Total Assets',
    meaning: "Measures how efficiently the company uses assets to generate sales.",
  },
}

export const categoryOrder = ['Liquidity', 'Profitability', 'Solvency', 'Efficiency']

export function getRatiosByCategory() {
  const byCategory = {}
  for (const [key, meta] of Object.entries(ratioMetadata)) {
    const cat = meta.category
    if (!byCategory[cat]) byCategory[cat] = []
    byCategory[cat].push({ key, ...meta })
  }
  return categoryOrder.map((cat) => ({ category: cat, ratios: byCategory[cat] || [] }))
}

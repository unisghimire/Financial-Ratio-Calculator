# Financial Ratio Calculator

A React-based web app to enter financial statement values and automatically calculate key financial ratios, with formulas, explanations, charts, and export to PDF or Excel.

## Features

- **Financial data input** — Income statement (revenue, COGS, expenses, interest, tax) and balance sheet (assets, liabilities, debt, equity, inventory).
- **Automatic ratio calculation** — Liquidity, profitability, solvency, and efficiency ratios.
- **Formula & explanation** — Each ratio shows its formula and a short explanation (toggle per card).
- **Charts** — Bar chart of ratios and doughnut chart for profitability/debt percentages.
- **Export** — Download report as PDF or Excel.

## Tech stack

| Layer   | Tech |
|--------|------|
| Frontend | React 18, Vite, Tailwind CSS |
| Charts   | Chart.js, react-chartjs-2 |
| Export   | jsPDF, jspdf-autotable, xlsx |

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm (comes with Node.js)

## Installation

```bash
git clone https://github.com/YOUR_USERNAME/financial-ratio-calculator.git
cd financial-ratio-calculator
npm install
```

Replace `YOUR_USERNAME` with your GitHub username.

## Usage

**Development**

```bash
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173). Use **Try with sample data** to see ratios without entering numbers.

**Production build**

```bash
npm run build
npm run preview
```

The built app is in the `dist/` folder. Deploy `dist/` to any static host (e.g. GitHub Pages, Vercel, Netlify).

## Scripts

| Command           | Description                |
|-------------------|----------------------------|
| `npm run dev`     | Start dev server           |
| `npm run build`   | Production build           |
| `npm run preview` | Preview production build   |

## Project structure

```
├── public/
├── src/
│   ├── components/       # React components
│   │   ├── IncomeStatementForm.jsx
│   │   ├── BalanceSheetForm.jsx
│   │   ├── RatioResults.jsx
│   │   ├── RatioCard.jsx
│   │   ├── RatioCharts.jsx
│   │   └── ExportButtons.jsx
│   ├── lib/              # Logic and config
│   │   ├── financialData.js
│   │   ├── ratios.js
│   │   ├── ratioMetadata.js
│   │   └── exportReport.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Contributing

Contributions are welcome. Please open an issue first to discuss changes, or submit a pull request. See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

This project is licensed under the MIT License — see [LICENSE](LICENSE) for details.

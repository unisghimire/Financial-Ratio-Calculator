import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import * as XLSX from 'xlsx'
import { getRatiosByCategory } from './ratioMetadata'

function formatRatioValue(value) {
  if (value == null || value === '') return '—'
  if (typeof value === 'number') {
    if (Number.isNaN(value)) return '—'
    if (value > 10 || value < -10) return value.toFixed(2)
    return value.toFixed(2)
  }
  return String(value)
}

export function exportToPDF(ratios, companyName = 'Company') {
  const doc = new jsPDF()
  doc.setFontSize(18)
  doc.text('Financial Ratio Report', 14, 20)
  doc.setFontSize(11)
  doc.setTextColor(100, 100, 100)
  doc.text(`${companyName} • Generated ${new Date().toLocaleDateString()}`, 14, 28)
  doc.setTextColor(0, 0, 0)

  const byCategory = getRatiosByCategory()
  let y = 40

  byCategory.forEach(({ category, ratios: list }) => {
    if (y > 260) {
      doc.addPage()
      y = 20
    }
    doc.setFontSize(12)
    doc.setDrawColor(52, 211, 153)
    doc.setLineWidth(0.5)
    doc.line(14, y, 80, y)
    doc.text(category, 14, y + 6)
    y += 12

    const tableData = list.map(({ name, formula, meaning, key }) => [
      name,
      formatRatioValue(ratios[key]),
      formula,
    ])
    autoTable(doc, {
      startY: y,
      head: [['Ratio', 'Value', 'Formula']],
      body: tableData,
      theme: 'striped',
      headStyles: { fillColor: [52, 211, 153], textColor: [15, 23, 42] },
      margin: { left: 14, right: 14 },
    })
    y = doc.lastAutoTable.finalY + 10
  })

  doc.save(`financial-ratios-${companyName.replace(/\s+/g, '-')}.pdf`)
}

export function exportToExcel(ratios, companyName = 'Company') {
  const byCategory = getRatiosByCategory()
  const rows = [
    ['Financial Ratio Report', ''],
    [companyName, ''],
    ['Generated', new Date().toLocaleString()],
    [],
    ['Category', 'Ratio', 'Value', 'Formula', 'Meaning'],
  ]

  byCategory.forEach(({ category, ratios: list }) => {
    list.forEach(({ key, name, formula, meaning }) => {
      rows.push([category, name, formatRatioValue(ratios[key]), formula, meaning])
    })
    rows.push([])
  })

  const ws = XLSX.utils.aoa_to_sheet(rows)
  const colWidths = [{ wch: 14 }, { wch: 28 }, { wch: 12 }, { wch: 50 }, { wch: 55 }]
  ws['!cols'] = colWidths
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Ratios')
  XLSX.writeFile(wb, `financial-ratios-${companyName.replace(/\s+/g, '-')}.xlsx`)
}

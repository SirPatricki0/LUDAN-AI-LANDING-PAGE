export const fmtInt = (n) => Math.round(n).toLocaleString('es-UY')

export const fmtDec = (n, digits) =>
  n.toLocaleString('es-UY', { minimumFractionDigits: digits, maximumFractionDigits: digits })

export const fmtUSD = (n) => 'USD ' + Math.round(n).toLocaleString('es-UY')

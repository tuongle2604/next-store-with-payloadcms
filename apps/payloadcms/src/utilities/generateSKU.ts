import slugify from 'slugify'

interface SKUOptions {
  categoryCode: string // e.g. 'TSH'
  productId: string | number // e.g. 42
  color?: string // e.g. 'Black'
  size?: string // e.g. 'Medium'
}

export function generateSKU({ categoryCode, productId, color, size }: SKUOptions) {
  const padId = String(productId).padStart(3, '0') // e.g. '042'

  // Convert attributes to safe uppercase codes
  const colorCode = color
    ? slugify(color, { replacement: '', remove: /[^A-Z0-9]/g }).substring(0, 4)
    : ''
  const sizeCode = size
    ? slugify(size, { replacement: '', remove: /[^A-Z0-9]/g }).substring(0, 4)
    : ''

  // Join parts and remove empty sections
  return [categoryCode.toUpperCase(), padId, colorCode, sizeCode].filter(Boolean).join('-')
}

import React from 'react'
import type { SortOrder } from '../../types'

interface SortIconProps {
  order: SortOrder
}

/**
 * SortIcon – renders three distinct icons based on sort state:
 *  'none'  → neutral double-arrow (↕)
 *  'asc'   → single arrow pointing up  (↑)
 *  'desc'  → single arrow pointing down (↓)
 */
const SortIcon: React.FC<SortIconProps> = ({ order }) => {
  const commonProps = {
    xmlns: 'http://www.w3.org/2000/svg',
    width: 14,
    height: 14,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2.2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  }

  if (order === 'asc') {
    return (
      <svg {...commonProps}>
        <polyline points="18 15 12 9 6 15" />
      </svg>
    )
  }

  if (order === 'desc') {
    return (
      <svg {...commonProps}>
        <polyline points="6 9 12 15 18 9" />
      </svg>
    )
  }

  // 'none' – double-headed arrow
  return (
    <svg {...commonProps}>
      <polyline points="8 9 12 5 16 9" />
      <polyline points="16 15 12 19 8 15" />
    </svg>
  )
}

export default SortIcon

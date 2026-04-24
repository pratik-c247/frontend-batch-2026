// import { SelectHTMLAttributes, forwardRef, useState } from 'react'
// import styles from './Select.module.scss'
// import { GLOBAL_CONST } from '@/constants/global.const'
// import { ToolTipIcon } from '@/assets/icons/ToolTipIcon'

// interface Option {
//   label: string
//   value: string | number
// }

// interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
//   label?: string
//   error?: string
//   options: Option[]
//   fullWidth?: boolean
//   placeholder?: string
//   tooltip?: string
// }

// export const Select = forwardRef<HTMLSelectElement, SelectProps>(
//   (
//     {
//       label,
//       error,
//       options,
//       fullWidth = true,
//       className,
//       required,
//       placeholder,
//       tooltip,
//       ...rest
//     },
//     ref,
//   ) => {
//     const [tooltipVisible, setTooltipVisible] = useState(false)

//     return (
//       <div className={`${styles.wrapper} ${fullWidth ? styles.fullWidth : ''}`}>
//         {label && (
//           <label className='label'>
//             {label}
//             {required && (
//               <span className='required'>{GLOBAL_CONST.REQUIRED}</span>
//             )}

//             {tooltip && (
//               <span
//                 className={styles.tooltipAnchor}
//                 onMouseEnter={() => setTooltipVisible(true)}
//                 onMouseLeave={() => setTooltipVisible(false)}
//               >
//                 <span className={styles.infoIcon}>
//                   <ToolTipIcon/>
//                 </span>
//                 {tooltipVisible && (
//                   <span className={styles.tooltipBox}>{tooltip}</span>
//                 )}
//               </span>
//             )}
//           </label>
//         )}

//         <div className={styles.selectContainer}>
//           <select
//             ref={ref}
//             className={`${styles.select} ${error ? styles.errorInput : ''} ${className || ''}`}
//             {...rest}
//           >
//             {placeholder && (
//               <option value="" disabled>
//                 {placeholder}
//               </option>
//             )}

//             {options.map((option) => (
//               <option key={option.value} value={option.value}>
//                 {option.label}
//               </option>
//             ))}
//           </select>
//         </div>

//         {error && <span className={styles.error}>{error}</span>}
//       </div>
//     )
//   },
// )

// Select.displayName = 'Select'

'use client'

import { useState } from 'react'
import ReactSelect from 'react-select'
import styles from './Select.module.scss'
import { GLOBAL_CONST } from '@/constants/global.const'
import { ToolTipIcon } from '@/assets/icons/ToolTipIcon'

interface Option {
  label: string
  value: string | number
}

interface SelectProps {
  label?: string
  error?: string
  options: Option[]
  fullWidth?: boolean
  placeholder?: string
  tooltip?: string
  required?: boolean
  value?: string | number
  isDisabled?: boolean
  onChange?: (value: string | number) => void
}

export const Select = ({
  label,
  error,
  options,
  fullWidth = true,
  placeholder,
  tooltip,
  required,
  value,
  isDisabled,
  onChange,
}: SelectProps) => {
  const [tooltipVisible, setTooltipVisible] = useState(false)

  const selectedOption =
    options.find((option) => option.value === value) || null

  return (
    <div className={`${styles.wrapper} ${fullWidth ? styles.fullWidth : ''}`}>
      {label && (
        <label className="label">
          {label}

          {required && (
            <span className="required">{GLOBAL_CONST.REQUIRED}</span>
          )}

          {tooltip && (
            <span
              className={styles.tooltipAnchor}
              onMouseEnter={() => setTooltipVisible(true)}
              onMouseLeave={() => setTooltipVisible(false)}
            >
              <span className={styles.infoIcon}>
                <ToolTipIcon />
              </span>

              {tooltipVisible && (
                <span className={styles.tooltipBox}>{tooltip}</span>
              )}
            </span>
          )}
        </label>
      )}

      <ReactSelect
        options={options}
        value={selectedOption}
        isDisabled={isDisabled}
        placeholder={placeholder}
        onChange={(selected) => onChange?.(selected?.value || '')}
        classNamePrefix="customSelect"
        className={error ? styles.errorSelect : ''}
      />

      {error && <span className={styles.error}>{error}</span>}
    </div>
  )
}

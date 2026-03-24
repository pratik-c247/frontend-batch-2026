
import { LogoIcon } from '@/assets/icons/LogoIcon'
import styles from './Header.module.scss'

export const Header = () => {
  return (
    <div className={styles.headerWrapper}>
      <LogoIcon />

      <h2>AUTH-MFA</h2>
    </div>
  )
}
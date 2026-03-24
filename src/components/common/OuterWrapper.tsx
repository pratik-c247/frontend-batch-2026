import { LogoIcon } from '@/assets/icons/LogoIcon'
import { Header } from '../layout/Header'
import styles from './OuterWrapper.module.scss'
import type { ReactNode } from 'react'

interface props {
  children: ReactNode
}
export const OuterWrapper = ({ children }: props) => {
  return (
    <section className={`container-fluid ${styles.OuterContainer}`}>
      <div className={styles.leftSec}>
        <Header />
        <div className={styles.childBox}>
          <div className={styles.innerContent}>{children}</div>
        </div>
        <span className={styles.copyRight}>
          @2026 Inc.All rights reserved
        </span>{' '}
      </div>

      <div className={styles.rightSec}>
        <LogoIcon size={80} />
      </div>
    </section>
  )
}

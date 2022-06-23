import styles from './Icon.module.scss';
import React, { ReactNode } from 'react'

const Icon = ({children}: {children: ReactNode}) => {
  return (
    <button className={styles.container}>{children}</button>
  )
}

export default Icon
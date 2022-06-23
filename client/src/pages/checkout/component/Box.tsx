import styles from './Box.module.scss';
import React, { ReactNode } from 'react';

interface Type {
    children?: ReactNode,
    onAction?: React.MouseEventHandler<HTMLButtonElement>,
    onEdit?: React.MouseEventHandler<HTMLButtonElement>,
    title?: string,
    currentStage: string,
    stage: string
}

const Box = ({children, onAction, title, onEdit, currentStage, stage}: Type) => {
  return (
    <div className={styles.container}>

        <div className={styles.title}>
            <b>{title}</b>
            {onEdit &&<button onClick={onEdit}>Edit</button>}
        </div>

        {children}

        {currentStage === stage && onAction && <button className={styles.actionBtn} onClick={onAction}>Next</button>}
    </div>
  )
}

export default Box
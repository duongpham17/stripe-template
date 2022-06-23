import styles from './Sidebar.module.scss';
import React, { ReactElement, ReactNode } from 'react';
import useOpen from 'hooks/useOpen';

interface Types {
  children: ReactNode | ReactElement,
  icon: ReactNode | ReactElement
}

const Sidebar = ({children, icon}: Types) => {

  const {open, onOpen} = useOpen();

  return (
    <div className={styles.container}>
      <div onClick={onOpen}>{icon}</div>                                                  
      { open &&
        <div className={styles.cover} onClick={onOpen}>
          <div className={styles.sidebar} onClick={e => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={onOpen}>&#x2190;</button>
            {children}
          </div>
        </div>
      }
    </div>
  )
}

export default Sidebar
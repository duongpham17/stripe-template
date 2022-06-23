import styles from './Alert.module.scss';
import React from 'react';
import { useAppSelector } from 'redux/useRedux';

const Alert = () => {

    const alert = useAppSelector(state => state.alert);

    return (
        <div className={styles.container}>
            {alert.map(({message, id}: {message: string, id: string}) => 
                <p key={id} className={styles.alert}>{message}</p>
            )}
        </div>
    )
}

export default Alert
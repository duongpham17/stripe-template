import styles from './Login.module.scss'
import React from 'react';
import {Link} from 'react-router-dom';
import { useAppSelector } from 'redux/useRedux';
import { authentication_logout } from 'redux/actions/authentication';

const Login = () => {

    const {isLoggedIn} = useAppSelector(state => state.authentication);

    return (
        <div className={styles.container}>
            {isLoggedIn 
            ? <button onClick={authentication_logout}>Logout</button>
            : <Link to="/login">Login</Link>
            }
        </div>
  )
}

export default Login
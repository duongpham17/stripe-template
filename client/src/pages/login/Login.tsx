import styles from './Login.module.scss';
import React, {useEffect, useState} from 'react';
import { useAppDispatch, useAppSelector } from 'redux/useRedux';

import { useNavigate } from 'react-router-dom';

import {Validation} from './@types';
import valiation from './validation';

import useForm from 'hooks/useForm';
import { authentication_confirm_with_code, authentication_login } from 'redux/actions/authentication';
import InputCode from './InputCode';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const authentication = useAppSelector(state => state.authentication);

    const [code, setCode] = useState<string[]>([...Array(6)].map(() => ""));

    const initalState: Validation = {
        email: "",
    };

    const {values, onChange, onSubmit, errors, loading} = useForm(initalState, callback, valiation);

    async function callback(){
        if(authentication.status === "success") await dispatch(authentication_confirm_with_code(values.email, code.join("")));
        if(authentication.status !== "success") await dispatch(authentication_login(values.email));
    };

    useEffect(() => {
        if(authentication.isLoggedIn) navigate('/');
    }, [authentication.isLoggedIn, navigate]);

    return (
        <div className={styles.container}>
            {
                authentication.status === "success" 
                ?
                <form onSubmit={onSubmit}>
                    <div className={styles.emailsent}>
                        <p>Login link and code sent to email</p>
                        <p>or</p>
                        <p>Enter code</p>
                    </div>
                    <InputCode code={code} setCode={setCode}/>
                    {authentication.errors && <small>{authentication.errors}</small>}
                    {code.join("").length >= 6 && <button>{loading ? <div className="loading-20 center"/> : <span>&#x2192;</span>}</button>}
                </form>
                :
                <form onSubmit={onSubmit}>
                    <input placeholder="Email address" name="email" value={values.email} onChange={onChange} />
                    {errors.email && <small>{errors.email}</small>}
                    {authentication.errors && <small>{authentication.errors}</small>}
                    {values.email.includes("@") && <button>{loading ? <div className="loading-20 center"/> : <span>&#x2192;</span>}</button>}
                </form>
            }
        </div>
    )
}

export default Login
import { Thunk } from 'redux/@types'
import { api } from 'redux/api';

import {
    AUTHENTICATION_LOAD_USER,
    AUTHENTICATION_LOGIN,
    AUTHENTICATION_ERRORS,
    AUTHENTICATION_CONFIRM
} from './types';

export const authentication_load_user = ():Thunk => async dispatch => {
    try{
        const res: any = await api.get('/authentication/persist');
        dispatch({
            type: AUTHENTICATION_LOAD_USER,
            payload: res.data.user
        });
    } catch(err){
        console.log("please reload page")
    }
};

export const authentication_login = (email: string):Thunk => async dispatch => {
    try{
        const res: any = await api.post(`/authentication/${email}`);
        dispatch({
            type: AUTHENTICATION_LOGIN,
            payload: res.data.status
        });
    } catch(error:any){
        dispatch({
            type: AUTHENTICATION_ERRORS,
            payload: error.response.data.message
        })
    }
};

export const authentication_confirm_with_email = (email: string):Thunk => async dispatch => {
    try{
        const res: any = await api.get(`/authentication/confirm/email/${email}`);
        dispatch({
            type: AUTHENTICATION_CONFIRM,
            payload: res.data.status
        });
        localStorage.setItem("user", JSON.stringify(res.data.cookie));
        const win: Window = window; 
        win.location = '/';
    } catch(error:any){
        dispatch({
            type: AUTHENTICATION_ERRORS,
            payload: error.response.data.message
        })
    }
};

export const authentication_confirm_with_code = (email: string, code: string):Thunk => async dispatch => {
    try{
        const res: any = await api.post(`/authentication/confirm/code`, {email, code});
        dispatch({
            type: AUTHENTICATION_CONFIRM,
            payload: res.data.status
        });
        localStorage.setItem("user", JSON.stringify(res.data.cookie));
        const win: Window = window; 
        win.location = '/';
    } catch(error:any){
        dispatch({
            type: AUTHENTICATION_ERRORS,
            payload: error.response.data.message
        })
    }
};

export const authentication_logout = () => {
    localStorage.removeItem("user");
    const win: Window = window; 
    win.location = '/';
}
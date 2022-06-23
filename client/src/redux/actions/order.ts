import { Thunk } from 'redux/@types'
import { api } from 'redux/api';

import { ORDERS } from './types';

export const order_create = async (order: any) => {
    try{
        const res = await api.post('/orders', {order});
        return res.data;
    } catch(err){
        console.log("please reload page")
    }
};

export const order_delete = async (clientSecret: string) => {
    try{
        await api.post(`/orders/${clientSecret}`);
    } catch(err){
        console.log("please reload page")
    }
};

export const order_get = ():Thunk => async dispatch => {
    try{
        const res = await api.get(`/orders`);
        dispatch({
            type: ORDERS,
            payload: res.data.orders
        })
    } catch(err){
        console.log("please reload page")
    }
}
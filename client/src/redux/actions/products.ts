import { Thunk } from 'redux/@types'
import { api } from 'redux/api';

import {
    PRODUCTS,
    PRODUCT,
} from './types';

export const products_get = ():Thunk => async dispatch => {
    try{
        const res: any = await api.get('/products');
        dispatch({
            type: PRODUCTS,
            payload: res.data.products
        });
    } catch(err){
        console.log("please reload page")
    }
};

export const product_get = (name: string):Thunk => async dispatch => {
    try{
        const res: any = await api.get(`/products/${name}`);
        dispatch({
            type: PRODUCT,
            payload: res.data.product
        });
    } catch(err){
        console.log("please reload page")
    }
};

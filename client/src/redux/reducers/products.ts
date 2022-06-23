import {
    PRODUCTS,
    PRODUCT
} from 'redux/actions/types';

import {Product} from 'redux/@types';

interface InitalState {
    products: Product[],
    product: Product | null,
}

const initialState: InitalState = {
    products: [],
    product: null,
}

export const products = (state = initialState, action: any) => {
    const {type, payload} = action;

    switch(type){
        case PRODUCTS:
            return {
                ...state,
                products: payload
            }
        case PRODUCT:
            return{
                ...state,
                product: payload
            }

        default: 
            return state;
    }
}

export default products;
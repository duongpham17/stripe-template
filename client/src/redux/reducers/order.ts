import {
    ORDERS
} from 'redux/actions/types';

interface InitalState {
    orders: []
}

const initialState: InitalState = {
    orders: []
}

export const products = (state = initialState, action: any) => {
    const {type, payload} = action;

    switch(type){
        case ORDERS:
            return {
                ...state,
                orders: payload
            }

        default: 
            return state;
    }
}

export default products;
import {
    BASKET
} from '../actions/types'

interface InitalState {
    basket: [],
}

const initialState: InitalState = {
    basket: []
}

export const basket = (state = initialState, action: any) => {
    const {type, payload} = action;

    switch(type){
        case BASKET:
            return {
                basket: payload
            }

        default: 
            return state;
    }
}

export default basket;
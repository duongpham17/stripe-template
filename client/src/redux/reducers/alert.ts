import {
    ALERT_REMOVE, 
    ALERT_SET,
} from '../actions/types'

interface Alert {
    message: string,
    id: string,
}

const initialState: Alert[] = [];

export const alert = (state = initialState, action: any) => {
    const {type, payload} = action;

    switch(type){
        case ALERT_SET:
            return [...state, payload];
        case ALERT_REMOVE:
            return state.filter(i => i.id !== payload)

        default: 
            return state;
    }
}

export default alert;
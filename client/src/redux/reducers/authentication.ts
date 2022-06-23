import {
    AUTHENTICATION_LOAD_USER, 
    AUTHENTICATION_LOGIN,
    AUTHENTICATION_ERRORS,
    AUTHENTICATION_CONFIRM
} from '../actions/types'

interface InitalState {
    isLoggedIn: boolean,
    user: object,
    status: string,
    errors: string,
}

const initialState: InitalState = {
    isLoggedIn: false,
    user: {},
    status: "",
    errors: ""
}

export const authentication = (state = initialState, action: any) => {
    const {type, payload} = action;

    switch(type){
        case AUTHENTICATION_LOAD_USER:
            return {
                ...state,
                isLoggedIn: true,
                user: payload,
            }
        case AUTHENTICATION_LOGIN:
            return{
                ...state,
                status: payload
            }
        case AUTHENTICATION_CONFIRM:
            return{
                ...state,
                isLoggedIn: true
            }
        case AUTHENTICATION_ERRORS:
            return{
                ...state,
                errors: payload,
            }


        default: 
            return state;
    }
}

export default authentication;
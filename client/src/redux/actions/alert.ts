import {
    ALERT_SET,
    ALERT_REMOVE
} from './types';
import {generateid} from 'utils/functions';
import {Thunk} from 'redux/@types'

export const alert_set = (message: string, timeout = 2000): Thunk => async dispatch => {
    const id = generateid();

    dispatch({
        type: ALERT_SET,
        payload: {message, id}
    })
    setTimeout(() => 
        dispatch({
            type: ALERT_REMOVE,
            payload: id
        })
    , timeout);
};

export const alert_remove = (id: string): Thunk => async dispatch => {
    dispatch({
        type: ALERT_REMOVE,
        payload: id
    })
}
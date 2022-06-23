import { Thunk, Product } from 'redux/@types'
import { alert_set } from './alert';
import { shortenString } from 'utils/functions';

import {
    BASKET,
} from './types';

export const basket_add = (item: Product):Thunk => async dispatch => {
    let basket: [] | string | null = localStorage.getItem("basket");

    let newBasket: Product[] = [];

    if(!basket) {
        newBasket = [item];
        localStorage.setItem("basket", JSON.stringify(newBasket));
        dispatch(alert_set(`${shortenString(item.name)} added`))
    };

    if(basket) {
        newBasket = JSON.parse(basket);
        const itemIndex = newBasket.findIndex((i: Product) => i.id === item.id);
        if(itemIndex !== -1) {
            newBasket[itemIndex].quantity = newBasket[itemIndex].quantity + item.quantity;
            dispatch(alert_set(`${shortenString(item.name)} updated`))
        }
        if(itemIndex === -1) {
            newBasket.unshift(item);
            dispatch(alert_set(`${shortenString(item.name)} added`))
        }
        localStorage.setItem("basket", JSON.stringify(newBasket))
    };

    dispatch({
        type: BASKET,
        payload: newBasket
    });
};


export const basket_get = (): Thunk => async dispatch => {
    let basket: [] | string | null = localStorage.getItem("basket");

    if(!basket) return;

    const newBasket = JSON.parse(basket);

    dispatch({
        type: BASKET,
        payload: newBasket
    });
};

export const basket_quantity = (type: "increment" | "decrement" | "remove", index: number): Thunk => async dispatch => {
    let basket: [] | string | null = localStorage.getItem("basket");

    if(!basket) return;

    const newBasket = JSON.parse(basket);

    if(type === "increment") newBasket[index].quantity += 1;
    if(type === "decrement") newBasket[index].quantity === 1 ? newBasket.splice(index, 1) : newBasket[index].quantity -= 1;
    if(type === "remove") newBasket.splice(index, 1);

    localStorage.setItem("basket", JSON.stringify(newBasket));

    dispatch({
        type: BASKET,
        payload: newBasket
    });
};


export const basket_clear = (): Thunk => async dispatch => {
    localStorage.removeItem("basket");

    dispatch({
        type: BASKET,
        payload: []
    });
};
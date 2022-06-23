import { useEffect, useState } from 'react';
import { useAppSelector } from 'redux/useRedux';
import { OrderDetails, Stage, Order, StripeOptions } from './@types';
import { order_create, order_delete } from 'redux/actions/order';

const useCheckoutContext = () => {

    const authentication = useAppSelector(state => state.authentication);
    
    const [order, setOrder] = useState<OrderDetails>({
        stage: "basket",
        user: "",
        basket: [],
        delivery: {
            cost: 0,
            type: "standard"
        },
        address: {
            email_address: "",
            first_name: "",
            last_name: "",
            first_address: "",
            city: "",
            postcode: ""
        },
        total: 0
    });

    const [stripeOption, setStripeOption] = useState<StripeOptions>({
        clientSecret: '',
        amount: 0
    })

    const onOrderAction = (stage: Stage, order: Order ) => {
        const user = authentication.isLoggedIn ? authentication.user._id : "guest";
        setOrder(state => ({...state, ...order, stage, user}));
    }

    const onEditDetails = (stage: Stage) => {
        setOrder(state => ({...state, stage}));
        order_delete(stripeOption.clientSecret);
        setStripeOption({clientSecret: "", amount: 0});
    }

    useEffect(() => {
        if(order.stage === "payment"){
            (async () => {
            const response = await order_create(order);
            setStripeOption({...response});
            })()
        }
    }, [order]);

    useEffect(() => {
        return () => {if(stripeOption.clientSecret) order_delete(stripeOption.clientSecret)}
    }, [stripeOption.clientSecret])

    return {
        order, setOrder,
        stripeOption, setStripeOption,
        onOrderAction,
        onEditDetails
    }
}

export default useCheckoutContext
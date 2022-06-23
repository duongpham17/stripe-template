import styles from './Orders.module.scss';
import React, {useEffect} from 'react';
import { Order, BasketItem } from './@types';
import { useAppDispatch, useAppSelector } from 'redux/useRedux';
import { order_get } from 'redux/actions/order'
import useOpen from 'hooks/useOpen';
import { firstCapital } from 'utils/functions';

const Orders = () => {

    const {openValue, onOpenValue} = useOpen();

    const dispatch = useAppDispatch();

    const {orders}:{orders:Order[]} = useAppSelector(state => state.order);

    const {isLoggedIn} = useAppSelector(state => state.authentication);

    useEffect(() => {
        if(isLoggedIn) dispatch(order_get());
    }, [dispatch, isLoggedIn])

    return (
        <div className={styles.container}>
            {orders.map((ord: Order) => 
                <div key={ord._id} className={`${styles.element} ${openValue===ord._id && styles.selected}`}>
                    <div className={styles.header}>
                        <button onClick={() => onOpenValue(ord._id)}>
                            <p>
                                <span>{ord.createdAt.substring(0, 10)}</span>
                                <span>{ord.status}</span>
                            </p>
                            <p>
                                <span>Items {ord.basket.length}</span>
                                <span>£{ord.total}</span>
                            </p>
                        </button>
                    </div>

                    {
                        openValue === ord._id &&
                        <div className={styles.openContainer}>
                            <div className={styles.address}>
                                <b>You</b>
                                <p>{firstCapital(ord.address.first_name)} {firstCapital(ord.address.last_name)}</p>
                                <p>{firstCapital(ord.address.email_address)}</p>
                                <b>Delivery address</b>
                                <p>{ord.address.first_address}</p>
                                <p>{ord.address.second_address}</p>
                                <p>{ord.address.company}</p>
                                <p>{ord.address.city}</p>
                                <p>{ord.address.postcode}</p>
                                <b>Delivery</b>
                                <p>
                                    <span>{firstCapital(ord.delivery.type)} Delivery</span>
                                    <span>{ord.delivery.cost === 0 ? "FREE" : `£${ord.delivery.cost}`}</span>
                                </p>
                            </div>
                            <div className={styles.basket}>
                                <b>Items {ord.basket.length}</b>
                                {ord.basket.map((item: BasketItem) => 
                                    <div className={styles.item} key={item.id}>
                                        <div className={styles.image}>
                                            <img src={item.imageUrl} alt={item.name}/>
                                        </div>
                                        <div className={styles.name}>
                                            <p>{item.name}</p>
                                        </div>
                                        <div className={styles.price}>
                                            <p>£{item.price.toFixed(2)}</p>
                                            <p><small>Qty</small> {item.quantity}</p>
                                            <p>£{(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    }

                </div>
            )}
        </div>
    )
}

export default Orders
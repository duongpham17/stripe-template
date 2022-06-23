import styles from './Basket.module.scss';
import React from 'react';

import { firstCapital, totalBasket } from 'utils/functions';
import { useAppSelector } from 'redux/useRedux';
import { BasketItem } from '../@types';

import Box from '../component/Box';

const Basket = (props: any) => {

  const {order, onOrderAction, onEditDetails} = props;

  const {basket} = useAppSelector(state => state.basket);

  const total = totalBasket(basket);

  const onStandard = () => onOrderAction("basket", {delivery: {type: "standard", cost: 0}});

  const onNextDay = () => onOrderAction("basket", {delivery: {type: "next day", cost: 4.99}});

  const onAction = () => onOrderAction("address", {basket, total: total+order.delivery.cost});

  return (
    <Box title="Basket & Delivery" onAction={onAction} currentStage={order.stage} stage="basket" onEdit={() => onEditDetails("basket")}>
      {order.stage === "basket" 
      ?
        <div className={styles.container}>
          {basket.map((item: BasketItem) => 
            <div key={item.id} className={styles.element}>
              <div className={styles.image}>
                <img src={item.imageUrl} alt={item.name}/>
              </div>
  
              <div className={styles.name}>
                <p> {item.name} </p>
              </div>
  
              <div className={styles.price}>
                <p> Qty {item.quantity} </p>
                <p> £{item.price.toFixed(2)} </p>
                <p>£{(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          )}
  
          <div className={styles.total}>
            <b>Subtotal</b>
            <b>£{total.toFixed(2)}</b>
          </div>
  
          <div className={styles.delivery}>
            <button onClick={onStandard}>
              <p>Standard delivery <br/> FREE</p>
              <span className={`${styles.box} ${order.delivery.type === "standard" && styles.boxSelected}`}/>
            </button>
            <button onClick={onNextDay}>
              <p>Next day delivery <br/> £4.99</p>
              <span className={`${styles.box} ${order.delivery.type === "next day" && styles.boxSelected}`}/>
            </button>
          </div>
  
          <div className={styles.total}>
            <b>Grand Total</b>
            <b>£{(total + order.delivery.cost).toFixed(2)}</b>
          </div>
        </div>
        :
        <div className={styles.completed}>
          <div>
            <p>Basket Items ( {order.basket.length} ) </p>
            <p>£{totalBasket(order.basket).toFixed(2)}</p>
          </div>
          <div>
            <p>{firstCapital(order.delivery.type)} Delivery</p>
            <p>{order.delivery.cost === 0 ? "FREE" : `£${order.delivery.cost}`}</p>
          </div>
          <div className={styles.grandTotal}>
            <b>Grand Total</b>
            <b>£{order.total.toFixed(2)}</b>
          </div>
        </div>
      }
    </Box>
  )
}

export default Basket
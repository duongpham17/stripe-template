import styles from './Basket.module.scss';
import React, { useEffect } from 'react';

import {AiOutlineShoppingCart} from 'react-icons/ai';
import Sidebar from 'component/sidebar';
import Icon from '../components/Icon';

import { useAppDispatch, useAppSelector } from 'redux/useRedux';
import { basket_get } from 'redux/actions/basket';
import { Product } from 'redux/@types';

const Basket = () => {

  const dispatch = useAppDispatch();

  const {basket} = useAppSelector(state => state.basket);

  useEffect(() => {
    dispatch(basket_get());
  }, [dispatch])

  return (
    <Sidebar icon={<Icon><AiOutlineShoppingCart/><span className={styles.stuff}/></Icon>}>
        <div className={styles.container}>
          <button className={styles.checkoutBtn}>Checkout</button>
          {basket.map((item: Product) => 
            <div key={item.id} className={styles.element}>
              <img src={item.imageUrl} alt={item.name}/>
              <p>{item.name} £{item.price.toFixed(2)}</p>
            </div>
          )}
        </div>
    </Sidebar>
  )
}

export default Basket
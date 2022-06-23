import styles from './Basket.module.scss';
import React, { useEffect } from 'react';

import {Link} from 'react-router-dom';
import { totalBasket, firstCapital } from 'utils/functions';

import {AiOutlineShoppingCart, AiOutlineDelete, AiOutlinePlus, AiOutlineMinus} from 'react-icons/ai';
import Sidebar from 'component/sidebar';
import Icon from '../components/Icon';

import { useAppDispatch, useAppSelector } from 'redux/useRedux';
import { basket_get, basket_quantity } from 'redux/actions/basket';
import { Product } from 'redux/@types';

const Basket = () => {

  const dispatch = useAppDispatch();

  const {basket} = useAppSelector(state => state.basket);

  useEffect(() => {
    dispatch(basket_get());
  }, [dispatch]);

  return (
    <Sidebar icon={<Icon><AiOutlineShoppingCart/>{!!basket.length && <span className={styles.stuff}/>}</Icon>}>
        <div className={styles.container}>
          { !!basket.length &&
            <Link to="/checkout" className={styles.checkoutBtn}>
              <span>Checkout</span>
              <span>£{totalBasket(basket).toFixed(2)}</span>
            </Link>
          }
          {basket.map((item: Product, index: number) => 
            <div key={item.id} className={styles.element}>

              <div className={styles.image}>
                <Link to={`/product/${item.name}`}>
                  <img src={item.imageUrl} alt={item.name}/>
                </Link>
              </div>

              <div className={styles.info}>
                <div>
                  <p className={styles.name}>{(firstCapital(item.name))} qweqwe qwewqe qeqw qweqw </p>
                  <p>{item.quantity}</p>
                </div>
                <div>
                  <p/>
                  <p>£{item.price.toFixed(2)}</p>
                </div>
                <div>
                  <p>
                    <button onClick={() => dispatch(basket_quantity("remove", index))}><AiOutlineDelete/></button> 
                    <button onClick={() => dispatch(basket_quantity("decrement", index))}><AiOutlineMinus/></button>
                    <button onClick={() => dispatch(basket_quantity("increment", index))}><AiOutlinePlus/></button>
                  </p>
                  <b>£{(item.price * item.quantity).toFixed(2)}</b>
                </div>
              </div>
            </div>
          )}
        </div>
    </Sidebar>
  )
}

export default Basket
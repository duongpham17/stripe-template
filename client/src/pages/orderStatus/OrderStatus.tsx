import styles from './OrderStatus.module.scss';
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch } from 'redux/useRedux';
import { basket_clear } from 'redux/actions/basket';

const OrderStatus = () => {

  const params = useParams();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if(params.token) dispatch(basket_clear());
  }, [params.token, dispatch])

  return (
    <div className={styles.container}>
      <Link to='/orders'>Payment Successful</Link>
    </div>
  )
}

export default OrderStatus
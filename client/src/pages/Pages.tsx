import styles from './Pages.module.scss'
import React from 'react';
import {Routes, Route} from 'react-router-dom';

import Home from './home';
import Login from './login';
import Confirm from './confirm';
import Products from './products';
import Product from './product';
import Checkout from './checkout';
import OrderStatus from './orderStatus';
import Orders from './orders';
import Unknown from './unknown';

const Pages = () => {
  return (
    <div className={styles.container}>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/order/status/:token" element={<OrderStatus/>} />
          <Route path="/products" element={<Products/>} />
          <Route path="/product/:name" element={<Product/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/confirm/:token" element={<Confirm/>} />
          <Route path="*" element={<Unknown/>} />
        </Routes>
    </div>
  )
}

export default Pages
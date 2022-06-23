import styles from './Navbar.module.scss';
import React from 'react';

import Logo from './logo';
import Login from './login';
import Menu from './menu';
import Basket from './basket';

const Navbar = () => {
  
  return (
    <div className={styles.container}>
      <div>
        <Logo/>
      </div>
      <div className={styles.options}>
        <Login/>
        <Basket/>
        <Menu/>
      </div>
    </div>
  )
}

export default Navbar
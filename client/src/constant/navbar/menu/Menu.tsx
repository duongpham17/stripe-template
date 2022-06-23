import styles from './Menu.module.scss';
import React from 'react';
import {Link} from 'react-router-dom';

import {AiOutlineMenu} from 'react-icons/ai';
import Sidebar from 'component/sidebar/Sidebar';
import Icon from '../components/Icon';

const Menu = () => {
  return (
      <Sidebar icon={<Icon><AiOutlineMenu/></Icon>}>
        <div className={styles.container}>
          <Link to="/orders">Orders</Link>
        </div>
      </Sidebar>
  )
}

export default Menu
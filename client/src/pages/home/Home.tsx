import styles from './Home.module.scss';
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className={styles.container}>
        <Link to="/products">Products</Link>
    </div>
  )
}

export default Home
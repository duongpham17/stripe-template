import styles from './Products.module.scss';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/useRedux';
import { products_get} from 'redux/actions/products';
import { Product } from 'redux/@types';
import { firstCapital } from 'utils/functions';

const Products = () => {

    const dispatch = useAppDispatch();

    const {products} = useAppSelector(state =>  state.products);

    useEffect(() => {
        dispatch(products_get())
    }, [dispatch]);

    return (
        <div className={styles.container}>
            {products.map((product: Product) => 
                <div className={styles.element} key={product.id}>
                    <Link to={`/product/${product.name}`}>
                        <img src={product.imageUrl} alt={product.name}/>
                        <p> 
                            <span>{firstCapital(product.name)}</span>
                            <span>£{product.price}</span>
                        </p>
                    </Link>
                </div>
            )}
        </div>
    )
}

export default Products
import styles from './Product.module.scss';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/useRedux';
import { product_get } from 'redux/actions/products';
import { basket_add } from 'redux/actions/basket';
import { useParams } from 'react-router-dom';
import { firstCapital } from 'utils/functions';

const P = () => {

    const params = useParams();

    const dispatch = useAppDispatch();

    const {product} = useAppSelector(state => state.products);

    useEffect(() => {
        if(params.name) dispatch(product_get(params.name))
    }, [params.name, dispatch]);

    const onBasketAdd = () => {
        const cloneProduct = {...product, quantity: 1};
        dispatch(basket_add(cloneProduct));
    }

    return ( !product ? <div className="loading"/> :
        <div className={styles.container}>
            <img src={product.imageUrl} alt={product.name} />
            <p>{firstCapital(product.name)}</p>
            <p>£{product.price.toFixed(2)}</p>

            <button onClick={onBasketAdd}>Add to Basket</button>
        </div>
    )
}

export default P
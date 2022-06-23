import styles from './Address.module.scss';
import React from 'react';
import { Address } from '../@types';

import Box from '../component/Box';
import useForm from 'hooks/useForm';
import validation from './validation';
import { firstCapital } from 'utils/functions';

const AddressContainer = (props: any) => {

    const {order, onOrderAction, onEditDetails} = props;

    const initalState: Address = {
        email_address: "",
        first_name: "",
        last_name: "",
        first_address: "",
        second_address: "",
        company: "",
        city: "",
        postcode: "",
    }

    const {values, onChange, onSubmit, errors} = useForm(initalState, callback, validation);

    function callback(){
        onOrderAction("payment", {address: values});
    };

    return (
        <Box title="Delivery Address" currentStage={order.stage} stage="address" onAction={onSubmit} onEdit={() => onEditDetails("address")}>
            { order.stage === "address"
            ?
                <div className={styles.container}>
                    <form noValidate onSubmit={onSubmit}>

                        <div className={styles.box}>
                            <label>Email address</label>
                            <input name="email_address" value={values.email_address} onChange={onChange} />
                            {errors.email_address && <small>{errors.email_address}</small>}
                        </div>

                        <div className={styles.oneline}>
                            <div className={styles.box}>
                                <label>First name</label>
                                <input name="first_name" value={values.first_name} onChange={onChange} />
                                {errors.first_name && <small>{errors.first_name}</small>}
                            </div>
                            <div className={styles.box}>
                                <label>Last name</label>
                                <input name="last_name" value={values.last_name} onChange={onChange} />
                                {errors.last_name && <small>{errors.last_name}</small>}
                            </div>
                        </div>

                        <div className={styles.box}>
                            <label>First address</label>
                            <input name="first_address" value={values.first_address} onChange={onChange} />
                            {errors.first_address && <small>{errors.first_address}</small>}
                        </div>

                        <div className={styles.box}>
                            <label>Second address ( optional )</label>
                            <input name="second_address" value={values.second_address} onChange={onChange} />
                        </div>

                        <div className={styles.box}>
                            <label>Company ( optional )</label>
                            <input name="company" value={values.company} onChange={onChange} />
                        </div>

                        <div className={styles.oneline}>
                            <div className={styles.box}>
                                <label>City</label>
                                <input name="city" value={values.city} onChange={onChange} />
                                {errors.city && <small>{errors.city}</small>}
                            </div>
                            <div className={styles.box}>
                                <label>Postcode</label>
                                <input name="postcode" value={values.postcode} onChange={onChange} />
                                {errors.postcode && <small>{errors.postcode}</small>}
                            </div>
                        </div>


                    </form>
                </div>
            :
                <div className={styles.completed}>
                    <p>{firstCapital(order.address.email_address)}</p>
                    <p>{firstCapital(order.address.first_name)} {firstCapital(order.address.last_name)}</p>
                    <p>{order.address.first_address}</p>
                    <p>{order.address.second_address}</p>
                    <p>{order.address.company}</p>
                    <p>{order.address.city}</p>
                    <p>{order.address.postcode}</p>
                </div>
            }
            
        </Box>
    )
}

export default AddressContainer

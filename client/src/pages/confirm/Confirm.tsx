import styles from './Confirm.module.scss';
import React, { useEffect } from 'react';
import {Link, useParams} from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/useRedux';
import { authentication_confirm_with_email } from 'redux/actions/authentication';


const Confirm = () => {

  const params = useParams();

  const {errors} = useAppSelector(state => state.authentication);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if(params.token) dispatch(authentication_confirm_with_email(params.token));
  }, [params.token, dispatch]);

  return (
    <div className={styles.container}>
      {errors 
      ? 
        <div>
          <Link to="/login">{errors}</Link>
        </div>
      : 
        <div>
          <p>Verifying email</p>
          <div className='loading-30 center' />
        </div>
      }

    </div>
  )

}

export default Confirm
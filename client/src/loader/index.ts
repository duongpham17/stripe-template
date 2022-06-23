import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/useRedux';
import { authentication_load_user, authentication_logout } from 'redux/actions/authentication';

const Loader = () => {

    const dispatch = useAppDispatch();

    const {isLoggedIn} = useAppSelector(state => state.authentication);


    useEffect(() => {
        let user: any = localStorage.getItem("user"); 
        if(isLoggedIn || !user) return;
        user = JSON.parse(user);
        const isTokenExpired = Date.now() >= user.expires;
        if(isTokenExpired) return authentication_logout();

        dispatch(authentication_load_user());

    }, [isLoggedIn, dispatch]);

    return null;
}

export default Loader
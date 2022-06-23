import {Validation} from './@types';

export const valiation = (values: Validation) => {
    let errors: Validation = {};

    const check = (key: any) => key in values;

    if(check("email")){
        if(!values.email) {
            errors.email = "Email address required";
        }
        else if(!/\S+@\S+\.\S+/.test(values.email)){
            errors.email = "Invalid email address"
        }
    } 

    return errors
}

export default valiation;
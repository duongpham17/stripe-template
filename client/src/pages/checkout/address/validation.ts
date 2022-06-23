import { Address, Partial } from '../@types';

export const valiation = (values: Address) => {
    let errors: Partial<Address> = {};

    const check = (key: any) => key in values;

    if(check("email_address")){
        if(!values.email_address) {
            errors.email_address = "Required";
        }
        else if(!/\S+@\S+\.\S+/.test(values.email_address)){
            errors.email_address = "Invalid email address"
        }
    } 

    if(check("first_name")){
        if(!values.first_name){
            errors.first_name = "Required";
        }
        else if(values.first_name.length < 2){
            errors.first_name = "At least 2 characters long";
        }
        else if(values.first_name.length >= 30){
            errors.first_name = "less than 30 characters long";
        }
    }

    if(check("last_name")){
        if(!values.last_name){
            errors.last_name = "Required";
        }
        else if(values.last_name.length < 2){
            errors.last_name = "At least 2 characters long";
        }
        else if(values.last_name.length >= 30){
            errors.last_name = "less than 30 characters long";
        }
    }

    if(check("first_address")){
        if(!values.first_address){
            errors.first_address = "Required";
        }
        else if(values.first_address.length < 2){
            errors.first_address = "At least 2 characters long";
        }
        else if(values.first_address.length >= 255){
            errors.first_address = "less than 255 characters long";
        }
    }

    if(check("city")){
        if(!values.city){
            errors.city = "Required";
        }
        else if(values.city.length < 2){
            errors.city = "At least 2 characters long";
        }
        else if(values.city.length >= 50){
            errors.city = "less than 50 characters long";
        }
    }

    if(check("postcode")){
        if(!values.postcode){
            errors.postcode = "Required";
        }
        else if(values.postcode.length < 4){
            errors.postcode = "At least 4 characters long";
        }
        else if(values.postcode.length >= 30){
            errors.postcode = "less than 30 characters long";
        }
    }

    return errors
}

export default valiation;
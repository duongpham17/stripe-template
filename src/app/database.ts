import mongoose from 'mongoose';
import {development} from '../utils/environment';

module.exports  = () => {
    
    try{

        const database: any = process.env.DATABASE;

        const database_password: any = process.env.DATABASE_PASSWORD;

        const db = database.replace('<password>', database_password);

        mongoose.connect( db );

        if (development) console.log("DB connection successful!");

    } catch (err){
        console.log("Could not connect to database");
    }

}
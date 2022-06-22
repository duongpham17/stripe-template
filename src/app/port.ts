import {Express} from 'express';
import {development} from '../utils/environment';

module.exports = (app: Express): void => {

    const port = process.env.PORT || 8000;

    const env = () => development && console.log(`Listening on port ${port}`);

    app.listen(port, env);
    
}
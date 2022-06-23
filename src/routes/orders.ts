import express, {IRouter} from 'express';

const orders = require('../controller/orders');
const authentication = require('../controller/authentication');

const router: IRouter = express.Router();

router.get('/', authentication.protect, orders.orderGet);
router.post('/', orders.orderCreate);
router.post('/:secret', orders.orderDelete);

export default router;


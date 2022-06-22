import express, {IRouter} from 'express';

const products = require('../controller/products');

const router: IRouter = express.Router();

router.get('/', products.getProducts);
router.get('/:title', products.getProduct);

export default router;
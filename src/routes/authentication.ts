import express, {IRouter} from 'express';

const authentication = require('../controller/authentication');

const router: IRouter = express.Router();

router.get('/persist', authentication.protect, authentication.persist);

router.post('/:email', authentication.login);
router.post('/confirm/code', authentication.confirmWithCode);
router.get('/confirm/email/:token', authentication.confirmWithEmail);

export default router;
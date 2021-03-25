import express from 'express';
import authRoute from './auth';
import orderRoute from './order';
import productRoute from './product';

const appRoute = express.Router();

appRoute.use('/auth', authRoute);

appRoute.use('/product', productRoute)

appRoute.use('/order', orderRoute)


export default appRoute 
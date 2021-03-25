import express from 'express';
import { createOrder, getOrder, getOrders, getOrdersByUser, updateOrder, deleteOrder } from '../controller/order';
import { isAdmin, verifyToken } from '../middleware/auth';
const orderRoute = express.Router();

orderRoute
    .get('/', verifyToken, getOrders)
    .get('/:id', verifyToken, getOrder)
    .get('/user', verifyToken, getOrdersByUser)
    .post('/', verifyToken, createOrder)
    .put('/:id/pay', verifyToken, updateOrder)
    .delete('/:id', verifyToken, isAdmin, deleteOrder)

    

export default orderRoute
import Qrder from "../../database/models/order";
import { tryAsync } from "../utils/global";
import { notFound, successResponse } from "../utils/http";

const getOrder = () => 
    tryAsync(async (req, res) => {
        const {_id} = req.params;
        const order = await Order.find({_id});
        if(order){
            return successResponse(res, order)
        }
        return notFound(res, 'order not found')
    });

const getOrders = () => 
    tryAsync(async (req, res) => {
        const orders = await Order.find({}).populate('user');
        return successResponse(res, orders)
    })

const getOrdersByUser = () => 
    tryAsync(async (req, res) => {
        const {_id} = req.user;
        const orders = await Order.find({user: _id});
        return successResponse(res, orders);
    });

const deleteOrder = () => 
    tryAsync(async (req, res) => {
        const {_id} = req.params;
        await Order.deleteOne({_id});
        return successResponse(res, 'order deleted success');
    });

const createOrder = () => 
    tryAsync(async (req, res) => {
        const {user:{_id}, body:{totalPrice, orderItems, itemPrice, taxPrice, shipping, payment, shippingPrice, }} = req;

        const newOrder = new Order({
            user: _id,
            totalPrice,
            orderItems,
            itemPrice,
            taxPrice,
            shipping,
            payment,
            shippingPrice
        });

        await newOrder.save();

        return createResponse(res, newOrder)
    });

const updateOrder = () => 
    tryAsync(async (req, res) => {
         const {params:{_id}, body:{payerID, paymentID, orderID}}= req;
         const order = await Order.findOne({_id});
         if(order){
             const updOrder = {
                 isPaid: true,
                 paidAt: Date.now(),
                 payment : {
                     paymentMethod: 'paypal',
                     paymentResult :{
                        payerID,
                        paymentID,
                        orderID
                     }
                 }
             }
             await Order.updateOne({_id}, {updOrder});
             return createResponse(res, {message: 'update success', data: order})
         }
         return notFound(res, 'order not found')
    })

export {getOrder, getOrders, getOrdersByUser, createOrder, updateOrder}
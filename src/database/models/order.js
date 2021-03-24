import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const paymentSchema = {
    paymentMethod: {
        type: String,
        required: true
    }
}

const orderItemSchema =  new Schema({
    name: { 
        type: String, 
        required: true 
    },
    qty: { 
        type: Number, 
        required: true 
    },
    image: { 
        type: String, 
        required: true 
    },
    price: { 
        type: String, 
        required: true 
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
})

const shippingSchema = {
    address: { 
        type: String, 
        required: true 
    },
    city: { 
        type: String, 
        required: true 
    },
    postalCode: { 
        type: String, 
        required: true 
    },
    country: { 
        type: String, 
        required: true 
    },
};

const orderSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    itemPrice: {
        type: Number
    },
    taxPrice: {
        type: Number
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    isDelivered: {
        type: Boolean,
        default: false
    },
    deliveredAt: {
        type: Date
    },
    shippingPrice: {
        type: Number
    },
    totalPrice: {
        type: Number
    },
    paidAt: {
        type: Date
    },
    payment: paymentSchema,
    shipping: shippingSchema,
    orderItems: [orderItemSchema],
});

orderSchema.methods.updateOrder = function(){
    
}


export default mongoose.model('Order', orderSchema)
import express from 'express';
import { createProduct, deleteProduct, getProduct, getProducts, postReviews, updateProduct } from '../controller/product';
import { isAdmin, verifyToken } from '../middleware/auth';

const productRoute = express.Router();

productRoute
    .get('/', getProducts())
    .get('/:id', getProduct())
    .post('/', isAdmin, createProduct())
    .post('/reviews', postReviews())
    .put('/', isAdmin, updateProduct())
    .delete('/', isAdmin, deleteProduct())


export default productRoute;
import express from 'express';

const productRoute = express.Router();

productRoute.get('/', getProd)

export default productRoute;
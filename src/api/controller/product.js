import Product from "../../database/models/product";
import { createResponse, notFound, serverError, successResponse } from "../utils/http";
import { findProductById, deleteProductById } from "../utils/query";
import {tryAsync} from '../utils/global'

const getProduct = () => 
    tryAsync(async (req, res) => {
        const {_id} = req.params;
        const product = findProductById(_id);
        if(!product){
            return notFound(res, 'product not found')
        }
    })

const getProducts = () => 
    tryAsync(async (req, res) => {
        const category = req.query.category ? {category:  req.query.category} : {};
        const searchQuery = req.query.searchKeyword 
        ? 
        {
            name: {
                $regex: req.query.searchKeyword,
                $option: 'i'
            },
        } : {}

        const sortOrder = req.query.sortOrder ? req.query.sortOrder === 'lowest' ? {price : 1} : {price: -1} : {}
        const products = await Product.find({...category, ...searchQuery}).sort(sortOrder)

        return successResponse(res, products)
    })

const postReviews = () => 
    tryAsync(async (req, res) => {
        const {params:{_id}, body: {name, rating, comment}} = req;
        const product = findProductById(_id);

        if(!product){
            return notFound(res, 'product not found')
        }
        const review = {
            name,
            rating,
            comment
        }

        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
        product.rating = product.reviews.reduce(a, c => c.rating + a, 0) / product.rating;

        const updProduct = product.save();
        const result = updProduct.reviews[updProduct.reviews.length - 1];

        return  successResponse(res, {result, message: 'reviews saved success'});
    })

const createProduct = () => 
    tryAsync(async (req, res) => {
        const {name, price, image, brand, category, countInStock, description, rating, numOfReviews} = req.body;

        const product = {name, price, image, brand, category, countInStock, description, rating, numOfReviews};

        const newProduct = await Product.save(product);

        if(newProduct){
            return createProduct(res, newProduct)
        }
        return serverError(res)
    });

const deleteProduct = () => 
    tryAsync(async (req, res) => {
        const {_id} = req.params;
        const product = await findProductById(_id);
        if(product){
            await deleteProductById(_id);
            return successResponse(res, `product with ID ${_id} has been deleted`)
        }
        return notFound(res, 'product not found')
    });

const updateProduct = () => 
    tryAsync(async (req, res) => {
        const {_id} = req.params
        const {name, price, image, brand, category, countInStock, description} = req.body;
        const product = {name, price, brand, image, category, description, countInStock }

        const foundProduct = await findProductById(_id);
        if(foundProduct){
            const updProduct = await foundProduct.updateProduct(product);
            return createResponse(res, updProduct)
        }
        return notFound(res, 'product not found');
    })

export {getProduct, getProducts, createProduct, updateProduct, deleteProduct, postReviews }

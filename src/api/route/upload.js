import express from 'express';
import { uploadImage } from '../controller/upload';
const uploadRoute = express.Router();

uploadRoute.post('/', uploadImage)

export default uploadRoute
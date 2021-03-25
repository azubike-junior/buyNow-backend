import express from 'express';
import { login, register, updateUser } from '../controller/auth';
import { verifyToken } from '../middleware/auth';

const authRoute = express.Router();

authRoute.post('/', register());

authRoute.post('/login', login());

authRoute.put('/', verifyToken, updateUser())

export default authRoute
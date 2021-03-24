import express from 'express';
import { login, register, updateUser } from '../controller/auth';

const userRoute = express.Router();

userRoute.post('/', register());

userRoute.post('/login', login());

userRoute.Put('/', updateUser())

export default userRoute
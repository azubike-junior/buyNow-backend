import jwt from 'jsonwebtoken';
import { config } from '../../config/config';

const generateToken = (user_id) => {
   return jwt.sign({user_id}, config.secret)
}

const decodeToken = (token) => {
    return jwt.verify(token, config.secret)
}

export {generateToken, decodeToken}
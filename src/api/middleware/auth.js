import User from "../../database/models/user";
import {notAuthenticated } from "../utils/http";
import { decodeToken } from "../utils/jwt";
import { findUserById } from "../utils/query";

const verifyToken = async (req, res, next) => {
    const bearerToken = req.headers.authorization;
    if(typeof bearerToken === undefined || '') {
        return notAuthenticated(res, 'no bearer token')
    }
    const token = bearerToken.split(' ')[1];
    const decoded = decodeToken(token)
    const user = await User.findOne({_id: decoded.userId});
    try{
        if(!user){
            return notAuthenticated(res, 'user not authenticated')
        }
        req.user = user;
        next()
    }catch(e){
        return notAuthenticated(res, 'please sign in to continue')
    }
}

const isAdmin = async (req, res, next) => {
    const {_id} = req.user
    const user = await findUserById(_id)
    if(user.isAdmin){
        return next()
    }
    return notAuthenticated(res, 'invalid admin token')
}

export {verifyToken, isAdmin}
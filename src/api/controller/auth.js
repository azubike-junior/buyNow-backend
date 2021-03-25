import { tryAsync } from "../utils/global"
import { badRequest, createResponse, notFound, successResponse } from "../utils/http";
import { generateToken } from "../utils/jwt";
import { findUserByEmail, findUserById } from "../utils/query";
import User from '../../database/models/user'

const register = () => 
    tryAsync( async (req, res) => {
        const {name, email, password} = req.body;
        const existingUser = await findUserByEmail(email);
        if(existingUser){
            return badRequest(res, 'user already exists');
        }
        const user = new User({
            name, 
            email,
            password
        });
        await user.save()
        user.password = undefined
        const token =  generateToken(user._id.toString())
        createResponse(res, {user, token})
    })

const login = () => 
    tryAsync(async (req, res) => {
        const {email, password} = req.body;

        const user = await findUserByEmail(email);

        console.log('==========user', user)
        if(!user){
            return badRequest(res, 'invalid login credentials'); 
        }
        if(!user.isMatchPassword(password)){
            return badRequest(res, 'invalid login credentials')
        }
        user.password = undefined
        const token = generateToken(user._id.toString())
        return successResponse(res, {user, token})
    })

const updateUser = () => 
    tryAsync(async (req, res) => {
        const {body:{name, email}, user:{_id}} = req
        const existingUser = await findUserById(_id)
        if(!existingUser){
            return notFound(res, 'user not found')
        }
        const user = {
            name, 
            email,
        }

        await existingUser.updateUser(user);
        return createResponse(res, existingUser)
    })

    export {register, login, updateUser}
import { tryAsync } from "../utils/global"
import { badRequest, createResponse, notFound, successResponse } from "../utils/http";
import { generateToken } from "../utils/jwt";
import { findUserByEmail } from "../utils/query";

const register = () => 
    tryAsync( async (req, res) => {
        const {name, email, password} = req.body;

        const existingUser = findUserByEmail(email);
        if(existingUser){
            return badRequest(res, 'user is not available');
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

        const user = findUserByEmail(email);
        if(!user){
            return notFound(res, 'invalid login credentials'); 
        }
        if(!user.isMatchPassword(password)){
            return notFound(res, 'invalid login credentials')
        }
        user.password = undefined
        const token = generateToken(user._id.toString())
        return successResponse(res, {user, token})
    })

const updateUser = () => 
    tryAsync(async (req, res) => {
        const {name, password, email} = req.body

        const existingUser = findUserByEmail(email)

        if(!existingUser){
            return notFound(res, 'user not found')
        }
        const user = {
            name, 
            password,
            email
        }

        await existingUser.updateUser(user);
        existingUser.password = undefined

        return createResponse(res, existingUser)
    })

    export {register, login, updateUser}
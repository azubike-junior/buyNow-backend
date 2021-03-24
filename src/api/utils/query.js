import Product from "../../database/models/product"
import User from "../../database/models/user"

export const findUserById = async (_id) => {
    return await User.findOne({_id})
}

export const findUserByEmail = async (email) => {
    return await User.findOne({email})
}

export const getUsers = async () => {
    return await User.find()
}

export const findProductById = async (id) => {
    return await Product.findById({id})
}

export const findProducts = async () => {
    return await Product.find()
}

export const deleteProductById = async (_id) => {
    return await Product.deleteOne(_id)
}

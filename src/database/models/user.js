import mongoose from 'mongoose';
import { comparePassword, hashPassword } from '../../api/utils/password';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        required: true,
        index: true,
        unique: true,
        dropDups: true
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false
    }   
})

userSchema.pre('save', function(next){
    const user = this;
    if(!user.isModified('password')) return next();
    user.password = hashPassword(user.password)
    next()
})

user.methods.isMatchPassword = function(password) {
    return comparePassword(password, this.password)
}

user.methods.updateUser = function(user) {
    this.name = user.name;
    this.email = user.email
    this.password = user.password
    this.save()
    return this;
}

export default mongoose.model('User', userSchema)
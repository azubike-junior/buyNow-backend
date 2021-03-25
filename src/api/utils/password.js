import bcrypt from 'bcryptjs';

const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(8);
    return bcrypt.hashSync(password, salt)
}

const comparePassword = (password, dbPassword) => {
    return bcrypt.compareSync(password, dbPassword)
} 

export {comparePassword, hashPassword}
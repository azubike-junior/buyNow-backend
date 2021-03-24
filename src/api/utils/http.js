import { BAD_REQUEST, CREATED, SERVER_ERROR, SUCCESS, NOT_FOUND, NOT_AUTHENTIACTED } from './constant'

const badRequest = (res, message) => {
    res.status(BAD_REQUEST).json({message})
}

const createResponse = (res, data) => {
    res.status(CREATED).json(data)
}

const serverError = (res) => {
    res.status(SERVER_ERROR).send({message: 'something usual happened! please try again'})
}

const successResponse = (res, data) => {
    res.status(SUCCESS).json(data)
}

const notFound = (res, message) => {
    res.status(NOT_FOUND).json({message})
}

const notAuthenticated = (res, message) => {
    res.status(NOT_AUTHENTIACTED).json({message})
}

export {badRequest, createResponse, serverError, successResponse, notFound, notAuthenticated}
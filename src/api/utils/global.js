import { serverError } from "./http"
import { logger } from "./logger"

export const tryAsync = (handler) => {
    return async(req, res) => {
        try {
            handler(req, res) 
        }catch(e){
            logger.log({
                info: 'e',
                level: 'server error',
                message: e.message
            })
            return serverError(res, 'something unsual happened')
        }
    }
}
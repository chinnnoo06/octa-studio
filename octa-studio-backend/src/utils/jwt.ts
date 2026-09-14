import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../config/env'
import { TUserPayload } from '../types/user/user.types'

export const generateJWT = (payload: TUserPayload) => {

    const token = jwt.sign(payload, SECRET_KEY, {
        expiresIn: '1d'
    })
    return token
}
import Joi from 'joi'
import validate from 'express-validation'
import express from 'express'
import {Responder} from '@codate/commons'
import UpdateUser from '../business/usecase/UpdateUser.mjs'

const schema = {
    body: {
        id:  Joi.any().required(),
        name:  Joi.string().max(255).required(),
        phoneNumber: Joi.string().regex(/^[0-9]+$/, 'numbers').max(20).required()
    }
}

const router = express.Router()
router.put('/users', validate(schema), (req, res, next) => {
    const responder = new Responder(req, res, next)
    const updateUser = new UpdateUser()
    updateUser.execute(req.body, responder)
})

export default router

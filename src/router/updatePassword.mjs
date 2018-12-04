import express from 'express'
import {Responder} from '@codate/commons'
import UpdatePassword from '../business/usecase/UpdatePassword.mjs'

const router = express.Router()
router.put('/auth/password', (req, res, next) => {
    const responder = new Responder(req, res, next)
    const updatePassword = new UpdatePassword()
    updatePassword.execute(req.body, responder)
})

export default router

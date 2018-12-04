import _ from 'lodash'
import Token from '../entity/Token.mjs'
import {emailClient} from '@codate/commons'
import userRepository from '../../repository/UserRepository.mjs'

const TEMPLATE_NAME = 'FORGET_PASSWORD'

export default class ForgetPassword {
    async execute(email, responder) {
        try {
            const userData = await userRepository.findByEmail(email)
            if (_.isEmpty(userData)) {
                throw new Error('EMAIL_NOT_EXISTS')
            }
            if (userData.source !== 'internal') {
                throw new Error('CANOT_CHANGE_USER_FROM_SOCIAL_NETWORK')
            }
            const token = Token.create({email})
            const emailData = {email: userData.email, template: TEMPLATE_NAME, variables: {userData, token}}
            await emailClient.send(emailData)
            responder.success({success: true})
        } catch (err) {
            responder.error(err)
        }
    }
}

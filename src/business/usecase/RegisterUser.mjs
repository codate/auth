import Token from '../entity/Token.mjs'
import userRepository from '../../repository/UserRepository.mjs'
import {emailClient} from '@codate/commons'

const TEMPLATE_NAME = 'REGISTER_EMAIL'

export default class RegisterUser {
    async execute(userData, responder) {
        try {
            await this.checkUserExist(userData)
            const token = Token.create(userData)
            const emailData = {email: userData.email, template: TEMPLATE_NAME, variables: {userData, token}}
            await emailClient.send(emailData)
            responder.success({success: true})
        } catch (err) {
            responder.error(err)
        }
    }

    async checkUserExist(userData) {
        const matchedUser = await userRepository.findByEmail(userData.email)
        if (matchedUser) {
            throw new Error('DUPLICATE_REGISTER')
        }
    }
}

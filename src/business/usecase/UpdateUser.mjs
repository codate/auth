import userRepository from '../../repository/UserRepository'
import UserEntity from '../entity/UserEntity.mjs'

export default class UpdateUser {
    async execute(userData, responder) {
        try {
            const matchedUser = await userRepository.findById(userData.id)
            if (!matchedUser) {
                throw new Error('EMAIL_NOT_EXISTS')
            }
            matchedUser.name = userData.name
            matchedUser.phoneNumber = userData.phoneNumber
            const updatedUser = await userRepository.save(matchedUser)
            const payload = UserEntity.createPayload(updatedUser)
            responder.success(payload)
        } catch (err) {
            responder.error(err)
        }
    }
}

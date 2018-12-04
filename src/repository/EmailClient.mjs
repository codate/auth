import axios from 'axios'

class EmailClient {
    async send(emailData) {
        try {
            const url = `${process.env.URL_BASE}/api/emails`
            const {data} = await axios.post(url, emailData)
            return data
        } catch (err) {
            throw err
        }
    }
}

export default new EmailClient()

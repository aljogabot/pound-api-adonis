'use strict'

const User = use('App/Models/User')

class AuthController {

    async login({ request, auth }) {
        const { email, password } = request.all()
        const token = await auth.attempt(email, password)
        return token
    }

    async register({ request, auth }) {
        const { email, password } = request.all()

        await User.create({
            email,
            password,
            username: email
        })

        return this.login(...arguments)
    }

}

module.exports = AuthController

'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class ClientMembershipNotFoundException extends LogicalException {
    /**
     * Handle this exception by itself
     */
    handle(error, { response }) {
        return response.status(422).json({
            message: 'Client Membership Not Found!!!'
        })
    }
}

module.exports = ClientMembershipNotFoundException

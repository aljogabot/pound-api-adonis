'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class ClientAlreadyHasMembershipException extends LogicalException {
    /**
     * Handle this exception by itself
     */
    handle(error, { response }) {
        return response.status(422).json({
            message: 'The Client Has An Active Membership'
        })
    }
}

module.exports = ClientAlreadyHasMembershipException

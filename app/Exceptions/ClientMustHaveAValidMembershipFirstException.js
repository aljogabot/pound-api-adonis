'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class ClientMustHaveAValidMembershipFirstException extends LogicalException {
    /**
         * Handle this exception by itself
         */
    handle(error, { response }) {
        return response.status(422).json({
            message: 'Client Must Have A Valid Membership First ...'
        })
    }
}

module.exports = ClientMustHaveAValidMembershipFirstException

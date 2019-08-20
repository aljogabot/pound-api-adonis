'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class CannotAddClientMembershipException extends LogicalException {
    /**
     * Handle this exception by itself
     */
    handle(error, { response }) {
        return response.status(422).json({
            message: 'There was something wrong adding your Client Membership ... Please Try Again'
        })
    }
}

module.exports = CannotAddClientMembershipException

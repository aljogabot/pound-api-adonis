'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class MembershipNotFoundException extends LogicalException {
    /**
     * Handle this exception by itself
     */
    handle(error, { response }) {
        return response.status(422).json({
            message: 'No Membership Found'
        })
    }
}

module.exports = MembershipNotFoundException

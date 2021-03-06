'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class ClientSubscriptionNotFoundException extends LogicalException {
    /**
     * Handle this exception by itself
     */
    handle(error, { response }) {
        return response.status(422).json({
            message: 'Client Subscription Not Found ...'
        })
    }
}

module.exports = ClientSubscriptionNotFoundException

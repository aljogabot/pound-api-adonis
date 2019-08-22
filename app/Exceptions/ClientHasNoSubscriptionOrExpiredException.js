'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class ClientHasNoSubscriptionOrExpiredException extends LogicalException {
    /**
         * Handle this exception by itself
         */
    handle(error, { response }) {
        return response.status(422).json({
            message: 'The Client has no subscription or is expired'
        })
    }
}

module.exports = ClientHasNoSubscriptionOrExpiredException

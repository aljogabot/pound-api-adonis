'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class ClientAlreadyHasValidSubscriptionException extends LogicalException {
    /**
       * Handle this exception by itself
       */
    handle(error, { response }) {
        return response.status(422).json({
            message: 'The Client Already Has An Active Subscription'
        })
    }
}

module.exports = ClientAlreadyHasValidSubscriptionException

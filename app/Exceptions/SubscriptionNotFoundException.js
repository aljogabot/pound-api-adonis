'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class SubscriptionNotFoundException extends LogicalException {
    /**
         * Handle this exception by itself
         */
    handle(error, { response }) {
        return response.status(422).json({
            message: 'No Subscription Found or Invalid Subscription'
        })
    }
}

module.exports = SubscriptionNotFoundException

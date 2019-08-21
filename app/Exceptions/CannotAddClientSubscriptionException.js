'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class CannotAddClientSubscriptionException extends LogicalException {
    /**
         * Handle this exception by itself
         */
    handle(error, { response }) {
        return response.status(422).json({
            message: 'There was something wrong adding your Client Subscription ... Please Try Again'
        })
    }
}

module.exports = CannotAddClientSubscriptionException

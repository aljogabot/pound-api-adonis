'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class SubscriptionAlreadyCreatedException extends LogicalException {
    /**
       * Handle this exception by itself
       */
    handle(error, { response }) {
        return response.status(422).json({
            message: 'Subscription Is Already Created ...'
        })
    }
}

module.exports = SubscriptionAlreadyCreatedException

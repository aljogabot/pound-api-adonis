'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class DeleteResourceNotAllowedException extends LogicalException {
    /**
         * Handle this exception by itself
         */
    handle(error, { response }) {
        return response.status(422).json({
            message: 'You Have No Access To Delete This Resource'
        })
    }
}

module.exports = DeleteResourceNotAllowedException

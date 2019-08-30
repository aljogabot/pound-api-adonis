'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class ExpenseDescriptionRequiredException extends LogicalException {
    /**
     * Handle this exception by itself
     */
    handle(error, { response }) {
        return response.status(422).json({
            message: 'Description is required ...'
        })
    }
}

module.exports = ExpenseDescriptionRequiredException

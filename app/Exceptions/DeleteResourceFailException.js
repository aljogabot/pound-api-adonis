'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class DeleteResourceFailException extends LogicalException {
    /**
         * Handle this exception by itself
         */
    handle(error, { response }) {
        return response.status(422).json({
            message: 'Resource failed to delete ... please try again!!!'
        })
    }
}

module.exports = DeleteResourceFailException

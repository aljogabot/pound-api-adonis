'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class ClientAlreadyExistException extends LogicalException {
    /**
     * Handle this exception by itself
     */
    handle(error, { response }) {
        return response.status(422).json({
            message: 'The Client Already Exists'
        })
    }
}

module.exports = ClientAlreadyExistException

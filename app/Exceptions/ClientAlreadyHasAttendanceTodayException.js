'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class ClientAlreadyHasAttendanceTodayException extends LogicalException {
    /**
       * Handle this exception by itself
       */
    handle(error, { response }) {
        return response.status(422).json({
            message: 'This Client already has attendance on this date'
        })
    }
}

module.exports = ClientAlreadyHasAttendanceTodayException

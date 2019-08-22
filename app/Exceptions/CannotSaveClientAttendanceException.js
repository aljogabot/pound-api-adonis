'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class CannotSaveClientAttendanceException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  // handle () {}
}

module.exports = CannotSaveClientAttendanceException

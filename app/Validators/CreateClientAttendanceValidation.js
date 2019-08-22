'use strict'

class CreateClientAttendanceValidation {
    get rules () {
        return {
            client_id: 'required|exists:clients,id',
            date_in: 'required'
        }
    }
}

module.exports = CreateClientAttendanceValidation

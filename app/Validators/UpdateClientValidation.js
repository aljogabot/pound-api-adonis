'use strict'

class UpdateClientValidation {
    get rules() {
        return {
            first_name: 'required',
            last_name: 'required',
            id: 'exists:clients,id'
        }
    }
}

module.exports = UpdateClientValidation
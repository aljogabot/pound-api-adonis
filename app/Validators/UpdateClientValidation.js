'use strict'

class UpdateClientValidation {
    get rules() {
        return {
            first_name: 'required',
            last_name: 'required',
            id: 'exists:clients,id'
        }
    }

    get data() {
        const requestBody = this.ctx.request.all()
        delete requestBody.name
        delete requestBody.has_valid_membership
        delete requestBody.has_valid_subscription
        delete requestBody.subscriptions

        return requestBody
    }
}

module.exports = UpdateClientValidation
'use strict'

class CreateClientValidation {
    get rules () {
        return {
            first_name: 'required',
            last_name: 'required',
            membership_id: 'exists:memberships,id',
            subscription_id: 'exists:subscriptions,id',
        }
    }
}

module.exports = CreateClientValidation
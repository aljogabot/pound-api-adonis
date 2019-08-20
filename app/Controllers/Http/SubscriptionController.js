'use strict'

const Subscription = use('App/Models/Subscription')

class SubscriptionController {

    async listAll() {
        return await Subscription.all()
    }

}

module.exports = SubscriptionController

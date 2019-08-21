'use strict'

class Monthly {
    constructor (client, subscription) {
        this.client = client
        this.subscription = subscription
    }

    setClientMembership (clientMembership) {
        this.clientMembership = clientMembership
    }

    setData (clientSubscriptionData) {
        this.clientSubscriptionData = clientSubscriptionData
    }

    create () {

    }

    debug () {
        this.client.delete()
        this.clientMembership.delete()
        console.log('A OK!!!')
    }
}

module.exports = Monthly
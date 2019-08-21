'use strict'

const Yearly = use('App/Services/ClientSubscription/Yearly')
const Monthly = use('App/Services/ClientSubscription/Monthly')

const Subscription = use('App/Models/Subscription')

class ClientSubscriptionFactory
{
    async initialize (client, subscriptionId, clientMembership) {
        const subscription = await Subscription.find(subscriptionId)

        if (! subscription) {
            client.delete()
            clientMembership.delete()
        }

        const durationType = subscription.type.charAt(0).toUpperCase() + subscription.type.slice(1) + 'ly'
        const className = new durationType(client, subscription)
    }
}

module.exports = new ClientSubscriptionFactory()
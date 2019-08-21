'use strict'

const Yearly = use('App/Services/ClientSubscription/Yearly')
const Monthly = use('App/Services/ClientSubscription/Monthly')

const Subscription = use('App/Models/Subscription')
const SubscriptionNotFoundException = use('App/Exceptions/SubscriptionNotFoundException')

class ClientSubscriptionFactory
{
    async initialize (client, subscriptionId, clientMembership) {
        const subscription = await Subscription.find(subscriptionId)

        if (! subscription) {
            throw new SubscriptionNotFoundException()
        }

        const durationType = subscription.type.charAt(0).toUpperCase() + subscription.type.slice(1) + 'ly'
        // return eval(`new ${durationType}(${client}, ${subscription})`)

        const clientSubscriptionClass = eval(`new ${durationType}()`)
        clientSubscriptionClass.setClient(client)
        clientSubscriptionClass.setSubscription(subscription)
        return clientSubscriptionClass
    }
}

module.exports = new ClientSubscriptionFactory()
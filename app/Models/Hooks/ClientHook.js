'use strict'

const ClientHook = exports = module.exports = {}

ClientHook.attachCurrentClientSubscription = async (client) => {
    const currentSubscription = await client.currentClientSubscription().fetch()
    client.has_valid_subscription = currentSubscription ? currentSubscription.toJSON().active : false
}

ClientHook.attachCurrentClientSubscriptionOnClients = async (clients) => {
    await Promise.all(clients.map(ClientHook.attachCurrentClientSubscription))
}
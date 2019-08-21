'use strict'

const ClientHook = exports = module.exports = {}

ClientHook.attachRelatedModelsOnFind = async (client) => {
    const currentSubscription = await client.currentClientSubscription().fetch()
    client.has_valid_subscription = currentSubscription ? currentSubscription.toJSON().active : false

    const currentMembership = await client.currentClientMembership().fetch()
    client.has_valid_membership = currentMembership ? currentMembership.toJSON().active : false
}

ClientHook.attachCurrentClientSubscriptionOnClients = async (clients) => {
    await Promise.all(clients.map(ClientHook.attachRelatedModelsOnFind))
}
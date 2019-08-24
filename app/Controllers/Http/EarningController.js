'use strict'

const ClientSubscription = use('App/Models/ClientSubscription')
const ClientMembership = use('App/Models/ClientMembership')
const ClientSession = use('App/Models/ClientSession')
const Client = use('App/Models/Client')

class EarningController {

    async getByDate({ params }) {
        const dateOnURL = params.date

        const clientSubscriptions = await ClientSubscription.query()
            .with('subscription')
            .getByDate(dateOnURL)
            .fetch()

        // Get Sum From Client Subscriptions on that DAY
        let sum = 0
        clientSubscriptions.rows.forEach(clientSubscription => {
            const subscription = clientSubscription.getRelated('subscription')
            sum += parseFloat(subscription.amount)
        })

        const clientMemberships = await ClientMembership.query()
            .with('membership')
            .getByDate(dateOnURL)
            .fetch()

        // Get Sum From Client Memberships on that DAY
        clientMemberships.rows.forEach(clientMembership => {
            const membership = clientMembership.getRelated('membership')
            sum += parseFloat(membership.amount)
        })

        const clientSessions = await ClientSession.query().getByDate(dateOnURL).fetch()
        // Get Sum From Client Sessions on that DAY
        clientSessions.rows.forEach(clientSession => {
            sum += clientSession.amount
        })

        const earnings = {
            date: dateOnURL,
            earnings: sum.toFixed(2)
        }

        return {
            earnings,
            memberships_count: clientMemberships.rows.length,
            subscriptions_count: clientSubscriptions.rows.length,
            client_sessions_count: clientSessions.rows.length
        }
    }

}

module.exports = EarningController
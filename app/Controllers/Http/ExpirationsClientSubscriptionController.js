'use strict'

const ClientSubscription = use('App/Models/ClientSubscription')
const ClientSubscriptionExpiry = use('App/Services/ClientSubscription/Expiry')

class ExpirationsClientSubscriptionController {

    async all({ request }) {
        const expired_this_month = await ClientSubscriptionExpiry.justExpiredThisMonth()
        const expired_recently = await ClientSubscriptionExpiry.justExpiredRecently()
        const within_this_week = await ClientSubscriptionExpiry.willExpireInAWeek()
        const within_two_weeks = await ClientSubscriptionExpiry.willExpireInTwoWeeks()
        const all_expired = await ClientSubscriptionExpiry.getAllExpired()

        return {
            expired_this_month,
            expired_recently,
            within_this_week,
            within_two_weeks,
            all_expired
        }
    }
}

module.exports = ExpirationsClientSubscriptionController
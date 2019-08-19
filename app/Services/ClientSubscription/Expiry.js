'use strict'

const ClientSubscription = use('App/Models/ClientSubscription')
const moment = require('moment')

class Expiry {
    constructor() {
        this.clientSubcription = ClientSubscription
    }

    justExpiredThisMonth() {
        const lastMonth = moment().subtract(1, 'month').format('YYYY-MM-DD')
        return this.clientSubcription.query().with('client')
            .where('valid_until', '<', moment().format('YYYY-MM-DD'))
            .where('valid_until', '>', lastMonth)
            .limit(10)
            .fetch()
    }

    justExpiredRecently() {
        const dateLastTwoWeeks = moment().subtract(2, 'week').format('YYYY-MM-DD')

        return this.clientSubcription.query().with('client')
            .where('valid_until', '>', dateLastTwoWeeks)
            .limit(10)
            .fetch()
    }

    willExpireInAWeek() {
        const dateNextWeek = moment().add(1, 'week').format('YYYY-MM-DD')

        return this.clientSubcription.query().with('client')
            .where('valid_until', '<', dateNextWeek)
            .limit(10)
            .fetch()
    }

    willExpireInTwoWeeks() {
        const dateNextTwoWeeks = moment().add(2, 'week').format('YYYY-MM-DD')

        return this.clientSubcription.query().with('client')
            .where('valid_until', '<', dateNextTwoWeeks)
            .limit(10)
            .fetch()
    }

    getAllExpired() {
        const dateNow = moment().format('YYYY-MM-DD')

        return this.clientSubcription.query().with('client')
            .where('valid_until', '<', dateNow)
            .limit(10)
            .fetch()
    }
}

module.exports = new Expiry()
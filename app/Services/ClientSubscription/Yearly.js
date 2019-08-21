'use strict'

const moment = require('moment')

const Payment = use('App/Models/Payment')
const ClientSubscription = use('App/Models/ClientSubscription')

const ClientAlreadyHasValidSubscriptionException = use('App/Exceptions/ClientAlreadyHasValidSubscriptionException')
const CannotAddClientSubscriptionException = use('App/Exceptions/CannotAddClientSubscriptionException')

class Yearly {
    constructor() {
        // this.client = client
        // this.subscription = subscription
        this.payment = new Payment()
    }

    setClient(client) {
        this.client = client
    }

    setSubscription(subscription) {
        this.subscription = subscription
    }

    setClientMembership(clientMembership) {
        this.clientMembership = clientMembership
        return this
    }

    setData(clientSubscriptionData) {
        this.clientSubscriptionData = clientSubscriptionData
        return this
    }

    async create() {
        if (this.client.has_valid_subscription) {
            throw new ClientAlreadyHasValidSubscriptionException()
        }

        this.payment.amount = this.subscription.amount
        this.payment.remarks = `${this.subscription.description} for client: ${this.client.fullName()}`

        await this.client.payments().save(this.payment)

        const startDate = this.clientSubscriptionData.subscription_start_date
        const plusOneYear = moment(startDate).add(this.subscription.duration, this.subscription.type)

        const clientSubscription = new ClientSubscription()
        clientSubscription.fill({
            valid_from: startDate,
            client_started: startDate,
            valid_until: plusOneYear,
            description: this.subscription.description,
            remarks: `${this.subscription.description} for client: ${this.client.fullName()}`,
            payment_id: this.payment.id,
            subscription_id: this.subscription.id,
            client_membership_id: this.clientMembership.id
        })

        if (! await this.client.subscriptions().save(clientSubscription)) {
            throw new CannotAddClientSubscriptionException()
        }

        return clientSubscription
    }

    debug() {
        this.client.delete()
        this.clientMembership.delete()
        console.log('A OK!!!')
    }
}

module.exports = Yearly
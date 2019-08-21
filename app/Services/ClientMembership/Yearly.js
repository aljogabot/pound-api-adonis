'use strict'

const moment = require('moment')

const Client = use('App/Models/Client')
const Payment = use('App/Models/Payment')
const Membership = use('App/Models/Membership')
const ClientMembership = use('App/Models/ClientMembership')
const MembershipNotFoundException = use('App/Exceptions/MembershipNotFoundException')
const CannotAddClientMembershipException = use('App/Exceptions/CannotAddClientMembershipException')
const ClientAlreadyHasValidMembershipException = use('App/Exceptions/ClientAlreadyHasValidMembershipException')

class ClientMembershipYearly {
    constructor () {
        this.payment = new Payment()
    }

    async create (client) {
        if (client.has_valid_membership) {
            throw new ClientAlreadyHasValidMembershipException()
        }
        
        const membership = await Membership.find(this.clientMembershipData.membership_id)
        if (! membership) {
            throw new MembershipNotFoundException()
        }

        this.payment.amount = membership.amount
        this.payment.remarks = `${membership.description} for client: ${client.fullName()}`

        await client.payments().save(this.payment)

        const startDate = this.clientMembershipData.membership_start_date
        const plusOneYear = moment(startDate).add(1, 'year')
        
        const clientMembership = new ClientMembership()
        clientMembership.fill({
            valid_from: startDate,
            valid_until: plusOneYear,
            description: 'One Year Membership',
            remarks: `${membership.description} for client: ${client.fullName()}`,
            payment_id: this.payment.id,
            membership_id: membership.id
        })

        // clientMembership.payment().associate(this.payment)
        // clientMembership.membership().associate(membership)

        if (! await client.memberships().save(clientMembership)) {
            throw new CannotAddClientMembershipException()
        }

        return clientMembership
    }

    setData (clientMembershipData) {
        this.clientMembershipData = clientMembershipData
        return this
    }
}

module.exports = new ClientMembershipYearly()
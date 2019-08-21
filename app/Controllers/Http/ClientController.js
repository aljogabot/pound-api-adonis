'use strict'

const Client = use('App/Models/Client')

const ClientMembershipYearly = use('App/Services/ClientMembership/Yearly')
const ClientService = use('App/Services/ClientService')
const ClientSubscriptionFactory = use('App/Services/ClientSubscription/ClientSubscriptionFactory')

const MembershipNotFoundException = use('App/Exceptions/MembershipNotFoundException')
const CannotAddClientMembershipException = use('App/Exceptions/CannotAddClientMembershipException')
const ClientAlreadyHasValidMembershipException = use('App/Exceptions/ClientAlreadyHasValidMembershipException')
const ClientAlreadyHasValidSubscriptionException = use('App/Exceptions/ClientAlreadyHasValidSubscriptionException')
const CannotAddClientSubscriptionException = use('App/Exceptions/CannotAddClientSubscriptionException')

class ClientController {

    async listAll() {
        return { clients: await Client.all() }
    }

    async listWithPagination({ request }) {
        const paginationParams = request.all()
        let clientQuery = Client.query().with('subscriptions')

        const orderBy = request.input('sort_by', 'created_at')
        const orderDirection = request.input('sort_direction', 'desc')
        const rowsPerPage = request.input('rows_per_page', 10)

        if (paginationParams.search.length > 0) {
            clientQuery.where('first_name', 'like', `%${paginationParams.search}%`)
                .orWhere('last_name', 'like', `%${paginationParams.search}%`)
        }

        return await clientQuery.orderBy(orderBy, orderDirection).paginate(paginationParams.page, rowsPerPage)
    }

    async view({ request, params }) {
        return await Client.find(params.id)
    }

    async update({ request, params }) {
        const client = await Client.find(params.id)

        client.merge(request.all())
        await client.save()

        return { client }
    }

    async create({ request, params }) {
        await ClientService.checkIfExists(request.only(['first_name', 'last_name']))

        const membershipAndSubscriptionVars = ['membership_id', 'membership_start_date', 'subscription_id', 'subscription_start_date']
        const clientData = request.except(membershipAndSubscriptionVars)
        const client = await Client.create(clientData)
        const membershipAndSubscriptionData = request.only(membershipAndSubscriptionVars)

        if (request.input('membership_id')) {
            let clientMembership

            try {

                clientMembership = await ClientMembershipYearly.setData(membershipAndSubscriptionData)
                    .create(client)

            } catch (error) {
                client.delete()

                const classExceptionName = error.name ? error.name : 'CannotAddClientMembershipException'
                eval(`throw new ${classExceptionName}()`)
                return
            }

            
            // TODO: LATER ...
            if (request.input('subscription_id')) {
                try {
                    const ClientSubscriptionService = await ClientSubscriptionFactory.initialize(client, request.input('subscription_id'))

                    ClientSubscriptionService.setData(membershipAndSubscriptionData)
                        .setClientMembership(clientMembership)
                    await ClientSubscriptionService.create()
                } catch (error) {
                    client.delete()
                    await clientMembership.load('payment')
                    const payment = clientMembership.getRelated('payment')
                    payment.delete()
                    clientMembership.delete()

                    const classExceptionName = error.name ? error.name : 'CannotAddClientSubscriptionException'
                    eval(`throw new ${classExceptionName}()`)
                    return
                }
            }

        }

        return {message: 'Yeah', client}
    }
}

module.exports = ClientController

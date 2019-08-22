'use strict'

const Client = use('App/Models/Client')
const ClientSubscription = use('App/Models/ClientSubscription')

const ClientSubscriptionFactory = use('App/Services/ClientSubscription/ClientSubscriptionFactory')

const ClientSubscriptionNotFoundException = use('App/Exceptions/ClientSubscriptionNotFoundException')
const DeleteResourceNotAllowedException = use('App/Exceptions/DeleteResourceNotAllowedException')

const ClientAlreadyHasValidSubscriptionException = use('App/Exceptions/ClientAlreadyHasValidSubscriptionException')
const CannotAddClientSubscriptionException = use('App/Exceptions/CannotAddClientSubscriptionException')
const ClientMustHaveAValidMembershipFirstException = use('App/Exceptions/ClientMustHaveAValidMembershipFirstException')

class ClientSubscriptionController {

    async list({ request }) {

        const paginationParams = request.all()

        const clientSubscriptionQuery = ClientSubscription.query()
            .with('client')
            .with('subscription')
            .with('payment')
            .with('client_membership')

        const orderBy = request.input('sort_by', 'created_at')
        const orderDirection = request.input('sort_direction', 'desc')
        const rowsPerPage = request.input('rows_per_page', 10)

        if (paginationParams.search.length > 0) {
            clientSubscriptionQuery.whereHas('client', (query) => {
                return query.where((query) => {
                    query.where('first_name', 'like', `%${paginationParams.search}%`)
                        .orWhere('last_name', 'like', `%${paginationParams.search}%`)
                })
            })
        }

        return await clientSubscriptionQuery.orderBy(orderBy, orderDirection).paginate(paginationParams.page, rowsPerPage)
    }

    async view ({ param }) {
        const clientSubscription = ClientSubscription.find(params.id)

        if (! clientSubscription) {
            throw new ClientSubscriptionNotFoundException()
        }

        return clientSubscription
    }

    async destroy({ request, params }) {
        if (request.input('passcode') != 'b0gart') {
            throw new DeleteResourceNotAllowedException()
        }

        const clientSubscription = await ClientSubscription.find(params.id)

        if (! clientSubscription) {
            throw new ClientSubscriptionNotFoundException()
        }

        await clientSubscription.load('payment')
        const payment = clientSubscription.getRelated('payment')
        await payment.delete()
        await clientSubscription.delete()

        return clientSubscription
    }

    async create ({ request }) {
        const client = await Client.findOrFail(request.input('client_id'))

        const clientSubscriptionData = {
            subscription_id: request.input('subscription_id'),
            subscription_start_date: request.input('client_started'),
            description: request.input('description', false),
            remarks: request.input('remarks', false)
        }

        try {
            await client.load('currentClientMembership')
            const clientMembership = client.getRelated('currentClientMembership')

            const ClientSubscriptionService = await ClientSubscriptionFactory.initialize(client, request.input('subscription_id'))

            ClientSubscriptionService.setData(clientSubscriptionData)
                .setClientMembership(clientMembership)
            await ClientSubscriptionService.create()
        } catch (error) {
            const classExceptionName = error.name ? error.name : 'CannotAddClientSubscriptionException'
            eval(`throw new ${classExceptionName}()`)
        }
    }

}

module.exports = ClientSubscriptionController

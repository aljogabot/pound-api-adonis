'use strict'

const ClientMembership = use('App/Models/ClientMembership')
const ClientMembershipYearly = use('App/Services/ClientMembership/Yearly')
const Client = use('App/Models/Client')

const ClientMembershipNotFoundException = use('App/Exceptions/ClientMembershipNotFoundException')
const DeleteResourceNotAllowedException = use('App/Exceptions/DeleteResourceNotAllowedException')

const CannotAddClientMembershipException = use('App/Exceptions/CannotAddClientMembershipException')
const ClientAlreadyHasValidMembershipException = use('App/Exceptions/ClientAlreadyHasValidMembershipException')

class ClientMembershipController {

    async list ({ request }) {
        
        const paginationParams = request.all()

        const clientMembershipQuery = ClientMembership.query()
            .with('client')
            .with('membership')

        const orderBy = request.input('sort_by', 'created_at')
        const orderDirection = request.input('sort_direction', 'desc')
        const rowsPerPage = request.input('rows_per_page', 10)

        if (paginationParams.search.length > 0) {
            clientMembershipQuery.whereHas('client', (query) => {
                return query.where('first_name', 'like', `%${paginationParams.search}%`)
                    .orWhere('last_name', 'like', `%${paginationParams.search}%`)
            })
        }

        return await clientMembershipQuery.orderBy(orderBy, orderDirection).paginate(paginationParams.page, rowsPerPage)
    }

    async view ({ request, params }) {
        const clientMembership = ClientMembership.find(params.id)

        if (! clientMembership ) {
            throw new ClientMembershipNotFoundException()
        }

        return clientMembership
    }

    async create ({ request }) {
        const client = await Client.findOrFail(request.input('client_id'))
        
        let clientMembership
        const clientMembershipData = {
            membership_id: request.input('membership_id'),
            membership_start_date: request.input('client_started'),
            description: request.input('description', false),
            remarks: request.input('remarks', false)
        }

        try {
            clientMembership = await ClientMembershipYearly.setData(clientMembershipData)
                .create(client)

        } catch (error) {
            const classExceptionName = error.name ? error.name : 'CannotAddClientMembershipException'
            eval(`throw new ${classExceptionName}()`)
        }

        return
    }

    async update () {}

    async destroy ({ request, params }) {
        if (request.input('passcode') != 'b0gart') {
            throw new DeleteResourceNotAllowedException()
        }

        const clientMembership = await ClientMembership.find(params.id)

        if (! clientMembership) {
            throw new ClientMembershipNotFoundException()
        }

        await clientMembership.load('payment')
        const payment = clientMembership.getRelated('payment')
        await payment.delete()
        await clientMembership.delete()

        return clientMembership
    }

}

module.exports = ClientMembershipController

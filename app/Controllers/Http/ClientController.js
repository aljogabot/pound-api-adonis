'use strict'

const Client = use('App/Models/Client')
const ClientMembershipYearly = use('App/Services/ClientMembership/Yearly')
const ClientService = use('App/Services/ClientService')

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

        const membershipAndSubscrpiptionVars = ['membership_id', 'membership_start_date', 'subscription_id', 'subscription_start_date']
        const clientData = request.except(membershipAndSubscrpiptionVars)
        const client = await Client.create(clientData)

        if (request.input('membership_id')) {

            try {
                const clientMembership = await ClientMembershipYearly.setData(request.only(membershipAndSubscrpiptionVars))
                    .create(client)
            } catch (error) {
                client.delete()
            }
            
            // TODO: LATER ...
            // if (request.input('subscription_id')) {

            //     try {
                    
            //     } catch (error) {
            //         client.delete()
            //         clientMembership.delete()
            //     }

            // }

        }

        return true
    }
}

module.exports = ClientController

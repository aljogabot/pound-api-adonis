'use strict'

const Client = use('App/Models/Client')

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
}

module.exports = ClientController

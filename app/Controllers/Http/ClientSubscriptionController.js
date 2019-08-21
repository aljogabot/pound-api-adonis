'use strict'

const ClientSubscription = use('App/Models/ClientSubscription')

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
                return query.where('first_name', 'like', `%${paginationParams.search}%`)
                    .orWhere('last_name', 'like', `%${paginationParams.search}%`)
            })
        }

        return await clientSubscriptionQuery.orderBy(orderBy, orderDirection).paginate(paginationParams.page, rowsPerPage)
    }

}

module.exports = ClientSubscriptionController

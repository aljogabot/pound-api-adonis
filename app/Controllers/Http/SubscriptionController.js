'use strict'

const Subscription = use('App/Models/Subscription')

const SubscriptionAlreadyCreatedException = use('App/Exceptions/SubscriptionAlreadyCreatedException')
const SubscriptionNotFoundException = use('App/Exceptions/SubscriptionNotFoundException')

class SubscriptionController {

    async listAll() {
        return await Subscription.all()
    }

    async listWithPagination ({ request, params }) {
        const paginationParams = request.all()
        const subscriptionQuery = Subscription.query()

        const orderBy = request.input('sort_by', 'created_at')
        const orderDirection = request.input('sort_direction', 'desc')
        const rowsPerPage = request.input('rows_per_page', 10)

        if (paginationParams.search.length > 0) {
            subscriptionQuery.where('description', 'like', `%${paginationParams.search}%`)
        }

        return await subscriptionQuery.orderBy(orderBy, orderDirection).paginate(paginationParams.page, rowsPerPage)
    }

    async create ({ request }) {
        const subscriptionData = request.except(['id'])

        if (await Subscription.query().where(subscriptionData).first()) {
            throw new SubscriptionAlreadyCreatedException()
        }

        const subscription = await Subscription.create(subscriptionData)
        
        return {message: 'Yeah', subscription}
    }

    async update ({ request, params, response }) {
        const subscription = await Subscription.find(params.id)

        if (! subscription) {
            throw new SubscriptionNotFoundException()
        }

        subscription.merge(request.except(['id', 'duration_type', 'full_description', 'created_at']))

        let status, message

        if (subscription.save()) {
            status = 200
            message = 'Subscription Updated Successfully!!!'
        }
        else {
            status = 422
            message = 'There was something wrong updating your subscription ... Please try again ...'
        }
        
        return response.status(status).json({
            subscription,
            message
        })
    }

}

module.exports = SubscriptionController

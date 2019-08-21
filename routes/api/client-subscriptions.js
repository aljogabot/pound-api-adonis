'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
    Route.get('/', 'ClientSubscriptionController.list')
    Route.get(':id', 'ClientSubscriptionController.view')
    Route.post('create', 'ClientSubscriptionController.create')
    Route.delete(':id/delete', 'ClientSubscriptionController.destroy')
}).prefix('api/client-subscriptions').middleware('auth')
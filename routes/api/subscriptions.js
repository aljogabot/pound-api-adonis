'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
    Route.get('all', 'SubscriptionController.listAll')
}).prefix('api/subscriptions').middleware('auth')
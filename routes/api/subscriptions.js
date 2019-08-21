'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
    Route.get('all', 'SubscriptionController.listAll')
    Route.get('/', 'SubscriptionController.listWithPagination')
    Route.post('create', 'SubscriptionController.create').validator('CreateSubscriptionValidation')
    Route.post(':id/update', 'SubscriptionController.update').validator('UpdateSubscriptionValidation')
}).prefix('api/subscriptions').middleware('auth')
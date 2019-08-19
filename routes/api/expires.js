'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
    Route.get('/', 'ExpirationsClientSubscriptionController.all')
}).prefix('api/expiries/subscription').middleware('auth')
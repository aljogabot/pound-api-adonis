'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
    Route.get('/', 'ClientMembershipController.list')
    Route.get(':id', 'ClientMembershipController.view')
    Route.post('create', 'ClientMembershipController.create')
    Route.delete(':id/delete', 'ClientMembershipController.destroy')
}).prefix('api/client-memberships').middleware('auth')
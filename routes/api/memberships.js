'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
    Route.get('/', 'MembershipController.listAll')
    Route.get(':id', 'MembershipController.view')
}).prefix('api/memberships').middleware('auth')
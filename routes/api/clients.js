'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
    Route.get('/', 'ClientController.listWithPagination')
    Route.get('all', 'ClientController.listAll')
    Route.get(':id', 'ClientController.view')
}).prefix('api/clients').middleware('auth')
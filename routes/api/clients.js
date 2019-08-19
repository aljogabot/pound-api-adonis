'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
    Route.get('/', 'ClientController.listWithPagination')
    Route.get('all', 'ClientController.listAll')
}).prefix('api/clients').middleware('auth')
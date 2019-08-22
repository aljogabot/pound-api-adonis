'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
    Route.get('date/:date', 'EarningController.getByDate')
}).prefix('api/earnings').middleware('auth')
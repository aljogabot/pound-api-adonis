'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
    Route.get(':date', 'ExpenseController.getByDate')
}).prefix('api/expenses').middleware('auth')
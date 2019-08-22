'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
    Route.post('create', 'AttendanceController.clientCreate')
}).prefix('api/attendances/clients')
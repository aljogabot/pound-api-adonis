'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
    Route.post('create', 'AttendanceController.clientCreate').validator('CreateClientAttendanceValidation')
}).prefix('api/attendances/clients')
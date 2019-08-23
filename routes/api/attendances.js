'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
    Route.post('create', 'AttendanceController.clientCreate').validator('CreateClientAttendanceValidation')
    Route.post(':id/update', 'AttendanceController.clientUpdate')
    Route.get(':id/view', 'AttendanceController.clientView')
    Route.delete(':id/delete', 'AttendanceController.clientDestroy')
    Route.post(':id/make-paid', 'AttendanceController.makeClientPaid')
}).prefix('api/attendances/clients')

Route.group(() => {
    Route.get(':date', 'AttendanceController.getByDate')
}).prefix('api/attendances/daily')
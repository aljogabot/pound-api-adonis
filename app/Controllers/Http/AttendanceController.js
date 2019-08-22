'use strict'

const Client = use('App/Models/Client')
const Attendance = use('App/Models/Attendance')
const ClientSession = use('App/Models/ClientSession')

const ClientAlreadyHasAttendanceTodayException = use('App/Exceptions/ClientAlreadyHasAttendanceTodayException')
const ClientHasNoSubscriptionOrExpiredException = use('App/Exceptions/ClientHasNoSubscriptionOrExpiredException')
const CannotSaveClientAttendanceException = use('App/Exceptions/CannotSaveClientAttendanceException')

class AttendanceController {

    async clientCreate ({ request }) {
        const client = await Client.findOrFail(request.input('client_id'))

        if (await Attendance.query().existsOnThisDate(client.id, request.input('date_in')).first()) {
            throw new ClientAlreadyHasAttendanceTodayException()
        }

        if (! client.has_valid_subscription && ! request.input('is_session', false)) {
            throw new ClientHasNoSubscriptionOrExpiredException()
        }

        const attendance = new Attendance()
        attendance.fill(request.except(['is_session']))
        attendance.is_session = client.has_valid_subscription ? false : true

        if (! await client.attendances().save(attendance)) {
            throw new CannotSaveClientAttendanceException()
        }

        await attendance.reload()

        // Process Client Session
        if (request.input('is_session', false)) {
            const clientSession = new ClientSession()
            clientSession.fill({
                date_in: request.input('date_in'),
                amount: client.has_valid_membership ? 150 : 200,
                attendance_id: attendance.id,
                client_id: client.id
            })

            await clientSession.save()
        }

        // Process Product Refreshments ...
        const refreshmentIds = request.input('refreshment_ids', [])
        if (refreshmentIds.length > 0) {
            await attendance.purchases().attach(refreshmentIds)
        }

        return { attendance }
    }   

}

module.exports = AttendanceController

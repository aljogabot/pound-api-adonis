'use strict'

const Client = use('App/Models/Client')
const Attendance = use('App/Models/Attendance')
const ClientSession = use('App/Models/ClientSession')

const ClientAlreadyHasAttendanceTodayException = use('App/Exceptions/ClientAlreadyHasAttendanceTodayException')
const ClientHasNoSubscriptionOrExpiredException = use('App/Exceptions/ClientHasNoSubscriptionOrExpiredException')
const CannotSaveClientAttendanceException = use('App/Exceptions/CannotSaveClientAttendanceException')
const DeleteResourceNotAllowedException = use('App/Exceptions/DeleteResourceNotAllowedException')
const DeleteResourceFailException = use('App/Exceptions/DeleteResourceFailException')

class AttendanceController {

    async clientCreate ({ request }) {
        const client = await Client.findOrFail(request.input('client_id'))

        if (await Attendance.query().existsOnThisDate(client.id, request.input('date_in')).first()) {
            throw new ClientAlreadyHasAttendanceTodayException()
        }

        if (! client.has_valid_subscription && ! request.input('is_session', false)) {
            return await client.currentClientSubscription().fetch()
            // throw new ClientHasNoSubscriptionOrExpiredException()
        }

        const attendance = new Attendance()
        attendance.fill(request.except(['is_session', 'client', 'refreshment_ids']))
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

    async clientUpdate ({ request, params }) {
        const attendance = await Attendance.findOrFail(params.id)

        const paid = request.input('paid', false)

        const client = await Client.find(attendance.client_id)

        if (! client.has_valid_subscription && ! request.input('is_session', false)) {
            throw new ClientHasNoSubscriptionOrExpiredException()
        }

        if (attendance.paid != paid) {
            attendance.paid = paid
            if (! await attendance.save()) {
                throw new CannotSaveClientAttendanceException()
            }
        }

        await attendance.purchases().detach()
        await attendance.purchases().attach(request.input('refreshment_ids', []))

        return {
            message: 'Attendance updated successfully!!!',
            attendance
        }
    }

    async getByDate ({ request, params }) {
        const dateInURL = params.date

        const attendanceQuery = Attendance.query()
            .with('client')
            .with('purchases')
            .getByDate(dateInURL)
            .withCount('purchases')
            .with('client_session')

        const searchText = request.input('search', false)

        if (searchText) {
            attendanceQuery.whereHas('client', (query) => {
                return query.where((query) => {
                    query.where('first_name', 'like', `%${searchText}%`)
                        .orWhere('last_name', 'like', `%${searchText}%`)
                })
            })
        }

        const attendances = await attendanceQuery.orderBy('created_at').fetch()
        
        return { attendances }
    }

    async clientView ({ params }) {
        const attendance = await Attendance.query()
            .with('client')
            .with('purchases')
            .with('client_session')
            .where('id', params.id)
            .first()

        const purchases = attendance.getRelated('purchases')
        const clientSession = attendance.getRelated('client_session')

        let totalAmount = 0
        purchases.rows.forEach(product => totalAmount += parseFloat(product.amount))

        if (attendance.is_session) {
            totalAmount += parseFloat(clientSession.amount)
        }

        attendance.total_purchases = totalAmount.toFixed(2)

        return attendance
    }

    async clientDestroy ({ request, params }) {
        if (request.input('passcode') != 'b0gart') {
            throw new DeleteResourceNotAllowedException()
        }

        const attendance = await Attendance.findOrFail(params.id)

        if (! await attendance.delete()) {
            throw new DeleteResourceFailException()
        }

        return { attendance }
    }

    async makeClientPaid ({ request, params }) {
        const attendance = await Attendance.findOrFail(params.id)

        attendance.paid = true
        if (! await attendance.save()) {
            throw new CannotSaveClientAttendanceException()
        }

        return {
            success: true,
            attendance
        }
    }

}

module.exports = AttendanceController

'use strict'

const AttendanceHook = exports = module.exports = {}

AttendanceHook.attachRelatedModelsOnFetch = async (attendances) => {
    await Promise.all(attendances.map(attendance => {
        const purchases = attendance.getRelated('purchases')
        const clientSession = attendance.getRelated('client_session')

        let totalAmount = 0
        purchases.rows.forEach(product => totalAmount += parseFloat(product.amount))
        
        if (attendance.is_session) {
            totalAmount += parseFloat(clientSession.amount)
        }
        
        attendance.total_purchases = totalAmount.toFixed(2)
    }))
}
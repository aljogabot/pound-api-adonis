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











// 'use strict'

// const ClientHook = exports = module.exports = {}

// ClientHook.attachRelatedModelsOnFind = async (client) => {
//     const currentSubscription = await client.currentClientSubscription().fetch()
//     client.has_valid_subscription = currentSubscription ? currentSubscription.toJSON().active : false

//     const currentMembership = await client.currentClientMembership().fetch()
//     client.has_valid_membership = currentMembership ? currentMembership.toJSON().active : false
// }

// ClientHook.attachCurrentClientSubscriptionOnClients = async (clients) => {
//     await Promise.all(clients.map(ClientHook.attachRelatedModelsOnFind))
// }
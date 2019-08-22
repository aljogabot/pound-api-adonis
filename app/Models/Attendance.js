'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Attendance extends Model {

    client () {
        return this.belongsTo('App/Models/Client')
    }

    static scopeGetClientSessionsByDate (query, date) {
        return query.whereRaw(`DATE(date_in) = '${date}'`)
            .where('is_session', true)
    }

    static scopeExistsOnThisDate (query, clientId, dateIn) {
        return query.where('client_id', clientId)
            .where('date_in', dateIn)
    }

    purchases () {
        return this.belongsToMany('App/Models/Product')
            .pivotTable('attendance_product')
            .withTimestamps()
    }
}

module.exports = Attendance

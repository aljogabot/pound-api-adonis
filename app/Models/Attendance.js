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

}

module.exports = Attendance

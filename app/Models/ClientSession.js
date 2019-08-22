'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ClientSession extends Model {

    client () {
        return this.belongsTo('App/Model/Client')
    }

    attendance () {
        return this.belongsTo('App/Model/Attendance')
    }

    static scopeGetByDate(query, date) {
        return query.whereRaw(`DATE(date_in) = '${date}'`)
    }

}

module.exports = ClientSession

'use strict'

const moment = require('moment')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Attendance extends Model {

    static boot() {
        super.boot()
        this.addHook('afterFetch', 'AttendanceHook.attachRelatedModelsOnFetch')
    }

    static get dates() {
        return super.dates.concat(['date_in'])
    }

    static castDates(field, value) {
        if (field == 'date_in') {
            return value.format('YYYY-MM-DD')
        }

        return super.formatDates(field, value)
    }

    static get computed() {
        return ['time_in_carbon']
    }

    getTimeInCarbon ({ created_at }) {
        return moment(created_at).format('h:mm A')
    }

    client () {
        return this.belongsTo('App/Models/Client')
    }

    static scopeGetByDate (query, date) {
        return query.whereRaw(`DATE(date_in) = '${date}'`)
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
            .pivotTable('attendance_products')
            .withTimestamps()
    }

    client_session () {
        return this.hasOne('App/Models/ClientSession')
    }
}

module.exports = Attendance

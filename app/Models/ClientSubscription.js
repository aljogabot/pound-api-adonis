'use strict'

const moment = require('moment')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ClientSubscription extends Model {

    static get dates() {
        return super.dates.concat(['valid_from', 'valid_until'])
    }

    static castDates(field, value) {
        // if (field == 'valid_until' || field == 'valid_from' || field == 'created_at') {
        //     return value.format('MMM d, Y')
        // }

        return super.formatDates(field, value)
    }

    client () {
        return this.belongsTo('App/Models/Client')
    }

    static get computed() {
        return ['active', 'active_until']
    }

    getActiveUntil({ valid_until }) {
        return moment(valid_until).format('MMM d, Y')
    }

    getActive({ valid_until }) {
        return moment(valid_until) > moment()
    }

    subscription () {
        return this.belongsTo('App/Models/Subscription')
    }

    payment () {
        return this.belongsTo('App/Models/Payment')
    }

    client () {
        return this.belongsTo('App/Models/Client')
    }

    client_membership () {
        return this.belongsTo('App/Models/ClientMembership')
    }

}

module.exports = ClientSubscription
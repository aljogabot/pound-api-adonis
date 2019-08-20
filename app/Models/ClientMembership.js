'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

const moment = require('moment')

class ClientMembership extends Model {

    static get dates () {
        return super.dates.concat(['valid_from', 'valid_until'])
    }

    static castDates(field, value) {
        if (field == 'valid_until' || field == 'valid_from') {
            return value.format('MMM d, Y')
        }

        return super.formatDates(field, value)
    }

    static get computed() {
        return ['is_valid', 'active']
    }

    getIsValid ({ valid_until }) {
        return valid_until.isAfter(moment())
    }

    getActive ({ valid_until }) {
        return valid_until.isAfter(moment())
    }

    client () {
        return this.belongsTo('App/Models/Client')
    }

    membership () {
        return this.belongsTo('App/Models/Membership')        
    }

    payment () {
        return this.belongsTo('App/Models/Payment')
    }
}

module.exports = ClientMembership

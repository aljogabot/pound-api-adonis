'use strict'

const moment = require('moment')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ClientSubscription extends Model {

    static get dates() {
        return super.dates.concat(['valid_from', 'valid_until'])
    }

    client () {
        return this.belongsTo('App/Models/Client')
    }

    static get computed() {
        return ['active']
    }

    getActive({ valid_until }) {
        return moment(valid_until) > moment()
    }

}

module.exports = ClientSubscription
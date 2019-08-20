'use strict'

const moment = require('moment')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ClientSubscription extends Model {

    client () {
        return this.belongsTo('App/Models/Client')
    }

    static get computed() {
        return ['active']
    }

    getActive({ valid_until }) {
        return valid_until > moment()
    }

}

module.exports = ClientSubscription
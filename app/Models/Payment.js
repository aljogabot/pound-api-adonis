'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Payment extends Model {

    client () {
        return this.belongsTo('App/Models/Client')
    }

    subscription () {
       return this.hasOne('App/Models/Subscription') 
    }

    membership () {
        return this.hasOne('App/Models/ClientMembership')
    }
}

module.exports = Payment
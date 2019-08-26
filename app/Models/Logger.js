'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Logger extends Model {

    static get table() {
        return 'logs'
    }

    user () {
        return this.belongsTo('App/Models/User')
    }

}

module.exports = Logger

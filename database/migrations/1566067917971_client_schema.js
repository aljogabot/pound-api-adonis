'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClientSchema extends Schema {
    up() {
        // this.create('clients', (table) => {
        //     table.increments()
        //     table.timestamps()
        // })
    }

    down() {
        // this.drop('clients')
    }
}

module.exports = ClientSchema

'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClientsSchema extends Schema {
    up() {
        this.create('clients', (table) => {
            table.increments()

            table.string('first_name', 254)
            table.string('last_name', 254)

            table.timestamps()
        })
    }

    down() {
        this.drop('clients')
    }
}

module.exports = ClientsSchema

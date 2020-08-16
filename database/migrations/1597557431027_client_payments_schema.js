'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClientPaymentsSchema extends Schema {
    up() {
        this.create('payments', (table) => {
            table.increments()

            table.bigInteger('client_id')
            table.decimal('amount', 10, 2)
            table.text('remarks')
            
            table.timestamps()
        })
    }

    down() {
        this.drop('payments')
    }
}

module.exports = ClientPaymentsSchema

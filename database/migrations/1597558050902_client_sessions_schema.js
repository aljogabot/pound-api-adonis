'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClientSessionsSchema extends Schema {
    up() {
        this.create('client_sessions', (table) => {
            table.increments()

            table.bigInteger('client_id')
            table.bigInteger('attendance_id')
            table.date('date_in')
            table.decimal('amount', 10, 2)

            table.timestamps()
        })
    }

    down() {
        this.drop('client_sessions')
    }
}

module.exports = ClientSessionsSchema

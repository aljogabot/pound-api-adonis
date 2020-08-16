'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClientMembershipsSchema extends Schema {
    up() {
        this.create('client_memberships', (table) => {
            table.increments()

            table.bigInteger('client_id')
            table.bigInteger('membership_id')
            table.bigInteger('payment_id')
            table.string('description')
            table.text('remarks').nullable()
            table.date('valid_from')
            table.date('valid_until')

            table.timestamps()
        })
    }

    down() {
        this.drop('client_memberships')
    }
}

module.exports = ClientMembershipsSchema

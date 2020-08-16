'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClientSubscriptionsSchema extends Schema {
    up() {
        this.create('client_subscriptions', (table) => {
            table.increments()

            table.bigInteger('client_id')
            table.bigInteger('client_membership_id')
            table.bigInteger('subscription_id')
            table.bigInteger('payment_id')
            table.string('description').nullable()
            table.text('remarks').nullable()
            table.date('client_started')
            table.date('valid_from')
            table.date('valid_until')

            table.timestamps()
        })
    }

    down() {
        this.drop('client_subscriptions')
    }
}

module.exports = ClientSubscriptionsSchema

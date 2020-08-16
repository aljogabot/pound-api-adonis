'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SubscriptionsSchema extends Schema {
    up() {
        this.create('subscriptions', (table) => {
            table.increments()

            table.integer('duration')
            table.string('type')
            table.text('description')
            table.string('amount')
            table.boolean('is_promo').default(false)

            table.timestamps()
        })
    }

    down() {
        this.drop('subscriptions')
    }
}

module.exports = SubscriptionsSchema

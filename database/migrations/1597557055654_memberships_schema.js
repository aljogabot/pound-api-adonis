'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MembershipsSchema extends Schema {
    up() {
        this.create('memberships', (table) => {
            table.increments()

            table.integer('duration')
            table.string('type')
            table.text('description')
            table.string('amount')
            table.boolean('is_promo')

            table.timestamps()
        })
    }

    down() {
        this.drop('memberships')
    }
}

module.exports = MembershipsSchema

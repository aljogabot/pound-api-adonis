'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AttendancesSchema extends Schema {
    up() {
        this.create('attendances', (table) => {
            table.increments()

            table.bigInteger('client_id')
            table.date('date_in')
            table.time('time_in').nullable()
            table.time('time_out').nullable()
            table.boolean('paid').default(false)

            table.boolean('is_session').default(false)

            table.timestamps()
        })
    }

    down() {
        this.drop('attendances')
    }
}

module.exports = AttendancesSchema

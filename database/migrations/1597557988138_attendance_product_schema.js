'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AttendanceProductSchema extends Schema {
    up() {
        this.create('attendance_products', (table) => {
            table.increments()

            table.bigInteger('attendance_id')
            table.bigInteger('product_id')

            table.timestamps()
        })
    }

    down() {
        this.drop('attendance_products')
    }
}

module.exports = AttendanceProductSchema

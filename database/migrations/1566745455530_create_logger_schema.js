'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateLoggerSchema extends Schema {
    up () {
        this.create('logs', (table) => {
            table.increments()
            table.bigInteger('user_id').unsigned().references('id').inTable('users')
            table.string('action')
            table.string('table')
            table.string('model')
            table.text('description').nullable()
            table.timestamps()
        })
    }

    down () {
        this.drop('logs')
    }
}

module.exports = CreateLoggerSchema

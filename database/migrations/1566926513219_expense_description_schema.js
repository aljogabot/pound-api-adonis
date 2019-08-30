'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ExpenseDescriptionSchema extends Schema {
    up () {
        this.create('expense_descriptions', (table) => {
            table.increments()
            table.string('description')
            table.timestamps()
        })
    }

    down () {
        this.drop('expense_descriptions')
    }
}

module.exports = ExpenseDescriptionSchema

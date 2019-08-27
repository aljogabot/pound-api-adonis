'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ExpensesSchema extends Schema {
    up () {
        this.create('expenses', (table) => {
            table.increments()
            table.date('date_in')
            table.float('amount')
            table.integer('expense_description_id').unsigned().references('id').inTable('expense_descriptions')
            table.text('description')
            table.timestamps()
        })
    }

    down () {
        this.drop('expenses')
    }
}

module.exports = ExpensesSchema

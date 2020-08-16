'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductsSchema extends Schema {
    up() {
        this.create('products', (table) => {
            table.increments()

            table.string('name')
            table.text('description').nullable()
            table.decimal('amount', 10, 2)

            table.timestamps()
        })
    }

    down() {
        this.drop('products')
    }
}

module.exports = ProductsSchema

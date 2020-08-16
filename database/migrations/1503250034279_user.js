'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
    up () {
        this.create('users', (table) => {
            table.bigIncrements()
            
            table.string('name', 191).notNullable().unique()
            table.string('email', 191).notNullable().unique()
            table.string('password', 191).notNullable()

            table.timestamps()
        })
    }

    down () {
      this.drop('users')
    }
}

module.exports = UserSchema

'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClientsSchema extends Schema {
    up() {
        this.create('clients', (table) => {
            table.increments()

            table.string('first_name', 254)
            table.string('last_name', 254)

            table.string('email').nullable()
            table.string('facebook').nullable()
            table.date('birthday').nullable()
            table.text('address').nullable()
            table.string('mobile_number').nullable()
            table.decimal('starting_weight').nullable()
            table.string('height').nullable()
            table.string('goal').nullable()
            table.string('profile_picture').nullable()

            table.boolean('has_medical_condition').default(false)
            table.text('medical_condition_description').nullable()

            table.string('emergency_contact_person').nullable()
            table.string('emergency_contact_number').nullable()
            table.string('emergency_contact_relationship').nullable()

            table.timestamps()
        })
    }

    down() {
        this.drop('clients')
    }
}

module.exports = ClientsSchema

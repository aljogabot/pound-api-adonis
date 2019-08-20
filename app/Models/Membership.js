'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Membership extends Model {

    static get computed() {
        return ['duration_type', 'full_description']
    }

    getDurationType({duration, type}) {
        return `${duration} ${type}`
    }

    getFullDescription({description, amount}) {
        return `${description} P${amount}`
    }

    client_memberships() {
        return this.hasMany('App/Models/ClientMembership')
    }

}

module.exports = Membership
'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Client extends Model {

    static castDates(field, value) {
        if (field == 'created_at') {
            return value.format('MMM d, Y')
        }
    }

    static get computed() {
        return ['name']
    }

    static boot () {
        super.boot()
        this.addHook('afterFind', 'ClientHook.attachCurrentClientSubscription')
        this.addHook('afterPaginate', 'ClientHook.attachCurrentClientSubscriptionOnClients')
    }

    getName({ first_name, last_name }) {
        return `${first_name} ${last_name}`
    }

    attendances() {
        return this.hasMany('App/Models/Attendance')
    }

    payments() {
        return this.hasMany('App/Models/Payment')
    }

    memberships() {
        return this.hasMany('App/Models/ClientMembership')
    }

    subscriptions() {
        return this.hasMany('App/Models/ClientSubscription')
    }

    currentClientSubscription() {
        return this.hasOne('App/Models/ClientSubscription').orderBy('created_at')
    }

    currentClientMembership() {
        return this.hasOne('App/Models/ClientMembership').orderBy('created_at')
    }
}

module.exports = Client

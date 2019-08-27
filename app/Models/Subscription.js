'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Subscription extends Model {
    static castDates(field, value) {
        if (field == 'created_at') {
            return value.format('MMM DD, Y')
        }
        
        return super.formatDates(field, value)
    }

    static get computed() {
        return ['duration_type', 'full_description']
    }

    getDurationType({ duration, type }) {
        return `${duration} ${type}`
    }

    getFullDescription({ description, amount }) {
        return `${description} P${amount}`
    }

    clientSubscriptions () {
        return this.hasMany('App/Models/ClientSubscription')
    }
}

module.exports = Subscription

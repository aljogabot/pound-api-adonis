'use strict'

const Logger = use('App/Models/Logger')

class LoggerService {

    static push (data) {
        const { action, table, model, description, user_id } = data
        Logger.fill(data)
    }

}

module.exports = LoggerService
'use strict'

const Logger = use('App/Models/Logger')

class LoggerService {

    static push (data, auth) {
        const { action, table, model, description } = data
        const loggerDataObject = new Logger
        loggerDataObject.merge(data)

        loggerDataObject.user_id = user.id

        loggerDataObject.save()
    }

}

module.exports = LoggerService
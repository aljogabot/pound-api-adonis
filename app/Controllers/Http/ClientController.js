'use strict'

const Client = use('App/Models/Client')

class ClientController {

    async listAll () {
        return {clients: await Client.all()}
    }

}

module.exports = ClientController

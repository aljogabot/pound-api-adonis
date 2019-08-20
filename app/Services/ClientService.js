'use strict'

const Client = use('App/Models/Client')
const ClientAlreadyExistException = use('App/Exceptions/ClientAlreadyExistException')

class ClientService {

    async checkIfExists (clientData) {

        const ifClientExisted = await Client.query().checkIfExists(clientData).first()    
        
        if (ifClientExisted) {
            throw new ClientAlreadyExistException()
        }

        
    }

}

module.exports = new ClientService()
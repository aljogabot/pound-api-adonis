'use strict'

const Membership = use('App/Models/Membership')

class MembershipController {

    async listAll() {
        return await Membership.all()
    }

}

module.exports = MembershipController

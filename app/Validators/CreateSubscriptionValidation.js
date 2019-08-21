'use strict'

class CreateSubscriptionValidation {
    get rules () {
        return {
            duration: 'required',
            type: 'required',
            description: 'required',
            amount: 'required|number',
            is_promo: 'required|number'
        }
    }

    get data () {
        const requestBody = this.ctx.request.all()
        requestBody.amount = parseInt(requestBody.amount).toFixed(2)
        return requestBody
    }
}

module.exports = CreateSubscriptionValidation

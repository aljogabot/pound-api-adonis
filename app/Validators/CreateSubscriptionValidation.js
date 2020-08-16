'use strict'

class CreateSubscriptionValidation {
    get rules () {
        return {
            duration: 'required',
            type: 'required',
            description: 'required',
            amount: 'required|number',
            is_promo: 'required|boolean'
        }
    }

    get data () {
        const requestBody = this.ctx.request.all()
        requestBody.amount = parseInt(requestBody.amount).toFixed(2)
        requestBody.is_promo = requestBody.is_promo ? true : false
        return requestBody
    }
}

module.exports = CreateSubscriptionValidation

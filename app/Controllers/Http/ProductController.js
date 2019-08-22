'use strict'

const Product = use('App/Models/Product')

class ProductController {

    async list() {
        return {
            data: await Product.all()
        }
    }

}

module.exports = ProductController

'use strict'

/*
|--------------------------------------------------------------------------
| DatabaseSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory       = use('Factory')
const User          = use('App/Models/User')
const Membership    = use('App/Models/Membership')

class DatabaseSeeder {
    async run () {
        const user = new User()
        user.merge({
            name: 'Aljo Victor Gabot',
            email: 'bogart@gmail.com',
            password: 'password'
        })
        await user.save()


        const fiveYearMembership = new Membership()
        fiveYearMembership.merge({
            duration: 5,
            type: 'years',
            description: '5 Year Free Membership',
            is_promo: true,
            amount: 0.00
        })

        await fiveYearMembership.save()

        // const user = new User()
        // user.merge({
        //     name: 'Aljo Victor Gabot',
        //     email: 'aljo.gabot@gmail.com',
        //     password: '0n3m0r3ch@nc3'
        // })

        // await user.save()

        // const beth = new User()
        // beth.merge({
        //     name: 'Maribeth Gabot',
        //     email: 'beth.gabot@gmail.com',
        //     password: '0n3m0r3ch@nc3'
        // })

        // await beth.save()

        // const ephraim = new User()
        // ephraim.merge({
        //     name: 'Ephraim Latagan',
        //     email: 'ephraim.latagan@pound-southwoods.com',
        //     password: 'password'
        // })

        // await ephraim.save()

        // const jeff = new User()
        // jeff.merge({
        //     name: 'Jeff Verceles',
        //     email: 'jeff.verceles@pound-southwoods.com',
        //     password: 'password'
        // })

        // await jeff.save()
    }
}

module.exports = DatabaseSeeder

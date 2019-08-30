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
const Factory = use('Factory')

const User = use('App/Models/User')

class DatabaseSeeder {
    async run () {
        const user = await User.query().where('email', 'bogart@bogart.com').first()

        user.merge({password: 'password'})
        await user.save()

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

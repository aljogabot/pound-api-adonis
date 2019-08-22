'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

const routes = [
    'api/auth',
    'api/clients',
    'api/subscriptions',
    'api/expires',
    'api/memberships',
    'api/client-memberships',
    'api/client-subscriptions',
    'api/earnings',
    'api/products',
    'api/attendances'
]

routes.forEach(route => require(`../routes/${route}`))
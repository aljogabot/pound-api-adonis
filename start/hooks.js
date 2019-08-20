const { hooks } = require('@adonisjs/ignitor')

hooks.after.providersBooted(() => {
    use('App/Services/CustomValidation')
})
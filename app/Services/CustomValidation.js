const Validator = use('Validator')
const Database = use('Database')

const existsFn = async (data, field, message, args, get) => {
    const value = get(data, field)
    if (!value) {
        /**
         * skip validation if value is not defined. `required` rule
         * should take care of it.
        */
        return
    }

    const [table, column] = args
    const row = await Database.table(table).where(column, value).first()

    if (!row) {
        throw message
    }
}

Validator.extend('exists', existsFn)

const doubleFn = async (data, field, message, args, get) => {
    const value = get(data, field)

    if (!value) {
        return
    }

    let double = value.match(/^\d+\.\d{0,2}$/g)

    if (!double) {
        throw message
    }
}

Validator.extend('float', doubleFn)
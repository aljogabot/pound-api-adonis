'use strict'

const Expense = use('App/Models/Expense')
const ExpenseDescription = use('App/Models/ExpenseDescription')

const ExpenseDescriptionRequiredException = use('App/Exceptions/ExpenseDescriptionRequiredException')

class ExpenseController {

    async getByDate ({ request, params }) {
        const dateIn = params.date

        const expenses = await Expense.query()
            .with('expense_description')
            .getByDate(dateIn)
            .fetch()

        return expenses
    }

    async addExpense ({ request }) {
        const expense = new Expense()

        if (! request.input('expense_description_id', false) && request.input('description', '').length == 0) {
            throw new ExpenseDescriptionRequiredException();
        }

        expense.merge(request.all())
        await expense.save()
        
        return expense
    }

    async addExpenseDescription ({ request }) {
        const expenseDescription = new ExpenseDescription()

        expenseDescription.merge(request.all())

        expenseDescription.save()

        return expenseDescription
    }

    async deleteExpenseDescription ({ request, params }) {
        const expenseDescription = await ExpenseDescription.findOrFail(params.id)

        expenseDescription.delete()

        return expenseDescription
    }
}

module.exports = ExpenseController

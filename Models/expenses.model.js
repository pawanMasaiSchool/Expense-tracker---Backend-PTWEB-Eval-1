
const mongoose = require('mongoose');


const expensesSchema = new mongoose.Schema({
    type: {type:String, required: true},
    date_of_expense: {type:String, required: true},
    employee_id: {type:Number, required: true},
    reimbursed: {type:Boolean, required: true},
    reimbursed_date: {type:String, required: true},
    timestamps: {type:String, required: true}
});

//models for Expenses schema
const expenses = mongoose.model("Expenses",expensesSchema,"expenses");


module.exports = expenses;

const mongoose = require('mongoose');


const employeeSchema = new mongoose.Schema({
    name: {type: String,required: true},
    employee_id: {type: Number,required: true},
    gender: {type: String,required: true}
});

//models for Employees schema
const employees = mongoose.model("Employees",employeeSchema,"employees");


module.exports = employees;
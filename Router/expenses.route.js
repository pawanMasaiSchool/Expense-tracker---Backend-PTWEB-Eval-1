const express = require('express');
const expenses = require('../Models/expenses.model');
const expensesRouter = express.Router();
const { body, validationResult } = require('express-validator');

// getting all the expenses
expensesRouter.get("/", async(req,res)=>{
    try{
        const allExpenses = await expenses.find()
        res.status(200).json(allExpenses);
    }
    catch(err){
        return res.status(400).json({msg:"Something is NOT Good, because backend is facing error"})
    }
});


//getting the particular expense by employee id
expensesRouter.get("/:empId", async(req,res)=>{
    try{
        const currentexpense = await expenses.findOne({employee_id: req.params.empId});
        if(!currentexpense) return res.status(404).json("expense is not there")
        res.status(200).json(currentexpense);
    }
    catch(err){
        return res.status(400).json({msg:"Something is NOT Good, because backend is facing error"})
    }
});


//creating a new expense
expensesRouter.post("/",
    body("type").not().isEmpty(),
    body("date_of_expense").not().isEmpty(),
    body("employee_id").not().isEmpty(),
    body("reimbursed").not().isEmpty(),
    body("reimbursed_date").not().isEmpty(),
    body("timestamps").not().isEmpty()
,async (req,res)=>{
    try{
        // Doing validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }

        const newExpense = await expenses.create({
            type: req.body.type,
            date_of_expense: req.body.date_of_expense,
            employee_id: req.body.employee_id,
            reimbursed: req.body.reimbursed,
            reimbursed_date: req.body.reimbursed_date,
            timestamps: req.body.timestamps
        })
        if(!newExpense) return res.status(403).json({alert: "Expense was not created due to some error"})
        return res.status(200).json(newExpense);
    }
    catch(err){
        console.log(err);
        return res.status(400).json({msg:"Something is NOT Good, because backend is facing error"})
    }
})


// updating the reimbursment status
expensesRouter.post("/:empId",
    body("reimbursed").not().isEmpty()
,async (req,res)=>{
    try{

        // Doing validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }

        const updatedExpense = await expenses.findOneAndUpdate({
            employee_id: req.params.empId,
        },{
            $set:{
                reimbursed: req.body.reimbursed
            }
        },{
            returnOriginal: false
        })
        console.log(updatedExpense);
        if(!updatedExpense) return res.status(403).json({alert: "Reimbusrment was not updated due to some error"})
        return res.status(200).json(updatedExpense);
    }
    catch(err){
        console.log(err);
        return res.status(400).json({msg:"Something is NOT Good, because backend is facing error"})
    }
})


module.exports = expensesRouter
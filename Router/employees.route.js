const express = require('express');
const { body, validationResult } = require('express-validator');
const employees = require('../Models/employee.model');
const employeesRouter = express.Router();

// getting the homepage(normal request and response)
employeesRouter.get("/", async(req,res)=>{
    try{
        const allEmployees = await employees.find()
        res.status(200).json(allEmployees);
    }
    catch(err){
        return res.status(400).json({msg:"Something is NOT Good, because backend is facing error"})
    }
});

//getting the particular employee by his/her id
employeesRouter.get("/:empId", async(req,res)=>{
    try{
        const currentEmployee = await employees.findOne({employee_id: req.params.empId});
        if(!currentEmployee) return res.status(404).json("Employee is not there")
        res.status(200).json(currentEmployee);
    }
    catch(err){
        return res.status(400).json({msg:"Something is NOT Good, because backend is facing error"})
    }
});

//creating a new employee by a post request
employeesRouter.post("/",
    body("name").not().isEmpty().isLength({min:5}),
    body("gender").not().isEmpty().isLength({min:4})
,async (req,res)=>{
    try{
        // Doing validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }

        const newEmployee = await employees.create({
            name: req.body.name,
            employee_id: req.body.employee_id,
            gender: req.body.gender
        })
        if(!newEmployee) return res.status(403).json({alert: "Employee was not created due to some error"})
        return res.status(200).json(newEmployee);
    }
    catch(err){
        return res.status(400).json({msg:"Something is NOT Good, because backend is facing error"})
    }
})

module.exports = employeesRouter
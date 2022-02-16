const express = require('express');
const app = express();
var cors = require('cors');
const conncetingToDb = require('./configFiles/database');
const employeesRouter = require('./Router/employees.route');
const expensesRouter = require('./Router/expenses.route');

const PORT = 9000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use("/employees",employeesRouter);
app.use("/expenses",expensesRouter);

const initializingApp = async () => {
    await conncetingToDb();
    console.log(`connection established`);

    app.listen( PORT, ()=> {
        console.log(`listening to the port ${PORT}`);
    })
}

module.exports = initializingApp;
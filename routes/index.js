const express = require('express');
const departmentsRouter = require('./departments');
const employeeRouter = require('./employee');
const rolesRouter = require('./roles');
const app = express();

app.use('/departments', departmentsRouter);
app.use('/employee', employeeRouter);
app.use('/roles', rolesRouter);

module.exports = app;
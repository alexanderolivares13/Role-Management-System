const employee = require('express').Router();
const {connection} = require('../config/connect')

employee.get('/', (req, res) => {
    const sqlQuery = `SELECT * FROM ?`

    connection.execute(sqlQuery,[`employee`], (error, rows) => {
        if (error) {
            res.status(500).json(error);
            return;
        }
        res.json({
            message: 'success',
            data: rows
        })
    })
});

module.exports = employee
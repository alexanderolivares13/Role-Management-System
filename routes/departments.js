const departments = require('express').Router();
const {connection} = require('../config/connect')

departments.get('/', (req, res) => {
    const sqlQuery = `SELECT * FROM department`

    connection.query(sqlQuery, (error, rows) => {
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

module.exports = departments;
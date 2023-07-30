const roles = require('express').Router();
const {connection} = require('../config/connect')

roles.get('/', (req, res) => {
    const sqlQuery = `SELECT * FROM roles`

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

module.exports = roles;
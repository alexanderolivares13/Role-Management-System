const express = require('express');
const mysql = require('mysql2');
const PORT = process.env.PORT || 3001;
require('dotenv').config();

const app = express();
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
    console.log('Connected to database? SUCCESS')
)

app.use(express.json());

app.listen(PORT, () =>
    console.info(`Server listening on PORT ${PORT}`)
);
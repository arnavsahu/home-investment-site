// require('dotenv').config();
// const Pool = require("pg").Pool;

// const pool = new Pool({
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     database: process.env.DB_DATABASE,
//     password: process.env.DB_PASSWORD,
//     port: process.env.DB_PORT,
// });

// module.exports = pool; 

const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database('./real_estate_rentals.db', (err) => {
    if (err) {
        console.error('Error connecting to SQLite database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

module.exports = db;

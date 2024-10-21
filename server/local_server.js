const express = require("express");
const app = express();
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();  // Import sqlite3 and enable verbose mode

const PORT = 3001;

// Connect to the SQLite database
const db = new sqlite3.Database('./real_estate_rentals.db', (err) => {
    if (err) {
        console.error('Error connecting to SQLite database:', err.message);
    } else {
           console.log('Connected to the SQLite database.');
    }
});

// Middleware
app.use(cors());
app.use(express.json());

// ROUTES //

// Get homes based on some queries
app.get('/homes', (req, res) => {
    try {
        const queryParams = [];
        const conditions = [];

        const stringColumns = ['id', 'address', 'city', 'state', 'zip_code'];
        const numericalColumns = ['house_value', 'estimated_rent', 'bedrooms', 'bathrooms', 'square_feet'];

        let query = 'SELECT * FROM rentals';

        // Handle string columns
        stringColumns.forEach((column) => {
            if (req.query[column]) {
                queryParams.push(req.query[column]);
                conditions.push(`${column} = ?`);
            }
        });

        // Handle numerical columns with min, max, and exact match
        numericalColumns.forEach((column) => {
            if (req.query[`min_${column}`]) {
                queryParams.push(req.query[`min_${column}`]);
                conditions.push(`${column} >= ?`);
            }
            if (req.query[`max_${column}`]) {
                queryParams.push(req.query[`max_${column}`]);
                conditions.push(`${column} <= ?`);
            }
            if (req.query[column]) {
                queryParams.push(req.query[column]);
                conditions.push(`${column} = ?`);
            }
        });

        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        // Execute the query
        db.all(query, queryParams, (err, rows) => {
            if (err) {
                console.error('Error retrieving homes:', err.message);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                res.json(rows);
            }
        });
    } catch (err) {
        console.error('Error retrieving homes:', err.stack);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});

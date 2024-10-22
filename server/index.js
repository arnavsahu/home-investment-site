const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

const PORT = 3001;

//middleware
app.use(cors());
app.use(express.json());

//ROUTES//

// Get homes based on some queries
app.get('/homes', async (req, res) => {
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
                conditions.push(`${column} = $${queryParams.length}`);
            }
        });

        // Handle numerical columns with min, max, and exact match
        numericalColumns.forEach((column) => {
            if (req.query[`min_${column}`]) {
                queryParams.push(req.query[`min_${column}`]);
                conditions.push(`${column} >= $${queryParams.length}`);
            }
            if (req.query[`max_${column}`]) {
                queryParams.push(req.query[`max_${column}`]);
                conditions.push(`${column} <= $${queryParams.length}`);
            }
            if (req.query[column]) {
                queryParams.push(req.query[column]);
                conditions.push(`${column} = $${queryParams.length}`);
            }
        });

        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        const result = await pool.query(query, queryParams);
        res.json(result.rows);
    } catch (err) {
        console.error('Error retrieving homes:', err.stack);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




app.listen(PORT, () => {
    console.log(`server has started on port ${PORT}`)
});
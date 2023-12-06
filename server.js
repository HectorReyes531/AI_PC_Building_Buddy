const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// // Replace these values with your AWS RDS connection details
// const pool = new Pool({
//   user: 'pc_buddy_db',
//   host: 'rds-postgresql-pc-buddy.cujll5znkdsk.us-east-1.rds.amazonaws.com',
//   database: 'postgres',
//   password: 'love-Su52',
//   port: 5432,
// });

// Replace these values with your PostgreSQL connection details
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'lovesu52',
    port: 5432,
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (e.g., your HTML, CSS)
app.use(express.static('public'));

app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
  
    const client = await pool.connect();
  
    try {
      // Hash the password using a secure method (e.g., bcrypt)
      // For simplicity, we'll skip password hashing in this example
  
      await client.query('BEGIN');
  
      const result = await client.query(
        'INSERT INTO "PC_Buddy"."users" (username, password, email) VALUES ($1, $2, $3)',
        [username, password, email]
      );
  
      await client.query('COMMIT');
  
      console.log('User registered successfully:', result.rows[0]);
      res.status(200).json({ success: true, message: 'User registered successfully' });
    } catch (error) {
      await client.query('ROLLBACK');
  
      console.error('Error registering user:', error.message);
      res.status(500).json({ success: false, message: 'Internal server error' });
    } finally {
      client.release();
    }
  });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

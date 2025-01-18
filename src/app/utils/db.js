
import { Pool } from 'pg';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Create a connection pool
export const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});
console.log(pool);
// Test the connection
pool.connect()
    .then(() => console.log('Connected to PostgreSQL database'))
    .catch((err) => console.error('Database connection error:', err));

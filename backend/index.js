
const app = require('./src/app');
const { pool } = require('./src/utils/db');
const cors = require('cors');

const PORT = process.env.PORT || 5000;
app.use(cors()); // Enable all CORS requests by default

(async () => {
    try {
        await pool.query('SELECT NOW()');
        console.log('Database connected successfully.');

        app.listen(PORT, () => {
            console.log(`Backend is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Database connection failed:', error.message);
        process.exit(1);
    }
})();

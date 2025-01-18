const { pool } = require('../utils/db');

module.exports = async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()'); // Query the current timestamp
        res.status(200).json({ success: true, timestamp: result.rows[0].now });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

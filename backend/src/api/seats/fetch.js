const { pool } = require('../../utils/db');

module.exports = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM seats ORDER BY seat_number');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

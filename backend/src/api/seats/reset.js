const { pool } = require('../../utils/db');

module.exports = async (req, res) => {
    try {
        await pool.query('UPDATE seats SET is_reserved = FALSE');
        res.status(200).json({ message: 'All bookings have been reset.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

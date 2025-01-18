const { pool } = require('../../utils/db');

module.exports = async (req, res) => {
    try {
        const { seatCount } = req.body;

        if (seatCount < 1 || seatCount > 7) {
            return res.status(400).json({ error: 'You can book between 1 and 7 seats.' });
        }

        const result = await pool.query('SELECT * FROM seats WHERE is_reserved = FALSE ORDER BY seat_number');
        const availableSeats = result.rows;

        if (availableSeats.length < seatCount) {
            return res.status(400).json({ error: 'Not enough seats available.' });
        }

        let allocatedSeats = [];
        const rowWiseSeats = {};

        for (const seat of availableSeats) {
            const row = Math.ceil(seat.seat_number / 7);
            if (!rowWiseSeats[row]) rowWiseSeats[row] = [];
            rowWiseSeats[row].push(seat);
        }

        for (const row in rowWiseSeats) {
            if (rowWiseSeats[row].length >= seatCount) {
                allocatedSeats = rowWiseSeats[row].slice(0, seatCount);
                break;
            }
        }

        if (allocatedSeats.length === 0) {
            allocatedSeats = availableSeats.slice(0, seatCount);
        }

        const seatIds = allocatedSeats.map((seat) => seat.seat_id);
        await pool.query('UPDATE seats SET is_reserved = TRUE WHERE seat_id = ANY($1::int[])', [seatIds]);

        res.status(200).json({ allocatedSeats });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

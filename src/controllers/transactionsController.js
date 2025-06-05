const db = require('../db');

class TransactionsController {
    async getAll(req, res) {
        try {
            const [rows] = await db.query('SELECT * FROM transactions');
            res.json(rows);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getById(req, res) {
        try {
            const [rows] = await db.query('SELECT * FROM transactions WHERE id = ?', [req.params.id]);
            if (rows.length === 0) return res.status(404).json({ error: 'Transaction not found' });
            res.json(rows[0]);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async create(req, res) {
        try {
            const { user_id, customer_id, date, total_amount } = req.body;
            const [result] = await db.query(
                `INSERT INTO transactions (user_id, customer_id, date, total_amount) VALUES (?, ?, ?, ?)`,
                [user_id, customer_id, date, total_amount]
            );
            res.status(201).json({ id: result.insertId });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async update(req, res) {
        try {
            const { user_id, customer_id, date, total_amount } = req.body;
            const [result] = await db.query(
                `UPDATE transactions SET user_id=?, customer_id=?, date=?, total_amount=? WHERE id=?`,
                [user_id, customer_id, date, total_amount, req.params.id]
            );
            if (result.affectedRows === 0) return res.status(404).json({ error: 'Transaction not found' });
            res.json({ message: 'Transaction updated' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async delete(req, res) {
        try {
            const [result] = await db.query('DELETE FROM transactions WHERE id=?', [req.params.id]);
            if (result.affectedRows === 0) return res.status(404).json({ error: 'Transaction not found' });
            res.json({ message: 'Transaction deleted' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = new TransactionsController();
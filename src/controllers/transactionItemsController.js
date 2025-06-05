const db = require('../db');

class TransactionItemsController {
    async getAll(req, res) {
        try {
            const [rows] = await db.query('SELECT * FROM transaction_items');
            res.json(rows);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getById(req, res) {
        try {
            const [rows] = await db.query('SELECT * FROM transaction_items WHERE id = ?', [req.params.id]);
            if (rows.length === 0) return res.status(404).json({ error: 'Transaction item not found' });
            res.json(rows[0]);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async create(req, res) {
        try {
            const { transaction_id, inventory_id, quantity, price_at_sale } = req.body;
            const [result] = await db.query(
                `INSERT INTO transaction_items (transaction_id, inventory_id, quantity, price_at_sale) VALUES (?, ?, ?, ?)`,
                [transaction_id, inventory_id, quantity, price_at_sale]
            );
            res.status(201).json({ id: result.insertId });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async update(req, res) {
        try {
            const { transaction_id, inventory_id, quantity, price_at_sale } = req.body;
            const [result] = await db.query(
                `UPDATE transaction_items SET transaction_id=?, inventory_id=?, quantity=?, price_at_sale=? WHERE id=?`,
                [transaction_id, inventory_id, quantity, price_at_sale, req.params.id]
            );
            if (result.affectedRows === 0) return res.status(404).json({ error: 'Transaction item not found' });
            res.json({ message: 'Transaction item updated' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async delete(req, res) {
        try {
            const [result] = await db.query('DELETE FROM transaction_items WHERE id=?', [req.params.id]);
            if (result.affectedRows === 0) return res.status(404).json({ error: 'Transaction item not found' });
            res.json({ message: 'Transaction item deleted' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = new TransactionItemsController();
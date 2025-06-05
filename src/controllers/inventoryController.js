const db = require('../db');

class InventoryController {
    async getAll(req, res) {
        try {
            const [rows] = await db.query('SELECT * FROM inventory');
            res.json(rows);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getById(req, res) {
        try {
            const [rows] = await db.query('SELECT * FROM inventory WHERE id = ?', [req.params.id]);
            if (rows.length === 0) return res.status(404).json({ error: 'Inventory item not found' });
            res.json(rows[0]);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async create(req, res) {
        try {
            const { name, description, price, stock_quantity } = req.body;
            const [result] = await db.query(
                `INSERT INTO inventory (name, description, price, stock_quantity) VALUES (?, ?, ?, ?)`,
                [name, description, price, stock_quantity]
            );
            res.status(201).json({ id: result.insertId });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async update(req, res) {
        try {
            const { name, description, price, stock_quantity } = req.body;
            const [result] = await db.query(
                `UPDATE inventory SET name=?, description=?, price=?, stock_quantity=? WHERE id=?`,
                [name, description, price, stock_quantity, req.params.id]
            );
            if (result.affectedRows === 0) return res.status(404).json({ error: 'Inventory item not found' });
            res.json({ message: 'Inventory item updated' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async delete(req, res) {
        try {
            const [result] = await db.query('DELETE FROM inventory WHERE id=?', [req.params.id]);
            if (result.affectedRows === 0) return res.status(404).json({ error: 'Inventory item not found' });
            res.json({ message: 'Inventory item deleted' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = new InventoryController();
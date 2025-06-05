const db = require('../db');

class UserEquipmentController {
    async getAll(req, res) {
        try {
            const [rows] = await db.query('SELECT * FROM user_equipment');
            res.json(rows);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getById(req, res) {
        try {
            const [rows] = await db.query('SELECT * FROM user_equipment WHERE id = ?', [req.params.id]);
            if (rows.length === 0) return res.status(404).json({ error: 'User equipment record not found' });
            res.json(rows[0]);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async create(req, res) {
        try {
            const { user_id, equipment_id, assigned_at } = req.body;
            const [result] = await db.query(
                `INSERT INTO user_equipment (user_id, equipment_id, assigned_at) VALUES (?, ?, ?)`,
                [user_id, equipment_id, assigned_at]
            );
            res.status(201).json({ id: result.insertId });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async update(req, res) {
        try {
            const { user_id, equipment_id, assigned_at } = req.body;
            const [result] = await db.query(
                `UPDATE user_equipment SET user_id=?, equipment_id=?, assigned_at=? WHERE id=?`,
                [user_id, equipment_id, assigned_at, req.params.id]
            );
            if (result.affectedRows === 0) return res.status(404).json({ error: 'User equipment record not found' });
            res.json({ message: 'User equipment record updated' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async delete(req, res) {
        try {
            const [result] = await db.query('DELETE FROM user_equipment WHERE id=?', [req.params.id]);
            if (result.affectedRows === 0) return res.status(404).json({ error: 'User equipment record not found' });
            res.json({ message: 'User equipment record deleted' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = new UserEquipmentController();
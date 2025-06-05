const db = require('../db');

class EquipmentsController {
    async getAll(req, res) {
        try {
            const [rows] = await db.query('SELECT * FROM equipments');
            res.json(rows);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getById(req, res) {
        try {
            const [rows] = await db.query('SELECT * FROM equipments WHERE id = ?', [req.params.id]);
            if (rows.length === 0) return res.status(404).json({ error: 'Equipment not found' });
            res.json(rows[0]);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async create(req, res) {
        try {
            const { name, description, plate_number } = req.body;
            const [result] = await db.query(
                `INSERT INTO equipments (name, description, plate_number) VALUES (?, ?, ?)`,
                [name, description, plate_number]
            );
            res.status(201).json({ id: result.insertId });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async update(req, res) {
        try {
            const { name, description, plate_number } = req.body;
            const [result] = await db.query(
                `UPDATE equipments SET name=?, description=?, plate_number=? WHERE id=?`,
                [name, description, plate_number, req.params.id]
            );
            if (result.affectedRows === 0) return res.status(404).json({ error: 'Equipment not found' });
            res.json({ message: 'Equipment updated' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async delete(req, res) {
        try {
            const [result] = await db.query('DELETE FROM equipments WHERE id=?', [req.params.id]);
            if (result.affectedRows === 0) return res.status(404).json({ error: 'Equipment not found' });
            res.json({ message: 'Equipment deleted' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = new EquipmentsController();
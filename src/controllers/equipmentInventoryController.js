const db = require('../db');

class EquipmentInventoryController {
    async getAll(req, res) {
        try {
            const [rows] = await db.query('SELECT * FROM equipment_inventory');
            res.json(rows);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getById(req, res) {
        try {
            const [rows] = await db.query('SELECT * FROM equipment_inventory WHERE id = ?', [req.params.id]);
            if (rows.length === 0) return res.status(404).json({ error: 'Equipment inventory record not found' });
            res.json(rows[0]);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async create(req, res) {
        try {
            const { equipment_id, inventory_id, quantity, assigned_at } = req.body;
            const result = await assignInventoryToEquipment({ equipment_id, inventory_id, quantity, assigned_at });
            res.status(201).json(result);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async update(req, res) {
        try {
            const { equipment_id, inventory_id, quantity, assigned_at } = req.body;
            const [result] = await db.query(
                `UPDATE equipment_inventory SET equipment_id=?, inventory_id=?, quantity=?, assigned_at=? WHERE id=?`,
                [equipment_id, inventory_id, quantity, assigned_at, req.params.id]
            );
            if (result.affectedRows === 0) return res.status(404).json({ error: 'Equipment inventory record not found' });
            res.json({ message: 'Equipment inventory record updated' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async delete(req, res) {
        try {
            const [result] = await db.query('DELETE FROM equipment_inventory WHERE id=?', [req.params.id]);
            if (result.affectedRows === 0) return res.status(404).json({ error: 'Equipment inventory record not found' });
            res.json({ message: 'Equipment inventory record deleted' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = new EquipmentInventoryController();
const db = require('../db');

class UsersController {
    async getAll(req, res) {
        try {
            const [rows] = await db.query('SELECT * FROM users');
            res.json(rows);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getById(req, res) {
        try {
            const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [req.params.id]);
            if (rows.length === 0) return res.status(404).json({ error: 'User not found' });
            res.json(rows[0]);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async create(req, res) {
        try {
            const { username, password, first_name, last_name, date_of_birth, start_date, role } = req.body;
            const [result] = await db.query(
                `INSERT INTO users (username, password, first_name, last_name, date_of_birth, start_date, role) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [username, password, first_name, last_name, date_of_birth, start_date, role]
            );
            res.status(201).json({ id: result.insertId });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async update(req, res) {
        try {
            const { username, password, first_name, last_name, date_of_birth, start_date, role } = req.body;
            const [result] = await db.query(
                `UPDATE users SET username=?, password=?, first_name=?, last_name=?, date_of_birth=?, start_date=?, role=? WHERE id=?`,
                [username, password, first_name, last_name, date_of_birth, start_date, role, req.params.id]
            );
            if (result.affectedRows === 0) return res.status(404).json({ error: 'User not found' });
            res.json({ message: 'User updated' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async delete(req, res) {
        try {
            const [result] = await db.query('DELETE FROM users WHERE id=?', [req.params.id]);
            if (result.affectedRows === 0) return res.status(404).json({ error: 'User not found' });
            res.json({ message: 'User deleted' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = new UsersController();
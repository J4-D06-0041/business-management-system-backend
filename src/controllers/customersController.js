const db = require('../db');

class CustomersController {
    async getAll(req, res) {
        try {
            const [rows] = await db.query('SELECT * FROM customers');
            res.json(rows);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getById(req, res) {
        try {
            const [rows] = await db.query('SELECT * FROM customers WHERE id = ?', [req.params.id]);
            if (rows.length === 0) return res.status(404).json({ error: 'Customer not found' });
            res.json(rows[0]);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async create(req, res) {
        try {
            const {
                firstname, lastname, businessname, contactNumber, age,
                street, purok, brgy, city, province
            } = req.body;
            const [result] = await db.query(
                `INSERT INTO customers (firstname, lastname, businessname, contactNumber, age, street, purok, brgy, city, province)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [firstname, lastname, businessname, contactNumber, age, street, purok, brgy, city, province]
            );
            res.status(201).json({ id: result.insertId });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async update(req, res) {
        try {
            const {
                firstname, lastname, businessname, contactNumber, age,
                street, purok, brgy, city, province
            } = req.body;
            const [result] = await db.query(
                `UPDATE customers SET firstname=?, lastname=?, businessname=?, contactNumber=?, age=?, street=?, purok=?, brgy=?, city=?, province=? WHERE id=?`,
                [firstname, lastname, businessname, contactNumber, age, street, purok, brgy, city, province, req.params.id]
            );
            if (result.affectedRows === 0) return res.status(404).json({ error: 'Customer not found' });
            res.json({ message: 'Customer updated' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async delete(req, res) {
        try {
            const [result] = await db.query('DELETE FROM customers WHERE id=?', [req.params.id]);
            if (result.affectedRows === 0) return res.status(404).json({ error: 'Customer not found' });
            res.json({ message: 'Customer deleted' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = new CustomersController();
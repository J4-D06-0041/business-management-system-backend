const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserService {

    async getAllUsers() {
        try {
            const [rows] = await db.query('SELECT * FROM users');
            return rows;
        } catch (err) {
            throw new Error(err.message);
        }
    }
    async getUserById(id) {
        try {
            const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
            if (rows.length === 0) throw new Error('User not found');
            return rows[0];
        } catch (err) {
            throw new Error(err.message);
        }
    }
    async createUser(userData) {
        try {
            const { username, password, first_name, last_name, date_of_birth, start_date, role } = userData;
            const hashedPassword = await bcrypt.hash(password, 10);
            const [result] = await db.query(
                `INSERT INTO users (username, password, first_name, last_name, date_of_birth, start_date, role) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [username, hashedPassword, first_name, last_name, date_of_birth, start_date, role]
            );
            return { id: result.insertId };
        } catch (err) {
            throw new Error(err.message);
        }
    }
    async updateUser(id, userData) {
        try {
            const { username, password, first_name, last_name, date_of_birth, start_date, role } = userData;
            const hashedPassword = await bcrypt.hash(password, 10);
            const [result] = await db.query(
                `UPDATE users SET username=?, password=?, first_name=?, last_name=?, date_of_birth=?, start_date=?, role=? WHERE id=?`,
                [username, hashedPassword, first_name, last_name, date_of_birth, start_date, role, id]
            );
            if (result.affectedRows === 0) throw new Error('User not found');
            return { message: 'User updated' };
        } catch (err) {
            throw new Error(err.message);
        }
    }
    async deleteUser(id) {
        try {
            const [result] = await db.query('DELETE FROM users WHERE id=?', [id]);
            if (result.affectedRows === 0) throw new Error('User not found');
            return { message: 'User deleted' };
        } catch (err) {
            throw new Error(err.message);
        }
    }
    async authenticateUser(username, password) {
        try {
            const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
            if (rows.length === 0) throw new Error('User not found');
            const user = rows[0];
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) throw new Error('Invalid credentials');
            const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return { token };
        } catch (err) {
            throw new Error(err.message);
        }
    }
    async getUserByUsername(username) {
        try {
            const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
            if (rows.length === 0) throw new Error('User not found');
            return rows[0];
        } catch (err) {
            throw new Error(err.message);
        }
    }
    async changePassword(userId, newPassword) {
        try {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            const [result] = await db.query(
                `UPDATE users SET password=? WHERE id=?`,
                [hashedPassword, userId]
            );
            if (result.affectedRows === 0) throw new Error('User not found');
            return { message: 'Password updated' };
        } catch (err) {
            throw new Error(err.message);
        }
    }
    async getUserByEmail(email) {
        try {
            const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
            if (rows.length === 0) throw new Error('User not found');
            return rows[0];
        } catch (err) {
            throw new Error(err.message);
        }
    }
    async resetPassword(email, newPassword) {
        try {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            const [result] = await db.query(
                `UPDATE users SET password=? WHERE email=?`,
                [hashedPassword, email]
            );
            if (result.affectedRows === 0) throw new Error('User not found');
            return { message: 'Password reset successfully' };
        } catch (err) {
            throw new Error(err.message);
        }
    }
    async getUserProfile(userId) {
        try {
            const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [userId]);
            if (rows.length === 0) throw new Error('User not found');
            return rows[0];
        } catch (err) {
            throw new Error(err.message);
        }
    }
    async updateUserProfile(userId, profileData) {
        try {
            const { first_name, last_name, date_of_birth, start_date } = profileData;
            const [result] = await db.query(
                `UPDATE users SET first_name=?, last_name=?, date_of_birth=?, start_date=? WHERE id=?`,
                [first_name, last_name, date_of_birth, start_date, userId]
            );
            if (result.affectedRows === 0) throw new Error('User not found');
            return { message: 'Profile updated' };
        } catch (err) {
            throw new Error(err.message);
        }
    }
    async getUserRole(userId) {
        try {
            const [rows] = await db.query('SELECT role FROM users WHERE id = ?', [userId]);
            if (rows.length === 0) throw new Error('User not found');
            return rows[0].role;
        } catch (err) {
            throw new Error(err.message);
        }
    }
}
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserService {

    async authenticate(username, password) {
        try {
            const user = await this.getUserByUsername(username);
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) throw new Error('Invalid credentials');
            const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return { token };
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async forgotPassword(email) {
        try {
            const user = await this.getUserByEmail(email);
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            // Here you would send the token to the user's email
            return { message: 'Password reset token sent', token };
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async resetPasswordWithToken(token, newPassword) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await this.getUserById(decoded.id);
            if (!user) throw new Error('User not found');
            await this.changePassword(user.id, newPassword);
            return { message: 'Password reset successfully' };
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async getUserById(id) {
        const conn = await db.getConnection();
        try {
            const [rows] = await conn.query('SELECT * FROM users WHERE id = ?', [id]);
            if (rows.length === 0) throw new Error('User not found');
            return rows[0];
        } finally {
            conn.release();
        }
    }

    async getUserByUsername(username) {
        const conn = await db.getConnection();
        try {
            const [rows] = await conn.query('SELECT * FROM users WHERE username = ?', [username]);
            if (rows.length === 0) throw new Error('User not found');
            return rows[0];
        } finally {
            conn.release();
        }
    }

    async getAllUsers() {
        const conn = await db.getConnection();
        try {
            const [rows] = await conn.query('SELECT * FROM users');
            return rows;
        } finally {
            conn.release();
        }
    }
}

module.exports = new UserService();
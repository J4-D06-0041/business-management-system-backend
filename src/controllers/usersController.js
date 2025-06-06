const db = require('../db');
const userService = require('../services/userService');
const jwt = require('jsonwebtoken');

class UsersController {
    async getAll(req, res) {
        try {
            const users = await userService.getAllUsers();
            res.json(users);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    async getById(req, res) {
        try {
            const user = await userService.getUserById(req.params.id);
            res.json(user);
        } catch (err) {
            if (err.message === 'User not found') {
                return res.status(404).json({ error: err.message });
            }
            res.status(500).json({ error: err.message });
        }
    }
    async create(req, res) {
        try {
            const user = await userService.createUser(req.body);
            res.status(201).json(user);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    async update(req, res) {
        try {
            const user = await userService.updateUser(req.params.id, req.body);
            res.json(user);
        } catch (err) {
            if (err.message === 'User not found') {
                return res.status(404).json({ error: err.message });
            }
            res.status(500).json({ error: err.message });
        }
    }
    async delete(req, res) {
        try {
            await userService.deleteUser(req.params.id);
            res.status(204).send();
        } catch (err) {
            if (err.message === 'User not found') {
                return res.status(404).json({ error: err.message });
            }
            res.status(500).json({ error: err.message });
        }
    }
    async authenticate(req, res) {
        // Check for existing token
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                // Token is valid and not expired
                return res.status(200).json({ message: 'Already logged in', user: decoded });
            } catch (err) {
                // Token invalid or expired, proceed to normal login
            }
        }

        // Normal login flow
        try {
            const { username, password } = req.body;
            const user = await userService.authenticate(username, password);
            if (!user) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }
            const payload = {
                id: user.id,
                username: user.username,
                role: user.role
            };
            const newToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token: newToken, user: payload });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    async forgotPassword(req, res) {
        try {
            const { email } = req.body;
            await userService.forgotPassword(email);
            res.status(204).send();
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    async resetPassword(req, res) {
        try {
            const { token, newPassword } = req.body;
            await userService.resetPasswordWithToken(token, newPassword);
            res.status(204).send();
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = new UsersController();
const db = require('../db');

async function assignInventoryToEquipment({ equipment_id, inventory_id, quantity, assigned_at }) {
    const conn = await db.getConnection();
    try {
        await conn.beginTransaction();

        // 1. Insert into equipment_inventory
        const [result] = await conn.query(
            `INSERT INTO equipment_inventory (equipment_id, inventory_id, quantity, assigned_at) VALUES (?, ?, ?, ?)`,
            [equipment_id, inventory_id, quantity, assigned_at]
        );

        // 2. Deduct quantity from inventory
        const [updateResult] = await conn.query(
            `UPDATE inventory SET stock_quantity = stock_quantity - ? WHERE id = ? AND stock_quantity >= ?`,
            [quantity, inventory_id, quantity]
        );

        if (updateResult.affectedRows === 0) {
            throw new Error('Not enough stock in inventory');
        }

        await conn.commit();
        return { id: result.insertId };
    } catch (err) {
        await conn.rollback();
        throw err;
    } finally {
        conn.release();
    }
}

module.exports = { assignInventoryToEquipment };
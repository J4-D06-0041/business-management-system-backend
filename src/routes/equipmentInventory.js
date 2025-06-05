const equipmentInventoryController = require('../controllers/equipmentInventoryController');
/**
 * @swagger
 * tags:
 *   name: EquipmentInventory
 *   description: Equipment inventory management
 */

/**
 * @swagger
 * /api/equipment-inventory:
 *   get:
 *     summary: Get all equipment inventory items
 *     tags: [EquipmentInventory]
 *     responses:
 *       200:
 *         description: List of equipment inventory items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EquipmentInventory'
 *   post:
 *     summary: Create a new equipment inventory item
 *     tags: [EquipmentInventory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EquipmentInventory'
 *     responses:
 *       201:
 *         description: Equipment inventory item created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EquipmentInventory'
 */

/**
 * @swagger
 * /api/equipment-inventory/{id}:
 *   get:
 *     summary: Get equipment inventory item by ID
 *     tags: [EquipmentInventory]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Equipment inventory item ID
 *     responses:
 *       200:
 *         description: Equipment inventory item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EquipmentInventory'
 *       404:
 *         description: Item not found
 *   put:
 *     summary: Update equipment inventory item by ID
 *     tags: [EquipmentInventory]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Equipment inventory item ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EquipmentInventory'
 *     responses:
 *       200:
 *         description: Equipment inventory item updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EquipmentInventory'
 *       404:
 *         description: Item not found
 *   delete:
 *     summary: Delete equipment inventory item by ID
 *     tags: [EquipmentInventory]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Equipment inventory item ID
 *     responses:
 *       204:
 *         description: Item deleted
 *       404:
 *         description: Item not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     EquipmentInventory:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier
 *         name:
 *           type: string
 *           description: Equipment name
 *         quantity:
 *           type: integer
 *           description: Quantity in stock
 *         location:
 *           type: string
 *           description: Storage location
 *         status:
 *           type: string
 *           description: Equipment status
 *       required:
 *         - name
 *         - quantity
 */
function setEquipmentInventoryRoutes(app) {
    app.get('/api/equipment-inventory', equipmentInventoryController.getAll.bind(equipmentInventoryController));
    app.get('/api/equipment-inventory/:id', equipmentInventoryController.getById.bind(equipmentInventoryController));
    app.post('/api/equipment-inventory', equipmentInventoryController.create.bind(equipmentInventoryController));
    app.put('/api/equipment-inventory/:id', equipmentInventoryController.update.bind(equipmentInventoryController));
    app.delete('/api/equipment-inventory/:id', equipmentInventoryController.delete.bind(equipmentInventoryController));
}
module.exports = { setEquipmentInventoryRoutes };
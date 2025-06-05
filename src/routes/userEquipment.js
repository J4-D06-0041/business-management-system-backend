const userEquipmentController = require('../controllers/userEquipmentController');
/**
 * @swagger
 * tags:
 *   name: UserEquipments
 *   description: API for managing user equipments
 */

/**
 * @swagger
 * /api/user-equipments:
 *   get:
 *     summary: Get all user equipments
 *     tags: [UserEquipments]
 *     responses:
 *       200:
 *         description: List of user equipments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserEquipment'
 *   post:
 *     summary: Create a new user equipment
 *     tags: [UserEquipments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserEquipment'
 *     responses:
 *       201:
 *         description: User equipment created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserEquipment'
 *
 * /api/user-equipments/{id}:
 *   get:
 *     summary: Get a user equipment by ID
 *     tags: [UserEquipments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User equipment ID
 *     responses:
 *       200:
 *         description: User equipment found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserEquipment'
 *       404:
 *         description: User equipment not found
 *   put:
 *     summary: Update a user equipment by ID
 *     tags: [UserEquipments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User equipment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserEquipment'
 *     responses:
 *       200:
 *         description: User equipment updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserEquipment'
 *       404:
 *         description: User equipment not found
 *   delete:
 *     summary: Delete a user equipment by ID
 *     tags: [UserEquipments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User equipment ID
 *     responses:
 *       204:
 *         description: User equipment deleted
 *       404:
 *         description: User equipment not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserEquipment:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user equipment
 *         name:
 *           type: string
 *           description: Name of the equipment
 *         userId:
 *           type: string
 *           description: ID of the user who owns the equipment
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 *       required:
 *         - name
 *         - userId
 */
function setUserEquipmentRoutes(app) {
    app.get('/api/user-equipments', userEquipmentController.getAll.bind(userEquipmentController));
    app.get('/api/user-equipments/:id', userEquipmentController.getById.bind(userEquipmentController));
    app.post('/api/user-equipments', userEquipmentController.create.bind(userEquipmentController));
    app.put('/api/user-equipments/:id', userEquipmentController.update.bind(userEquipmentController));
    app.delete('/api/user-equipments/:id', userEquipmentController.delete.bind(userEquipmentController));
}
module.exports = { setUserEquipmentRoutes };
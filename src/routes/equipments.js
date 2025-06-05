const equipmentsController = require('../controllers/equipmentsController');
/**
 * @swagger
 * tags:
 *   name: Equipments
 *   description: Equipment management endpoints
 */

/**
 * @swagger
 * /api/equipments:
 *   get:
 *     summary: Get all equipments
 *     tags: [Equipments]
 *     responses:
 *       200:
 *         description: List of equipments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Equipment'
 *   post:
 *     summary: Create a new equipment
 *     tags: [Equipments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Equipment'
 *     responses:
 *       201:
 *         description: Equipment created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Equipment'
 *
 * /api/equipments/{id}:
 *   get:
 *     summary: Get equipment by ID
 *     tags: [Equipments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Equipment ID
 *     responses:
 *       200:
 *         description: Equipment found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Equipment'
 *       404:
 *         description: Equipment not found
 *   put:
 *     summary: Update equipment by ID
 *     tags: [Equipments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Equipment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Equipment'
 *     responses:
 *       200:
 *         description: Equipment updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Equipment'
 *       404:
 *         description: Equipment not found
 *   delete:
 *     summary: Delete equipment by ID
 *     tags: [Equipments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Equipment ID
 *     responses:
 *       204:
 *         description: Equipment deleted
 *       404:
 *         description: Equipment not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Equipment:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The equipment ID
 *         name:
 *           type: string
 *           description: The equipment name
 *         type:
 *           type: string
 *           description: The equipment type
 *         status:
 *           type: string
 *           description: The equipment status
 *       required:
 *         - name
 *         - type
 *         - status
 */
function setEquipmentRoutes(app) {
    app.get('/api/equipments', equipmentsController.getAll.bind(equipmentsController));
    app.get('/api/equipments/:id', equipmentsController.getById.bind(equipmentsController));
    app.post('/api/equipments', equipmentsController.create.bind(equipmentsController));
    app.put('/api/equipments/:id', equipmentsController.update.bind(equipmentsController));
    app.delete('/api/equipments/:id', equipmentsController.delete.bind(equipmentsController));
}

module.exports = { setEquipmentRoutes };
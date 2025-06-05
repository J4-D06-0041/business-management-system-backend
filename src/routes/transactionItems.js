const transactionItemsController = require('../controllers/transactionItemsController');
/**
 * @swagger
 * tags:
 *   name: TransactionItems
 *   description: API endpoints for managing transaction items
 */

/**
 * @swagger
 * /api/transaction-items:
 *   get:
 *     summary: Get all transaction items
 *     tags: [TransactionItems]
 *     responses:
 *       200:
 *         description: List of transaction items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TransactionItem'
 *   post:
 *     summary: Create a new transaction item
 *     tags: [TransactionItems]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TransactionItem'
 *     responses:
 *       201:
 *         description: Transaction item created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TransactionItem'
 *
 * /api/transaction-items/{id}:
 *   get:
 *     summary: Get a transaction item by ID
 *     tags: [TransactionItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Transaction item ID
 *     responses:
 *       200:
 *         description: Transaction item found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TransactionItem'
 *       404:
 *         description: Transaction item not found
 *   put:
 *     summary: Update a transaction item by ID
 *     tags: [TransactionItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Transaction item ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TransactionItem'
 *     responses:
 *       200:
 *         description: Transaction item updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TransactionItem'
 *       404:
 *         description: Transaction item not found
 *   delete:
 *     summary: Delete a transaction item by ID
 *     tags: [TransactionItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Transaction item ID
 *     responses:
 *       204:
 *         description: Transaction item deleted
 *       404:
 *         description: Transaction item not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     TransactionItem:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier
 *         name:
 *           type: string
 *         quantity:
 *           type: number
 *         price:
 *           type: number
 *       required:
 *         - name
 *         - quantity
 *         - price
 */
function setTransactionItemRoutes(app) {
    app.get('/api/transaction-items', transactionItemsController.getAll.bind(transactionItemsController));
    app.get('/api/transaction-items/:id', transactionItemsController.getById.bind(transactionItemsController));
    app.post('/api/transaction-items', transactionItemsController.create.bind(transactionItemsController));
    app.put('/api/transaction-items/:id', transactionItemsController.update.bind(transactionItemsController));
    app.delete('/api/transaction-items/:id', transactionItemsController.delete.bind(transactionItemsController));
}
module.exports = { setTransactionItemRoutes };
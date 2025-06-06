const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const { setCustomerRoutes } = require('./routes/customers');
const { setEquipmentRoutes } = require('./routes/equipments');
const { setInventoryRoutes } = require('./routes/inventory');
const { setEquipmentInventoryRoutes } = require('./routes/equipmentInventory');
const { setTransactionItemRoutes } = require('./routes/transactionItems');
const { setTransactionRoutes } = require('./routes/transactions');
const { setUserEquipmentRoutes } = require('./routes/userEquipment');
const { setUserRoutes } = require('./routes/users');


const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api-docs/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Swagger UI endpoint
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(null, { swaggerUrl: '/api-docs/swagger.json' })
);

setCustomerRoutes(app);
setEquipmentRoutes(app);
setInventoryRoutes(app);
setEquipmentInventoryRoutes(app);
setTransactionItemRoutes(app);
setTransactionRoutes(app);
setUserEquipmentRoutes(app);
setUserRoutes(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

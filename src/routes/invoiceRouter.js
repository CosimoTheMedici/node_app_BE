const express = require('express')
const router = express.Router();

const invoiceController = require('../controllers/invoiceController');
const { rolesValidator } = require('../middleware/roles_validator');
const { validateToken } = require('../middleware/token_validator');


//router.get('/',validateToken,rolesValidator(2001,4000),invoiceController.getAgentsByOwnerID);

router.get('/create/preinvoice',validateToken,rolesValidator(2001),invoiceController.createPreInvoices);
//router.patch('/assign',validateToken,rolesValidator(2001,4000),agentController.assignAgents);


module.exports = router;
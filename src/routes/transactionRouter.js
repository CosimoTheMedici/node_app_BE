const express = require('express');
const unitController = require('../controllers/unitsController');
const transactionController = require('../controllers/transactionController');
const { rolesValidator } = require('../middleware/roles_validator');
const { validateToken } = require('../middleware/token_validator');
const router = express.Router();


router.get('/',validateToken,rolesValidator(2001),unitController.getUnitsByPropertyID);
router.get('/dataCompilation/:property/:unit',validateToken,rolesValidator(2001),transactionController.getPaymentCompilationData);

router.post('/create',validateToken,rolesValidator(2001),transactionController.createTransaction);

module.exports = router;
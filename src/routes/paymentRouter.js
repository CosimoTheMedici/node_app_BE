const express = require('express')
const router = express.Router();

const paymentController = require('../controllers/paymentController');
const { rolesValidator } = require('../middleware/roles_validator');
const { validateToken } = require('../middleware/token_validator');


router.get('/',validateToken,rolesValidator(2001,3000),paymentController.getPayments);

router.post('/create',validateToken,rolesValidator(2001,3000),paymentController.createPayments);
router.post('/verifyPayment',validateToken,rolesValidator(2001,3000),paymentController.verifyPayment);


module.exports = router;
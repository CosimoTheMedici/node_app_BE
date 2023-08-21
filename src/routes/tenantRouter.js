const express = require('express')
const router = express.Router();

const tenantController = require('../controllers/tenantController');
const { rolesValidator } = require('../middleware/roles_validator');
const { validateToken } = require('../middleware/token_validator');


router.get('/',validateToken,rolesValidator(2001),tenantController.getTenantsByPropertyID);

router.post('/create',validateToken,rolesValidator(2001),tenantController.createTenants);


module.exports = router;
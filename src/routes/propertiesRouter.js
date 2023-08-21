const express = require('express')
const router = express.Router();

const propertiesController = require('../controllers/propertiesController');
const { rolesValidator } = require('../middleware/roles_validator');
const { validateToken } = require('../middleware/token_validator');


router.get('/',validateToken,rolesValidator(2001),propertiesController.getPropertyData);
router.get('/getMyProperties',validateToken,rolesValidator(2001),propertiesController.getAgentPropertiesData);
router.get('/my_properties',validateToken,rolesValidator(2001),propertiesController.get_My_Properties);
router.get('/getPropertiesByMyEmail',validateToken,rolesValidator(2001),propertiesController.getMyProperties);

router.post('/create',validateToken,rolesValidator(2001),propertiesController.createProperties);



module.exports = router;
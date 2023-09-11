const express = require('express');
const unitController = require('../controllers/unitsController');
const { rolesValidator } = require('../middleware/roles_validator');
const { validateToken } = require('../middleware/token_validator');
const router = express.Router();


router.get('/myassignedunits/:id',validateToken,rolesValidator(2001), unitController.getMyAssignedUnits);
router.get('/byproperyid/:id',validateToken,rolesValidator(2001), unitController.getUnitsByPropertyID);
router.get('/vacantUnitsproperyID/:id',validateToken,rolesValidator(2001), unitController.getVacantUnitsByPropertyID);
router.get('/occupiedUnitsproperyID/:id',validateToken,rolesValidator(2001), unitController.getOccupiedUnitsByPropertyID);
router.get('/getMyUnits',validateToken,rolesValidator(2001), unitController.getAgentPropertiesData);
router.post('/create',validateToken,rolesValidator(2001), unitController.createUnits);

module.exports = router;
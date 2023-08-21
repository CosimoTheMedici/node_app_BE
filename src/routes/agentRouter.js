const express = require('express')
const router = express.Router();

const agentController = require('../controllers/agentController');
const { rolesValidator } = require('../middleware/roles_validator');
const { validateToken } = require('../middleware/token_validator');


router.get('/',validateToken,rolesValidator(2001,4000),agentController.getAgentsByOwnerID);

router.post('/create',validateToken,rolesValidator(2001,4000),agentController.createAgents);
router.patch('/assign',validateToken,rolesValidator(2001,4000),agentController.assignAgents);


module.exports = router;
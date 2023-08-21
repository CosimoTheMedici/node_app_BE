const express = require('express')
const router = express.Router();


const authController = require('../controllers/authController');
const logoutController = require('../controllers/logoutController');
const refreshToken = require('../controllers/refreshTokenController');
const { rolesValidator } = require('../middleware/roles_validator');
const { validateToken } = require('../middleware/token_validator');


router.get('/',validateToken,authController.createNewUser);

router.get('/test',authController.testing);

//get emp by id
router.get('/:id', validateToken,authController.createNewUser)

//create new employee
router.post('/',authController.createNewUser);

router.put('/:id',validateToken,authController.createNewUser);

//router.post('/users',validateToken,authController.createNewUser);

router.post('/users/loging',authController.createNewUser);
//strats here
router.post('/users/login',authController.loginUser);
router.get('/users/logout',logoutController.handleLogoutRequest);
router.get('/refresh/token',refreshToken.handleRefreshToken);
router.get('/users/data',validateToken,rolesValidator(2001), authController.getUsersDatas);



module.exports = router;
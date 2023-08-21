const express = require('express')
const router = express.Router();
const path = require('path')
const authController = require('../controllers/authController')



router.route('/emp')
//.get(authController.getAllEmp)
.post(authController.createEmployeeUser)

module.exports = router;
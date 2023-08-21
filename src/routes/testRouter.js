const express = require('express')
const router = express.Router();
const path = require('path')
const employeesControler = require('../controllers/empTestController')



router.route('/')
.get(employeesControler.getAllEmp)
.post(employeesControler.createNewEmp)

router.route('/:id')
.get(employeesControler.getEmpById)



module.exports = router;
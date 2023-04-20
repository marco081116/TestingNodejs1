// -- part 9 
const express = require('express')
const router = express.Router()
const employeeController = require('../../controllers/employeesController')

// -- part 11
const verifyJWT = require('../../middleware/verifyJWT')

router.route('/')
    // --  Đã cắt code ra ném qua bên employeeController.js cho dễ nhìn
    .get(verifyJWT, employeeController.getAllEmployees) // chỗ này nghĩa là sau khi verify mới get employees
    .post(employeeController.createNewEmployee)
    .put(employeeController.updateEmployee)
    .delete(employeeController.deleteEmployee)

router.route('/:id')
    .get(employeeController.getEmployee)

module.exports = router
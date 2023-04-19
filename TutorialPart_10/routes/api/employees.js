// -- part 9 
const express = require('express')
const router = express.Router()
const employeeController = require('../../controllers/employeesController')

router.route('/')
    // --  Đã cắt code ra ném qua bên employeeController.js cho dễ nhìn
    .get(employeeController.getAllEmployees)
    .post(employeeController.createNewEmployee)
    .put(employeeController.updateEmployee)
    .delete(employeeController.deleteEmployee)

router.route('/:id')
    .get(employeeController.getEmployee)

module.exports = router


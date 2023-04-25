// -- part 9 
const express = require('express')
const router = express.Router()
const employeeController = require('../../controllers/employeesController')

// -- part 11
// const verifyJWT = require('../../middleware/verifyJWT')

// -- part 12
const ROLES_LIST = require('../../config/roles_list')
const verifyRoles = require('../../middleware/verifyRoles')

router.route('/')
    // --  Đã cắt code ra ném qua bên employeeController.js cho dễ nhìn
    // .get(verifyJWT, employeeController.getAllEmployees) 
        // chỗ này nghĩa là sau khi verify mới get employees
        // cái này dừng dể chọn route cụ thể để bảo vệ => đóng lại, có cách nhanh hơn
    .get(employeeController.getAllEmployees) 
    // -- part 12 => thêm chức năng chỉ admin hay editor được làm điều đó
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeeController.createNewEmployee)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeeController.updateEmployee)
    .delete(verifyRoles(ROLES_LIST.Admin), employeeController.deleteEmployee)

router.route('/:id')
    .get(employeeController.getEmployee)

module.exports = router
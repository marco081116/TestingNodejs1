// -- part 9
// const data = {}

// data.employee = require('../../model/employees.json') 

// -- Thay đổi !!!

const data = {
    employees: require('../model/employees.json'),
    setEmployees: function(data) {
        this.employees = data
    } 
}

const getAllEmployees = (req, res) => {
    res.json(data.employees);
}

const createNewEmployee = (req, res) => {
    // res.json({
    //     "firstname": req.body.firstname,
    //     "lastname": req.body.lastname
    // });

    const newEmployee = {
        id: data.employees[data.employees.length - 1].id + 1 || 1,
        "firstname": req.body.firstname,
        "lastname": req.body.lastname,
    }

    if (!newEmployee.firstname || !newEmployee.lastname) {
        return res.status(400).json({'message': 'First name and last name are required !!!'})
    }
    data.setEmployees([...data.employees, newEmployee]) // 1 dạng của append
    res.status(201).json(data.employees)
}

const updateEmployee = (req, res) => {
    // res.json({
    //     "firstname": req.body.firstname,
    //     "lastname": req.body.lastname
    // })

    const employee = data.employees.find(
        emid => emid.id === parseInt(req.body.id)
    )
    if(!employee) {
        return res.status(400).json({'message': `Employee (ID: ${req.body.id}) not found !!!`})
    }
    
    if (req.body.firstname) {
        employee.firstname = req.body.firstname
    }
    if (req.body.lastname) {
        employee.lastname = req.body.lastname
    }

    const filterArray = data.employees.filter(
        emid => emid.id !== parseInt(req.body.id)
    )
    const unsortedArray = [...filterArray, employee]
    data.setEmployees(unsortedArray.sort((a,b) => 
        a.id > b.id ? 1 : a.id < b.id ? -1 : 0
    ))
    res.json(data.employees)
}

const deleteEmployee = (req, res) => {
    // res.json({ "id": req.body.id })
    const employee = data.employees.find(
        emid => emid.id === parseInt(req.body.id)
    )
    if(!employee) {
        return res.status(400).json({'message': `Employee (ID: ${req.body.id}) not found !!!`})
    }

    const filterArray = data.employees.filter(
        emid => emid.id !== parseInt(req.body.id)
    )
    data.setEmployees([...filterArray])
    res.json(data.employees)
}

const getEmployee = (req, res) => {
    const employee = data.employees.find(
        emid => emid.id === parseInt(req.body.id)
    )
    if (!employee) {
        return res.status(400).jons({'message': `Employee (ID: ${req.body.id}) not found !!!`})
    }
    res.json(employee)
}

module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee,
}
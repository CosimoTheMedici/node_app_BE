const data= {};
data.employees = require('../utils/emp.json')

const getAllEmp = (req,res) => {
    res.json(data.employees)
}

const createNewEmp = () => {
    res.json({
        "firstname":req.body.firstname,
        "lastname":req.body.lastname
    });
}

const getEmpById = (req,res) => {
    res.json({"id": req.params.id})
}

module.exports = {
    getAllEmp,
    createNewEmp,
    getEmpById,
}
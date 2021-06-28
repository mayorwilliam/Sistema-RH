const pool = require('../settings/db')
const Empleado = require('../models/Empleado')

let index = async (request,response) => {
    // const articulos = await pool.query('SELECT * FROM articulos')
    const empleados = await Empleado.find()
    response.render('index', {empleados})
}




module.exports = {
    index,
}
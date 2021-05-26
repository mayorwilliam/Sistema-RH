const pool = require('../settings/db')

let index = async (request,response) => {
    const articulos = await pool.query('SELECT * FROM articulos')
    response.render('index', {articulos})
}




module.exports = {
    index,
}
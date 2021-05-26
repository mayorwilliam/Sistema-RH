const pool = require('../settings/db')




let signup = async (request,response) => {
    const user =  await pool.query('SELECT * FROM users')
    response.render('auth/signup', {user})
}

let signin = (request,response) => {
    response.render('auth/signin')
}

module.exports = {
    signup,
    signin,
}
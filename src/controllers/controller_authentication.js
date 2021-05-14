const pool = require('../settings/db')




let signup = (request,response) => {
    response.render('auth/signup')
}

module.exports = {
    signup,
}
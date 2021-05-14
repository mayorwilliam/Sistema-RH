const pool = require('../settings/db')




let signup = (request,response) => {
    response.render('auth/signup')
}

let sigin = (request,response) => {
    response.render('auth/signin')
}

module.exports = {
    signup,
    sigin,
}
const pool = require('../settings/db')

let index = (request,response) => {
    response.render('index')
}


module.exports = {
    index,
}
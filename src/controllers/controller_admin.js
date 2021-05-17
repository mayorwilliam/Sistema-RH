const pool = require('../settings/db')

let admin = (request,response) => {
    response.render('admin/admin')
}


module.exports = {  
    admin,
}
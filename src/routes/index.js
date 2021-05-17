const express = require('express')
const public = require('../controllers/controller_index')
const app = express.Router()



app.get('/',public.index)

app.get('/error', (request,response) =>{
    response.render('error')
})


module.exports = app
const express = require('express')
const multer = require('multer')

const admin = require('../controllers/controller_admin')
const app = express.Router()
const upload = multer({dest: './archivos'})
const {isLoggedIn} = require('../controllers/auth')

app.get('/dashboard',isLoggedIn, admin.admin)
app.post('/addarticulo',isLoggedIn,upload.single('archivo'),  admin.addarticulo)

//edit articulo
app.get('/editArticulo/:id',isLoggedIn, admin.vereditArticulo)
app.post('/editArticulo/:id',isLoggedIn, admin.editArticulos)


//eliminar articulo
app.get('/deleteArticulo/:id' , isLoggedIn,admin.deleteArticulo)

//eliminar mensaje
app.get('/deleteMensaje/:id' ,isLoggedIn, admin.deleteMensaje)


module.exports = app
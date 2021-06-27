  
const express = require('express')
const multer = require('multer')
const path = require('path')
const app = express.Router()

// const storage = multer.diskStorage({
//     destination: './archivos',
//     filename: (request,file,callback) => {
//         callback(null,file.originalname)
//     }
// })

const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/img/uploads'),
    filename:(request, file, callback, filename) => {
        callback(null,file.originalname)
        //uuid() + path.extname(file.originalname)
    }
})
app.use(multer({storage:storage}).single('image'))


const admin = require('../controllers/controller_admin')
const upload = multer({storage, dest: './archivos'})
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
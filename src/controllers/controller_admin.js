const { response } = require('express')
const pool = require('../settings/db')
const path  = require('path')
const fs = require('fs-extra')

// const multer = require('multer')
// const upload = multer({dest: './archivos'})
// let dobleInput = upload.fields([{name: 'archivo'}, {name: 'archivos'}])

let admin = async (request,response) => {

    const articulos = await pool.query('SELECT * FROM articulos')
    const numArticulos = await pool.query('SELECT COUNT(id) AS total from articulos')
    const numMensajes = await pool.query('SELECT COUNT(id) AS total from mensaje')

    const ultArticulos = await pool.query('SELECT * FROM articulos ORDER BY id DESC LIMIT 6')
    const listMensajes = await pool.query('SELECT * FROM mensaje ORDER BY id DESC LIMIT 12')

    // let Articulos = articulos[0] //esto es para traer solo la info de la consulta
    // console.log(Articulos)
    // let NumArticulos = numArticulos[0]
    // let NumMensajes = numMensajes[0]

    response.render('admin/admin', {articulos, numArticulos,numMensajes, ultArticulos,listMensajes})
}

let addarticulo = async (request,response) => {
    const {title, descript} = request.body
    
    // const pathextension = request.file.path
    // console.log(pathextension)
    // const extension = path.extname(request.file.originalname).toLowerCase()
    // console.log(extension)
    // const nombrePdf = request.file.originalname
    // console.log(nombrePdf)
    // const targetPath =  path.resolve(`./archivos/${nombrePdf}${extension}`)
    // console.log(targetPath)
    
    // if (extension === '.pdf'){
    //     await fs.rename(pathextension, targetPath)
    // }
    
    let users_id = request.user.id
    console.log(users_id)
    // console.log(request.file)
    const newArticulo = {
        title,
        descript,
        users_id
    }
    await pool.query('INSERT INTO articulos set ?' , [newArticulo])
    response.redirect('/support/dashboard')
}

let vereditArticulo = async (request, response) => {
    const {id} = request.params
    let Id = parseInt(id)
    const articulo = await pool.query('SELECT * FROM articulos where id = ?',[Id])
    
    response.render('admin/editArticulo', { articulo})
}

let editArticulos = async (request,response) => {
    const {id} = request.params
    const {title, descript} = request.body
    const newArticulo = {
        title,
        descript
    }
    await pool.query('UPDATE articulos set ? WHERE id = ?', [newArticulo, id])
    response.redirect('/support/dashboard')
}

let deleteArticulo = async (request,response) => {
    const {id} = request.params
    let Id = parseInt(id)
    await pool.query('DELETE FROM articulos WHERE id = ?' , [Id])
    response.redirect('/support/dashboard')
}

let deleteMensaje = async (request,response) => {
    const {id} = request.params
    let Id = parseInt(id)
    await pool.query('DELETE FROM mensaje WHERE id = ?' , [Id])
    response.redirect('/support/dashboard')
}


module.exports = {  
    admin,
    addarticulo,
    vereditArticulo,
    editArticulos,
    deleteArticulo,
    deleteMensaje
}
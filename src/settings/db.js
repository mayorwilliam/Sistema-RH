const mysql = require('mysql')
const {database} =   require('./keys')
const {promisify} = require('util')


const pool = mysql.createPool(database)

pool.getConnection((err,conn) => {
    if(err){
        if(err.code == 'PROTOCOL_CONNECTION_LOST'){
            console.error('La conexion de la base de datos fue cerrada')
        }
        if(err.code == 'ECONNREFUSED'){
            console.error('La conexion de la db fue rechazada')
        }
    }
    if(conn) conn.release
        console.log('db conectada')
    return
})

pool.query = promisify(pool.query)

module.exports = pool
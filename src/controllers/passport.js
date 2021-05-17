const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const helpers = require('./helpers')

const pool = require('../settings/db')


passport.use('local.signup' , new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (request,username,password,done) => {
    //por alguna razón tiene que estar primero Documento con D mayuscula en el request.body y luego 
    // en la variable let con minuscula para que funcione y coincida con el campo de la db
    //actualización de comentario, el request body son los "name" de los input y Documento es el name
    // y documento en minuscula es como se debe de pasar en el insert de la db
    const {nombre,apellido,Documento} = request.body
    let documento = parseInt(Documento)
    let newUser = {
        username,
        password,
        nombre,
        apellido,
        documento
    }
    console.log(password)
    newUser.password = helpers.encryptPass(password)
    console.log(password)
    const  result = await pool.query('INSERT INTO users SET ?' , newUser)
    newUser.id = result.insertId
    return done(null, newUser)
}))

passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (request, username,password,done) => {
    const respuesta = await pool.query('SELECT * FROM users WHERE username =?', [username])
    if(respuesta.length > 0){
        const user = respuesta[0]
        const validPass = helpers.matchPass(password, user.password)
        if(validPass){
            done(null,user)
        }else{
            done(null,false)
        }
    }else{
        return done(null,false)
    }
}))


// inicio de sessión del usuario
passport.serializeUser((user,done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id,done) => {
    const respuesta = await pool.query('SELECT * FROM users WHERE id = ?', [id])
    done(null,respuesta[0])
})
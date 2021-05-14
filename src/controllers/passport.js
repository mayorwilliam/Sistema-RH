const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const helpers = require('./helpers')

const pool = require('../settings/db')


passport.use('local.signup' , new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (request,username,password,done) => {
    const {nombre,apellido,documento} = request.body
    let doc = parseInt(documento)
    let newUser = {
        username,
        password,
        nombre,
        apellido,
        doc
    }
    console.log(password)
    newUser.password = helpers.encryptPass(password)
    console.log(password)
    const  result = await pool.query('INSERT INTO users SET?' , newUser)
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
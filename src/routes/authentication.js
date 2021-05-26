const express = require('express')
const passport = require('passport')
const {isNotLoggedIn} = require('../controllers/auth')
const { signup, signin } = require('../controllers/controller_authentication')


const app = express.Router()

app.get('/signup',isNotLoggedIn, signup)
app.post('/signup', isNotLoggedIn,passport.authenticate('local.signup',{
    successRedirect: '/support/dashboard',
    failureRedirect: '/req/signup',
    failureFlash: true
}))

app.get('/signin' , isNotLoggedIn,signin )
app.post('/signin' , isNotLoggedIn,(request,response,next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/support/dashboard',
        failureRedirect: '/error',
        failureFlash: true
    })(request,response,next)

})

app.get('/logout' ,async (request,response) => {
    request.logOut()
    response.redirect('/')
})

module.exports = app
const express = require('express')
const passport = require('passport')

const { signup, sigin } = require('../controllers/controller_authentication')


const app = express.Router()

app.get('/signup', signup)
app.post('/signup', passport.authenticate('local.signup',{
    successRedirect: '/support/dashboard',
    failureRedirect: '/req/signup',
    failureFlash: true
}))

app.get('/signin' , sigin )
app.post('signin' , (request,response,next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/support/dashboard',
        failureRedirect: '/error',
        failureFlash: true
    })(request,response,next)

})

app.get('/logout' , async (request,response) => {
    request.logOut()
    response.redirect('/')
})

module.exports = app
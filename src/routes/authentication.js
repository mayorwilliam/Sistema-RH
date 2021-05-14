const express = require('express')
const { signup } = require('../controllers/controller_authentication')

const app = express.Router()

app.get('/signup', signup)

module.exports = app
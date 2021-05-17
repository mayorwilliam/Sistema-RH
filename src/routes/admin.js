const express = require('express')
const admin = require('../controllers/controller_admin')
const app = express.Router()

app.get('/dashboard', admin.admin)


module.exports = app
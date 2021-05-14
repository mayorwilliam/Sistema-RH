const express = require('express')
const public = require('../controllers/controller_index')
const app = express.Router()



app.get('/',public.index)

module.exports = app
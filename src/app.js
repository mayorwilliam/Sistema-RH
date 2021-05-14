const express = require('express')
const morgan = require('morgan')
const hbs = require('express-handlebars')
const session = require('express-session')
const passport = require('passport')

const  {database} = require('./settings/keys')
const MysqlStore = require('express-mysql-session')(session)
const path = require('path')
const app = express()
require('./controllers/passport')
app.set('port', process.env.PORT ||4000)
app.set('views',path.join(__dirname, 'views'))
app.engine('.hbs', hbs({
    defaultLayout:'main',
    layoutsDir: path.join(app.get('views'),'layout'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}))
app.set('view engine' , '.hbs')



//middleware
app.use(morgan('dev'))


//rutas app
app.use(require('./routes/index'))
app.use('/support',require('./routes/admin'))
app.use('/req',require('./routes/authentication'))

app.use(express.static(path.join(__dirname,'public')))
app.listen(app.get('port'), () => {
    console.log('server on port http//localhost/',app.get('port'))
})
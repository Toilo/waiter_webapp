const express = require('express')
const exphbs = require('express3-handlebars')
const bodyParser = require('body-parser')
const flash = require('express-flash')
const session = require('express-session')
//Declaring Mongo Database Connection String
const mongoUrl = process.env.MONGO_DB_URL || 'mongodb://localhost/waitersDatabase'

const WaiterRoutes = require('./mywaiter/waiter')
const Models = require('./model/models')
const models = Models(mongoUrl)

const waiterRoutes = WaiterRoutes(models) //Instantiate the routes

const app = express() //Instantiate expressjs server
app.engine('handlebars', exphbs({defaultLaout: 'main'}))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

//prase application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

//parse application/json
app.use(bodyParser.json())

//Use the session middleware
app.use(session({secret: 'keyboard cat', cookie:{maxAge: 60000 * 20}}))
app.use(flash())

//Waiter's routes
app.get('/', waiterRoutes.index)
app.get('/waiters/:username', waiterRoutes.showWaiterScreen)
app.post('/waiters/:username', waiterRoutes.addWaiter)
app.get('/days', waiterRoutes.daysWaiter)

app.set('port', (process.env.PORT || 5000))
app.listen(app.get('port'), function(){
  console.log("waiter_webapp started on port:", app.get('port'))
})

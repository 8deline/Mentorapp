
const express = require("express")
const app = express();
const mongoose = require('mongoose')
require('dotenv').config()
const mentorscontroller = require('./controllers/mentorscontroller')
const userscontroller=require('./controllers/userscontroller')

//connection string of mongoose
const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`
mongoose.set('useFindAndModify', false)


app.set('view engine','ejs')
app.use( express.static( "public" ) )
app.use(express.urlencoded({
    extended: true
  }))


//index route
app.get('/mentors', mentorscontroller.allMentors )

//show route
app.get('/mentors/:slug', mentorscontroller.showMentors)


//user register form
//app.get('/user/register', userscontroller.showRegistrationForm)

//user register
//app.post('/user/register', userscontroller.register)

//user login form
//app.get('/user/login', userscontroller.showLoginForm)

//user login
//app.post('/user/login', userscontroller.login)


//setup connection to mongo
mongoose.connect( mongoURI, { useNewUrlParser: true, useUnifiedTopology: true } )
.then(result=>{console.log('successfully connected')
app.listen(5000)
})
    
.catch(err=> console.log(err))


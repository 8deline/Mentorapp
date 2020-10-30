
const express = require("express")
const app = express();
const mongoose = require('mongoose')
require('dotenv').config()
const session= require('express-session')
const mentorscontroller = require('./controllers/mentorscontroller')
const userscontroller=require('./controllers/userscontroller')
const newsfeedcontroller=require('./controllers/newsfeedcontroller')
const adhocusercontroller = require('./controllers/adhocuser')
const _ = require('lodash')
const methodOverride = require('method-override')

//PORT
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 5000;

//connection string of mongoose
const mongoURI = process.env.MONGODB_URI || `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`
mongoose.set('useFindAndModify', false)

app.use(session({
  secret: process.env.SESSION_SECRET,
  name: "app_session",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 3600000 } // 3600000ms = 3600s = 60mins, cookie expires in an hour
}))

app.use(setUserVarMiddleware);

app.set('view engine','ejs')
app.use( express.static( "public" ) )
app.use(express.urlencoded({
    extended: true
  }))

  app.use(methodOverride('_method'))


//landing page
app.get('/mentorapp', newGuestMiddleware, (req, res)=>{
  res.render('users/landing')
})

//Mentors

//index route
app.get('/mentorapp/mentors', authenticateMiddleware, mentorscontroller.allMentors )

//show route
app.get('/mentorapp/mentors/:slug', authenticateMiddleware, mentorscontroller.showMentors)



//user register form
app.get('/mentorapp/user/register', newGuestMiddleware, userscontroller.showRegistrationForm)

//user register
app.post('/mentorapp/user/register', newGuestMiddleware, userscontroller.register)

//user login form NOT IN USE anymore
// app.get('/mentorapp/user/login',newGuestMiddleware, userscontroller.showLoginForm)

//user login
app.post('/mentorapp/user/login',newGuestMiddleware, userscontroller.login)

//user logouy
app.post('/mentorapp/user/logout', authenticateMiddleware, userscontroller.logout )

//current user session
//user profile page
app.get('/mentorapp/user/:slug', currentuserMiddleware, userscontroller.profilepage )

//edit user profile form
app.get('/mentorapp/user/:slug/edit', currentuserMiddleware, userscontroller.editProfileForm)

//edit user profile
app.patch('/mentorapp/user/:slug/edit', currentuserMiddleware, userscontroller.edit )

//delete user profile
app.delete('/mentorapp/user/:slug/delete', currentuserMiddleware, userscontroller.deleteAccount)

//follow a mentor 
app.patch('/mentorapp/mentors/:mentorslug/connect', authenticateMiddleware, userscontroller.addMentor)

//retrieve following list
app.get('/mentorapp/user/:slug/following', currentuserMiddleware, userscontroller.followingList)

//unfollow a mentor
app.patch('/mentorapp/mentors/:mentorslug/unfollow', authenticateMiddleware, userscontroller.unfollow)

// Posting on news feed
//post form
app.get('/mentorapp/user/:slug/newpost', currentuserMiddleware, newsfeedcontroller.newsfeedform)

// creating a new post
app.post('/mentorapp/user/:slug/newpost', currentuserMiddleware, newsfeedcontroller.createPost)

//delete a new  post
app.delete('/mentorapp/user/:slug/:postid/delete', authenticateMiddleware, newsfeedcontroller.deletePost)

//miscellaneous
app.get('/updateuserschema', adhocusercontroller.addimage)

//setup connection to mongo
mongoose.connect( mongoURI, { useNewUrlParser: true, useUnifiedTopology: true } )
.then(result=>{console.log('successfully connected')
app.listen(PORT)
})

    
.catch(err=> console.log(err))

// open the connection to mongo
mongoose.connection.on('open' , ()=>{});

function newGuestMiddleware(req, res, next) {
  if(req.session && req.session.user){
    res.redirect('/mentorapp/mentors')
    return
  }
  next();
}

function authenticateMiddleware(req,res, next){
  if(!req.session || !req.session.user){
    res.redirect('/mentorapp')
    return
  }
  next()
} 

function currentuserMiddleware(req, res, next){
   //there must be a session and the session of the user must be the current user
        //if not redirect to the mentors page
  if (!req.session || req.session.user.slug !== req.params.slug){
    res.redirect('/mentorapp/mentors')
}
next()
}


function setUserVarMiddleware(req, res, next){
  res.locals.user = null
  if (req.session && req.session.user){
    res.locals.user = req.session.user
  }
  next()

}

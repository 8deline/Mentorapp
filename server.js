
const express = require("express")
const app = express();
const mentorscontroller = require('./controllers/mentorscontroller')


app.set('view engine','ejs')


//index route
app.get('/mentors', mentorscontroller.allMentors )

//show route
app.get('/mentors/:slug', mentorscontroller.showMentors)


app.listen(5000)
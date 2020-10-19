const mentormodel = require('../models/mentormodel')

const mentorscontroller = {
    allMentors: (req,res)=>{
        res.render('mentors/index', {
            mentordata: mentormodel
        })
    }
}

module.exports= mentorscontroller
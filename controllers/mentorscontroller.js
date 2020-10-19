const mentormodel = require('../models/mentormodel')

const mentorscontroller = {
    allMentors: (req,res)=>{
        res.render('mentors/index', {
            mentordata: mentormodel
        })
    },

    showMentors: (req, res)=>{
        let currentmentorslug = req.params.slug
        let currentmentor = mentormodel.find(mentor=>{
            return mentor.slug === currentmentorslug
        })
        res.render('mentors/show',{
            currentmentordata: currentmentor
        })
        // console.log(currentmentor)
    }
}

module.exports= mentorscontroller
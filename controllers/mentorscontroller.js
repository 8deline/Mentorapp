const mentormodel = require('../models/mentormodel')
const userModel = require('../models/usermodel')


const mentorscontroller = {
    allMentors: (req,res)=>{
        mentormodel.find({}).sort({yearsOfExperience: -1})
        .then(result=>{
            res.render('mentors/index', {
            mentordata: result,
            })
        })
        
    },

    showMentors: (req, res)=>{
        let currentmentorslug = req.params.slug
        mentormodel.findOne({slug: currentmentorslug})
        .then(result=>{
            res.render('mentors/show',{
                currentmentordata: result
            })
        })
        .catch(err=> console.log(err))
        
        // console.log(currentmentor)
    }
}

module.exports= mentorscontroller
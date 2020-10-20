const mentormodel = require('../models/mentormodel')


const mentorscontroller = {
    allMentors: (req,res)=>{
        mentormodel.find()
        .then(result=>{
            res.render('mentors/index', {
            mentordata: result
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
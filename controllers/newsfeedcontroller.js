
const postModel = require("../models/postmodel")
const userModel = require("../models/usermodel")

const newsfeedcontroller = {
    newsfeedform: (req, res) =>{
        let currentuser = req.params.slug
        userModel.findOne({slug: currentuser })
        .then(result=>{
            if (!result) {
                res.redirect('/mentorapp/user/' + currentuser)
                return
            }
            res.render('users/newpostform',{
                currentuserprofile: result
            })
        })
        .catch(err=> {
            res.redirect('/mentorapp/user/' + currentuser)
        })

    },

    createPost: (req, res)=>{
         // find user from DB
         userModel.findOne({
            slug: req.params.slug
        })
            .then(result => {
                if (!result) {
                    res.redirect('/mentorapp/user/' + req.params.slug)
                    return
                }
                
                postModel.create({
                    user_id: result._id.toString(),
                    user_slug: result.slug,
                    comment: req.body.post,
                    
                })
                    .then(CreateResult => {
                        res.redirect('/mentorapp/user/' + req.params.slug)
                    })
                    .catch(err => {
                        console.log(err)
                        res.redirect('/mentorapp/mentors')
                    })
            })
            .catch(err => {
                console.log(err)
                res.redirect('/mentorapp/mentors')
            })
    },


}


module.exports= newsfeedcontroller
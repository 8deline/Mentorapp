const uuid = require('uuid')
const SHA256 = require('crypto-js/sha256')
const _ = require('lodash')
const userModel = require('../models/usermodel')
const mentorModel = require('../models/mentormodel')
const postModel = require('../models/postmodel')
const { isEqualWith, result } = require('lodash')



const userscontroller = {
    showRegistrationForm: (req, res)=>{
        // if found in DB, means email has already been take, redirect to registration page
        res.render('users/register')
    },
    
    register: (req,res)=>{
        //res.send('register post route')},
        let firstname = req.body.firstname 
        let lastname = req.body.lastname
        let img = req.body.img
        let description = req.body.description
        let username = req.body.userid
        let email = req.body.email
        let password = req.body.password
        
        //check that the username does not exist..if exist notify the user that the username has exist 
        userModel.findOne({username: username})
        .then(result=>{
            if (result) {
                res.redirect('/mentorapp/user/register')
                return
            }
            userModel.findOne({email: email})
            .then (newresult=>{
                if (newresult) {
                    res.redirect('/mentorapp')
                    return
                }
                
               
                let salt = uuid.v4() 
                //add salt to uuid
                let combination = salt + password
                //has the combination
                let hash = SHA256(combination).toString()

                 userModel.create({
                    firstname: firstname,
                    lastname: lastname,
                    img: img,
                    userid: username,
                    slug: _.kebabCase(firstname + '_'+ username),
                    description: description,
                    email: email,
                    pwsalt: salt,
                    hashpw: hash,
                    mentors: []
                })
                 .then (newentry=>{
                     res.redirect('/mentorapp')
                 })
                 .catch (err=>{ 
                     console.log(err)
                     res.redirect('/mentorapp/user/register')
                 })

            }).catch( errfindone => {console.log(errfindone)})
            
        })
        .catch (err=> console.log(err))
            
        },
    
//Not IN USE ANYMORE
    // showLoginForm: (req, res)=>{
    //     res.render('users/login')
    // },

   login: (req, res)=>{
        //check if email is in the database if not in database, redirect back to login page again
        let email= req.body.email
        let password = req.body.password
        if(email === "" || email === undefined || password===""|| password === undefined){
            res.redirect('/mentorapp/')
            console.log('first stage')
            return
        }
        userModel.findOne({email: email})
        .then(result=>{
            if (!result) {
                res.redirect('/mentorapp')
                console.log('no such user exist')
                return
        }
        //check if password hash match
        if (SHA256(result.pwsalt+ password).toString() !== result.hashpw){
            res.redirect('/mentorapp')
            console.log('password dontmatch')
            return
        }
        //set session user
        req.session.user = result;
        res.redirect('/mentorapp/mentors')  

        })
        .catch(err=> {
            console.log(err)
            res.redirect('/mentorapp')})
    

    },

    logout: (req,res)=>{
        req.session.destroy();
        res.redirect('/mentorapp')
    },

    profilepage: (req, res) => {
        let currentuser = req.params.slug
        userModel.findOne({slug: currentuser})
            .then(result => {
                if (! result) {
                    res.redirect('/mentorapp/mentors')
                    return
                }

                // find associated ratings here
                postModel.find(
                    {
                        user_slug: result.slug
                    },
                    {},
                    
                    {
                        sort: {
                            created_at: -1
                        }
                    }
                )
                    .then(postResults => {
                        
                        res.render('users/profilepage',{
                            currentuserprofile: result,
                            currentuserpost: postResults
                        })
                        })
                    
                    .catch(err => {
                        console.log(err)
                        res.redirect('/mentorapp/mentors')
                    })
            })

            .catch(err => {
                res.send(err)
            })
    },


    editProfileForm:  (req, res) => {
       
        let currentuser = req.params.slug
        userModel.findOne({slug: currentuser})
        .then(result=>{
            res.render('users/editprofileform',{
                currentuserprofile: result
            })
            })
        
        .catch(err=> {
            console.log(err)
            res.redirect('/mentorapp/user/' + currentuser)})

    },
    edit: (req, res)=>{
        let currentuser = req.params.slug
        let newslug = _.kebabCase(req.body.firstname+ "_"+ req.body.userid)
        userModel.findOneAndUpdate({slug: currentuser},
            {firstname: req.body.firstname,
                lastname: req.body.lastname,
                img: req.body.img,
                userid: req.body.userid,
                slug: _.kebabCase(req.body.firstname + '_'+ req.body.userid),
                email: req.body.email,
                description: req.body.description
            },
            {new: true}
        )
             .then(updatedresult=> {
                  req.session.user = updatedresult
                res.redirect('/mentorapp/user/'+ newslug)
             })
            .catch(err=>{ 
                console.log(err)
                res.redirect('/mentorapp/user/'+ currentuser)})

        // .catch(err=>{
        //     console.log(err)
        //     //redirect back to user profile page
        //     res.redirect('/mentorapp/user/' + currentuser)})  
        
    },

    deleteAccount: (req, res)=>{
        let currentuser = req.params.slug
        userModel.findOneAndDelete(
            {slug: currentuser}
        )
        .then(deletedresult=>{
            if (!deletedresult){
                res.redirect('/mentorapp/mentors')
                return
            }
            req.session.destroy()
            res.render('users/delete')
        })
        .catch(err=> {
            console.log(err)
            res.redirect('/mentorapp/mentors')
        })

    },

    addMentor: (req,res)=>{
        //check that the mentor exists in the mentor database
        //retrieve the mentor's slug and then append into the current users' mentor list
        let currentmentor = req.params.mentorslug
        mentorModel.find({slug: currentmentor})
        .then(result=>{
            if (!result){
                console.log('no such mentor found')
                res.redirect('/mentorapp/mentors')
                return
            }

            userModel.findOneAndUpdate({slug: req.session.user.slug},
                {
                            $push: {
                                mentors: currentmentor
                        }
        }, {new:true})
        .then( newresult=>{
            if (!newresult) {
                res.redirect('/mentorapp/mentors')
                return
            }
            console.log('mentor followed')
            req.session.user = newresult
            res.redirect('/mentorapp/mentors/' + currentmentor)
            
            
        })
        .catch(err=>{res.redirect('/mentorapp/mentors')})
    })

    .catch(err=>{
        console.log('the error is at the mentor side')
        res.redirect('/mentorapp/mentors')
    })
},

followingList: (req, res)=>{
    let currentuser = req.params.slug
    let mentorarray = []
   userModel.findOne({slug: currentuser})
    .then(result=>{
        if (!result) {
            res.redirect('/mentorapp/user/'+ currentuser)
            return
        }

        // result.mentors.forEach(mentor=>{
        //     mentorModel.find({slug: mentor})
        //     .then(mentorresult=>{
        //         console.log(mentorresult)
        //         mentorarray.push(
        //             {
        //                 img: mentorresult[0].img,
        //                 firstname: mentorresult[0].firstname, 
        //                 lastname: mentorresult[0].lastname
        //             }
        //         )
                
                
        //         })
        // })
        const searches = result.mentors.map(mentor => {
            return mentorModel.findOne({
                slug: mentor
            })
        })
        // Promises.all executes all the promises given
        Promise.all(searches)
            .then(responses => {
                res.render('users/followinglist',{
                    mentorlist: responses
                })
                //gives you back an array of all the results of those calls
            })
            .catch(mentorSearchErr => console.log(`Error during mentor search`, mentorSearchErr))
        
    
           
    })    
     

   
  
    
    .catch(err=> {console.log(err)})
   
},

unfollow: (req, res) =>{
    let currentmentor = req.params.mentorslug
    let currentuser = req.session.user
    mentorModel.find({slug: currentmentor})
        .then(result=>{
            if (!result){
                console.log('no such mentor found')
                res.redirect('/mentorapp/mentors')
                return
            }

            userModel.findOneAndUpdate({slug: currentuser.slug},
                {
                            $pull: {
                                mentors: currentmentor
                        }
        }, {new:true})
        .then( newresult=>{
            if (!newresult) {
                res.redirect('/mentorapp/mentors')
                return
            }
            req.session.user = newresult
            res.redirect('/mentorapp/user/' + newresult.slug + '/following')
            
            
        })
        .catch(err=>{res.redirect('/mentorapp/mentors')})
    })

    .catch(err=>{
        res.redirect('/mentorapp/mentors')
    })
}
}

module.exports = userscontroller;
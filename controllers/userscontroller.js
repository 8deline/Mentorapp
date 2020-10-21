const uuid = require('uuid')
const SHA256 = require('crypto-js/sha256')
const _ = require('lodash')
const userModel = require('../models/usermodel')



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
        let username = req.body.userid
        let email = req.body.email
        let password = req.body.password
        
        //check that the username does not exist..if exist notify the user that the username has exist 
        userModel.findOne({username: username})
        .then(result=>{
            if (result) {
                res.redirect('/user/register')
                return
            }
            userModel.findOne({email: email})
            .then (newresult=>{
                if (newresult) {
                    res.redirect('/user/login')
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
                    email: email,
                    pwsalt: salt,
                    hashpw: hash,
                    mentors: []
                })
                 .then (newentry=>{
                     res.redirect('/mentors')
                 })
                 .catch (err=>{
                     console.log(err)
                     res.redirect('/user/register')
                 })

            }).catch( errfindone => {console.log(errfindone)})
            
        })
        .catch (err=> console.log(err))
        //check that the email do not exist in the database
        //if exist, it means that user exist therefore redirect to login page
        // 
            
        },
    

    showLoginForm: (req, res)=>{
        res.render('users/login')
    },

   // login: (req, res)=>{
        //check if username is in the database
        //check if password match the password of the yser name
        //re
    //}
}

module.exports = userscontroller;
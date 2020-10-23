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
                res.redirect('/mentorapp/user/register')
                return
            }
            userModel.findOne({email: email})
            .then (newresult=>{
                if (newresult) {
                    res.redirect('/mentorapp/user/login')
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
                     res.redirect('/mentorapp/mentors')
                 })
                 .catch (err=>{ 
                     console.log(err)
                     res.redirect('/mentorapp/user/register')
                 })

            }).catch( errfindone => {console.log(errfindone)})
            
        })
        .catch (err=> console.log(err))
            
        },
    

    showLoginForm: (req, res)=>{
        res.render('users/login')
    },

   login: (req, res)=>{
        //check if email is in the database if not in database, redirect back to login page again
        let email= req.body.email
        let password = req.body.password
        if(email === "" || email === undefined || password===""|| password === undefined){
            res.redirect('/user/login')
            console.log('first stage')
            return
        }
        userModel.findOne({email: email})
        .then(result=>{
            if (!result) {
                res.redirect('/user/login')
                console.log('no such user exist')
                return
        }
        //check if password hash match
        if (SHA256(result.pwsalt+ password).toString() !== result.hashpw){
            res.redirect('/mentorapp/user/login')
            console.log('password dontmatch')
            return
        }
        //set session user
        req.session.user = result;
        res.redirect('/mentorapp/mentors')  

        })
        .catch(err=> {
            console.log(err)
            res.redirect('/mentorapp/users/login')})
    

    },

    logout: (req,res)=>{
        req.session.destroy();
        res.redirect('/mentorapp')
    },

    profilepage: (req, res) => {
       
        let currentuser = req.params.slug
        userModel.findOne({slug: currentuser})
        .then(result=>{
            res.render('users/profilepage',{
                currentuserprofile: result
            })
            })
        
        .catch(err=> {
            console.log(err)
            res.redirect('/mentorapp/mentors')})

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
        res.send('update route is working')
    }
}

module.exports = userscontroller;
const uuid = require('uuid')
const SHA256 = require('crypto-js/sha256')

const userscontroller = {
    showRegistrationForm: (req, res)=>{
        res.render('users/register')
    },
    register: (req,res)=>{
        let firstname = req.body.firstname
        let lastname = req.body.lastname
        let img = req.body.img
        let username = req.body.username
        let email = req.body.email
        let password = req.body.password
        
        //check that the username does not exist..if exist notify the user that the username has exist 
        userModel.findOne({ username: username})
        .then(result=>{
            if (result) {
                res.render('users/register',{
                    username: result.username  
                  })
                return
            }

            userModel.findOne({email: email})
            .then (newresult=>{
                if (newresult) {
                    res.redirect('/user/login')
                    return
                }
                salt = uuid.v4() 
                //add salt to uuid
                let combination = salt + password
                //has the combination
                let hash = SHA256(combination).toString()

                userModel.create({
                    firstname: firstname,
                    lastname: lastname,
                    img: img,
                    username: username,
                    email: email,
                    pwsalt: salt,
                    hashpw: hash,
                    mentors:[]
                })
                .then (newentry=>{
                    res.redirect('/mentors')
                })
                .catch (err=>{
                    res.redirect('/user/register')
                })

            })
            
        })
        .catch (err=> console.log(err))
        //check that the email do not exist in the database
        //if exist, it means that user exist therefore redirect to login page
        // 
            
        },
    

    showLoginForm: (req, res)=>{
        res.render('users/login')
    },

    login: (req, res)=>{
        //check if username is in the database
        //check if password match the password of the yser name
        //re
    }
}

module.exports = userscontroller;
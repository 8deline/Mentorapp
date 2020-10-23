const userModel = require('../models/usermodel')

const addadditionaluserfield = {
    addimage: (req, res)=>{
        userModel.find()
        .then(result=>{
            userModel.updateMany({
                img: '/users/default-profile-icon-4.jpg'
                
            })
            .then(updatedresult=>{
                console.log(updatedresult)
                console.log('job is done')
            })
            .catch(err=>{
                console.log('something is wrong')
            })
        })
        .catch(err => console.log(err))
    }
}

module.exports = addadditionaluserfield;
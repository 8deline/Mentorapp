const mongoose = require ('mongoose')

const userSchema = new mongoose.Schema({
  firstname: {type: String, required: true},
  lastname: {type: String, required: true},
  img: {type: String, default: '/users/default-profile-icon-4.jpg'},
  userid: {type: String, required: true, unique: true},
  slug: {type: String, reuired: true, unique:true},
  description: {type:String},
  email: {type: String, required: true, unique:true},
  pwsalt: {type: String, required: true, unique:true},
 hashpw: {type: String, required: true, unique: true},
 mentors: [String],
 groups: [String]
}
)

const userModel = mongoose.model('User', userSchema)

module.exports = userModel
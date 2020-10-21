const mongoose = require ('mongoose')

const userSchema = new mongoose.Schema({
  firstname: {type: String, required: true},
  lastname: {type: String, required: true},
  img: String,
  userid: {type: String, required: true, unique: true},
  slug: {type: String, reuired: true, unique:true},
  email: {type: String, required: true, unique:true},
  pwsalt: {type: String, required: true, unique:true},
 hashpw: {type: String, required: true, unique: true},
 mentors: [String]
}
)

const userModel = mongoose.model('User', userSchema)

module.exports = userModel
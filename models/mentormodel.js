const mongoose = require ('mongoose')

const mentorSchema = new mongoose.Schema({
  firstname: {type: String, required: true},
  lastname: {type: String, required: true},
  img: String,
  userid: {type: String, required: true},
  email: {type: String, required: true},
  slug: {type: String, required: true},
  designation: {type: String, required: true},
  company: {type: String, required: true},
  industry: {type: String, required: true},
  interests: [{type: String, required: true}],
  yearsOfExperience : {type: Number, required: true},
  intention: [{type: String, reuired: true}],
  description: {type: String, reuired: true}
}
)

const mentorModel = mongoose.model('Mentor', mentorSchema)

module.exports = mentorModel


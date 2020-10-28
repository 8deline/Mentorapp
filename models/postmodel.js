const mongoose = require ('mongoose')

const postSchema = new mongoose.Schema({
    user_id: {type: String, required: true},
    user_slug: {type: String, required: true},
    comment: {type: String, required: true},
    created_at: {type: Date, required: true, default:Date.now},
    updated_at: {type: Date, required: true, default:Date.now},
}
)

const postModel = mongoose.model('Post', postSchema)

module.exports = postModel


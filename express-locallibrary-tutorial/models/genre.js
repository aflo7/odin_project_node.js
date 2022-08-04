const mongoose = require("mongoose")
const Schema = mongoose.Schema
var GenreSchema = new Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 100 }
})

GenreSchema.virtual("url").get(() => {
  return "/catalog/bookinstance/" + this._id
})

module.exports = mongoose.model('GenreSchema', GenreSchema)
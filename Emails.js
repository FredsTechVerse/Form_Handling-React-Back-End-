const mongoose = require("mongoose");
const { Schema } = mongoose;

const EmailSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  newsLetter: {
    type: Boolean,
    required: true,
  },
}); //This is how the database fields are going to be filled up.

module.exports = mongoose.model("Email", EmailSchema);

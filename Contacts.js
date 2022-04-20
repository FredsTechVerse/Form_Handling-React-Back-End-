const mongoose = require("mongoose");
const { Schema } = mongoose;
const ContactSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  contact: {
    type: Number,
    required: true,
    unique: true,
  },
}); //This is how the database fields are going to be filled up.

module.exports = mongoose.model("Contact", ContactSchema);

const mongoose = require("mongoose");
const { Schema } = mongoose;

const EmailSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
}); //This is how the database fields are going to be filled up.

module.exports = mongoose.model("Email", EmailSchema);

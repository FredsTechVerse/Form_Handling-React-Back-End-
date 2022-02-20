import mongoose from "mongoose";
const { Schema } = mongoose;

const emailSchema = new Schema({
  name: String,
  email: String,
}); //This is how the database fields are going to be filled up.

export default mongoose.model("email", emailSchema);

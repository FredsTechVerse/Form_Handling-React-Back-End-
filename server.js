// APP CONFIGURURAION
// =======================
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Email = require("./Emails");
const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 3005;
// var cors = require("cors");
// const Email = require("./Emails");

// const Email = require("./Emails");

const connection_url = `mongodb+srv://FredzTech:Beijingbike5@cluster0.wnobx.mongodb.net/emails?retryWrites=true&w=majority`;
//CONNECTING EXPRESS WEB SERVICE TO THE MONGODB DATABASE
//======================================================
mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//MAKING SURE THAT OUR CONNECTION WAS SUCCESSFUL.
//===============================================
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("The database has been connected to the express server.");
});
//NOT A MUST WE USE BODYPARSER COZ EXPRESS ALREADY HAS ITS OWN METHOD OF INTEPRETING REQUESTS.
//==============================================================================================
// MIDDLEWARE SETUP
// ====================
app.use(express.json()); //Express own inbuilt middleware for recognizing and interacting with request to the server
app.use(cors());
app.use(express.urlencoded({ extended: true }));
//CREATING A SCHEMA
//===================

// var Schema = mongoose.Schema;

// var EmailSchema = new Schema({
//   name: String,
//   email: String,
// });

//CREATING A MODEL OUT OF THE SCHEMA CREATED
//===========================================

// const EmailModel = mongoose.model("EmailModel", EmailSchema);

//ALL THE GET REQUESTS.
//======================

app.get("/", (req, res) => {
  res.send("Hello World!").status(200);
});

app.get("/page1", (req, res) => {
  res.send("Hello from Page 1");
});
//ALL THE POST REQUESTS.
//=======================

// POST REQUEST 1
//================
// app.post("/email", async (req, res, next) => {
//   const email_data = new EmailModel({
//     name: req.body.name,
//     email: req.body.email,
//   });

//   email_data.save(function (err, post) {
//     if (err) {
//       return next(err);
//     }
//     res.status(200).json(post);
//   });
//   // console.log(data);
//   // res.status(200).send(req.body);
// });
// POST REQUEST 2
//================
app.post("/email", async (req, res) => {
  let data = req.body;
  console.log(data);
  try {
    const email = await Email.create(data);
    await email.save();
    res.send(email);
  } catch (error) {
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`This app is listening on port ${port}`);
});

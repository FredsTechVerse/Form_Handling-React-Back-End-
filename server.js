// APP CONFIGURURAION
// =======================
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 3005;
var cors = require("cors");

// const Email = require("./Emails");

const connection_url = `mongodb+srv://FredzTech:Beijingbike5@cluster0.wnobx.mongodb.net/emailcenter?retryWrites=true&w=majority`;
//CONNECTING EXPRESS WEB SERVICE TO THE MONGODB DATABASE
//======================================================
mongoose.connect(connection_url, {
  // SET OF PARAMETERS THAT MAKE OUR CONNECTION SMOOTH IRREGARDLESS OF THE UPDATES THAT KEEP ON HAPPENING TO MONGOOSE.
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//MAKING SURE THAT OUR CONNECTION WAS SUCCESSFUL.
//===============================================
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("The database is connected successfully");
});
//NOT A MUST WE USE BODYPARSER COZ EXPRESS ALREADY HAS ITS OWN METHOD OF INTEPRETING REQUESTS.
//==============================================================================================

// const bodyParser = require("body-parser");

// MIDDLEWARE SETUP
// ====================
app.use(express.json()); //Express own inbuilt middleware for recognizing and interacting with request to the server
app.use(cors());

//THE BODY PARSER MIDDLEWARE IS NOLONGER REQUIRED.
//================================================
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

//CREATING A SCHEMA
//===================

var Schema = mongoose.Schema;

var EmailSchema = new Schema({
  name: String,
  email: String,
});

//CREATING A MODEL OUT OF THE SCHEMA CREATED
//===========================================

var EmailModel = mongoose.model("EmailModel", EmailSchema);

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
app.post("/email", async (req, res, next) => {
  var email_data = new EmailModel({
    name: req.body.name,
    email: req.body.email,
  });

  email_data.save(function (err, post) {
    if (err) {
      return next(err);
    }
    res.status(200).json(post);
  });
  // console.log(data);
  // res.status(200).send(req.body);
});
// POST REQUEST 2
//================
// app.post("/email", async (req, res) => {
//   //Means pushing data.
//   //Saving the request body into a variable.
//   // const dbCard = await req.body; //Saves the array of objects in a variable.
//   let data = await req.body;

//   //Function that creates a new document in the NoSQl data structure.
//   Email.create(data, (err, data) => {
//     /* *The create model method is used to create a new document.
//      *It simply requires the content and the callback function.
//      */
//     if (err) {
//       res.status(404).send(err);
//     } else {
//       res.status(201).send(data); //The status code means created bytheway.
//     }
//   }); //Function that creates a new document from the schema
// });
//WHERE THE WEBSERVICE IS BEING HOSTED ON.
// ========================================
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// APP CONFIGURURAION
// =======================
//HERE WE JUST IMPORT THE MODULES THAT WE NEED IN OUR APPLICATION,EITHER EXTERNAL OR INTERNAL,INACTIVE AT THIS STAGE.
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const Email = require("./Emails");
const app = express();

const port =
  process.env.PORT ||
  3005; /*Just incase we decide to deploy online you know.It will be listening from that new port.*/

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
// MIDDLEWARE SETUP(GAMETIME FOR THE MODULES WHERE NOW WE USE THE KEYWORD APP.USE SOME MODEL HAHA)
// ====================
app.use(express.json()); //Express own inbuilt middleware for recognizing and interacting with request to the server
app.use(cors());
app.use(express.urlencoded({ extended: true }));

//HANDLING THE GET REQUESTS.
//======================

app.get("/", (req, res) => {
  try {
    res
      .send(
        "You have connected to the express server successfully.Let get to work offline."
      )
      .status(200);
  } catch (error) {
    console.log(error);
    res.send("Your backend is offline.");
  }
});

app.get("/email", async (req, res) => {
  let allEmails = await Email.find({});

  try {
    res.send(allEmails).status(300);
  } catch (error) {
    console.log(
      "The email address is already registered.Kindly input another valid one."
    );
  }
});

//ALL THE POST REQUESTS.
//=======================

// POST REQUEST
//===============
app.post("/email", async (req, res) => {
  let data = req.body;
  try {
    const email = await Email.create(data);
    await email.save();
    res.send(email);
  } catch (error) {
    let err = error;
    res.send(err + " " + " Amd bytheway the email is already registered.");

    res.status(500);
  }
});

// DELETE REQUEST
//================

app.delete("/email", async (req, res) => {
  let data = await req;
  res.send(data + " " + "Mic test kidogokidogo tu.");
});
app.delete("/emailz", async (req, res) => {
  try {
    const email = await Email.deleteOne({
      email: "ErickKImathi@gmail.com",
    });
    res.send("The data is sucessfully deleted").status(200);
    if (!email) res.status(404).send("No item found");
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`This app is listening on port ${port}`);
});

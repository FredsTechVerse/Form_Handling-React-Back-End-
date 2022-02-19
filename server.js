// APP CONFIGURURAION
// =======================
const express = require("express");
const app = express();
const port = process.env.PORT || 3005;
var cors = require("cors");
// MIDDLEWARE SETUP
// ====================
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!").status(200);
});

app.get("/page1", (req, res) => {
  res.send("Hello from Page 1");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

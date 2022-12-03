const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require('./config/db.config')


const PORT = process.env.PORT || 53372
const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// routes
require("./app/routes/survey.routes")(app);
require("./app/routes/question.routes")(app);
require("./app/routes/answer.routes")(app);

app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
  });

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

var server = app.listen(PORT, () => {
  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)
})

mongodb.initClientDbConnection();


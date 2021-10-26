if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;
const db = require("./queries");
var cors = require("cors");

app.use(bodyParser.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.get("/", (request, response) => {
  response.json("app running on with node and express");
});

app.get("/routes", db.getRoutes);
app.get("/nextTrain", db.getNextTrain);
app.get("/stops", db.getStops);

app.listen(port, () => {
  console.log(`App running on ${port}`);
});

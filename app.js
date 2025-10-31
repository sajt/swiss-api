const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const registerRoutes = require("./api/routes/swissApiRoutes");
registerRoutes(app);

app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + " not found" });
});

if (require.main === module) {
  app.listen(port, () => {
    console.log("Swiss API server started on: " + port);
  });
}

module.exports = app;

var express = require('express');
var cors = require('cors');
app = express();
port = process.env.PORT || 3000;
bodyParser = require('body-parser');

/*app.use(function(req,res,next) {
  res.header("Access-Control-Allow-Origin",'*');
  next();
});*/
/*var corsOptions = {
  origin: 'https://antaresniome.csillagnemzetsegek.hu/',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}*/

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var routes = require('./api/routes/swissApiRoutes'); //importing route
routes(app); //register the route
app.use(function(req,res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);

console.log('Swiss API server started on: ' + port);

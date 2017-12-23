var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/*app.use(function(req, res, next) {
  var callerIP = req.connection.remoteAddress;
  (callerIP == "::ffff:127.0.0.1" || callerIP == "::1") ? next() : function ( response) {
    response.writeHead(404, {"Content-Type": "text/html"});
    response.statusMessage = "Not Found";
    console.log("reply404: statusCode: " + response.StatusCode);
    response.end('<span style="font-weight: bold; font-size:200%;">ERROR 404 &ndash; Not Found<\/span>');
  };
})*/
var routes = require('./api/routes/swissApiRoutes'); //importing route
routes(app); //register the route
app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);

console.log('Swiss API server started on: ' + port);

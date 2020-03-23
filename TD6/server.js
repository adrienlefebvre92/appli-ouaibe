
var express = require('express'); //import de la bibliothèque Express
var app = express(); //instanciation d'une application Express

var config = {
    "temp": {
        "unite": 1,
        "state": 1
    },
    "pression": {
        "unite": 1,
        "state": 1
    },
    "nuage": {
        "visib": {
            "unite": 0,
            "state": 1
        },
        "status": 1
    },
    "vent": {
        "unite": 0,
        "state": 1
    }
}

app.get('/set', function(req, res) {
  config.temp.unite =  req.query.tempUnit
  config.temp.state =  req.query.temp

  config.pression.unite =  req.query.pressureUnit
  config.pression.state =  req.query.pressure

  config.nuage.visib.state =  req.query.visib

  config.vent.unite =  req.query.windUnit
  config.vent.state =  req.query.wind

  res.sendfile (__dirname + "/meteo/config.html");
});

app.get('/meteo/*', function(req, res) {
    var params = req.url;
    console.log(params);

    res.sendFile(__dirname + "/meteo/meteo.html")
});

app.get('/config', function(req, res) {
    res.json(config);
});

app.listen(8000);
console.log("App listening on port 8000...");
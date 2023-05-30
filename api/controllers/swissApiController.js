const swisseph = require("swisseph");
const parseDMS = require("parse-dms");
exports.index = function(req,res) {
  res.send("This is working as usual!");
};
exports.get = function(req,res) {
  //TODO add validation
  var options = req.body;
  //res.status(500).send('Something broke!')
  swisseph.swe_set_ephe_path(__dirname + "/../../ephe");
  var utc = swisseph.swe_utc_time_zone(
    parseInt(options.year),
    parseInt(options.month),
    parseInt(options.day),
    parseInt(options.hour),
    parseInt(options.minute),
    parseInt(options.second),
    parseInt(options.timezone)
  );

  var l = lanlot(options.longitude,options.lattitude);
  //var longitude = lanlot(options.longitude);
  //var lattitude = lanlot(options.lattitude);
  var houses = [];
  var planets = {};
  var p,planet;

  try {
    swisseph.swe_utc_to_jd(
      utc.year,
      utc.month,
      utc.day,
      utc.hour,
      utc.minute,
      utc.second,
      swisseph.SE_GREG_CAL,
      function(julianDay) {
        swisseph.swe_houses_ex(
          julianDay.julianDayUT,
          0,
          l.lat,
          l.lon,
          "P",
          function(ret) {
            ret.house.forEach(function(house,index) {
              houses.push(house);
            });
            for(p = swisseph.SE_SUN;p <= swisseph.SE_INTP_PERG;p++) {
              swisseph.swe_calc_ut(
                julianDay.julianDayUT,
                p,
                swisseph.SEFLG_SPEED,
                function(ret) {
                  planet = swisseph.swe_get_planet_name(p);
                  planets[planet.name.toLowerCase()] = ret.longitude;
                }
              );
            }
            res.json({
              houses: houses,
              planets: planets,
            });
          }
        );
      }
    );
  } catch(e) {
    res.status(500).send(e.message);
    console.log(e);
  }
};

//Functions
/*function lanlot(l) {
  var arr = l.toString().split('.');
  return parseInt(arr[0]) + arr[1] / 60;
}*/

function lanlot(longitude,lattitude) {
  var str =
    lattitude.fok +
    "°" +
    lattitude.perc +
    "' 0\" " +
    longitude.fok +
    "°" +
    longitude.perc +
    "' 0\"";
  var ret = parseDMS(str);
  return ret;
}

function getBack(h) {
  var hour = Math.floor(h);
  var minFrac = (h - hour) * 60;
  var min = Math.floor(minFrac);
  var sec = Math.floor((minFrac - min) * 60);
  return hour + min / 100;
}

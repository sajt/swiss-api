'use strict';
const swisseph = require ('swisseph');

exports.get = function(req, res) {
  //TODO add validation
  var options = req.body;
  //res.status(500).send('Something broke!')

  swisseph.swe_set_ephe_path (__dirname + '/ephem');

  var utc = swisseph.swe_utc_time_zone(
    options.year,
    options.month,
    options.day,
    options.hour,
    options.minute,
    options.second,
    options.timezone);

  var longitude = lanlot(options.longitude);
  var lattitude = lanlot(options.lattitude);
  var houses = [];
  var planets = {};

  try{
    swisseph.swe_utc_to_jd(utc.year, utc.month, utc.day, utc.hour, utc.minute, utc.second, swisseph.SE_GREG_CAL, function(julianDay) {
      swisseph.swe_houses_ex(julianDay.julianDayUT, 0, lattitude, longitude,  'P', function(ret) {
        ret.house.forEach(function (house, index) {
          houses.push(house);
        });
        for (let p = swisseph.SE_SUN; p <= swisseph.SE_CHIRON; p++) {
          swisseph.swe_calc_ut(julianDay.julianDayUT, p, swisseph.SEFLG_SPEED, function(ret) {
            let planet = swisseph.swe_get_planet_name(p);
            planets[planet.name.toLowerCase()] = ret.longitude;
          });
        }
      });
    });
  } catch(e) {
    res.status(500).send(e.message);
    console.log(e);
  }
  console.log(houses);
  res.json(
    {
      houses: houses,
      planets: planets
    });
};


//Functions
function lanlot(l) {
  var arr = l.toString().split('.');
  return parseInt(arr[0]) + arr[1] / 60;
}

function getBack(h) {
  var hour = Math.floor (h);
  var minFrac = (h - hour) * 60;
  var min = Math.floor (minFrac);
  var sec = Math.floor ((minFrac - min) * 60);
  return hour + min / 100;
}
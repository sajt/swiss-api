'use strict';

exports.get = function(req, res) {
  console.log(req.body);
  res.json({valami: 'más'});
};

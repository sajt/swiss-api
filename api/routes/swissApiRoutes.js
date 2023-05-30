'use strict';
module.exports = function(app) {
  var swissApi = require('../controllers/swissApiController');

  // todoList Routes
  app.route('/swiss')
    .post(swissApi.get);
  app.route('/').get(swissApi.index);
};

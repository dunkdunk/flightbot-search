const request = require('request');

const apiKey = process.env.SKYSCANNER_KEY;

var browseRoutes = (url, callback) => {
  request(`http://partners.api.skyscanner.net/apiservices/browseroutes/v1.0/US/usd/en-US/${url}?apikey=${apiKey}`, function (err, res, body) {
    if (err) {
      callback('error:', err);
    } else {
      callback(null, body);
    }
  });
};

module.exports = {
  browseRoutes
};

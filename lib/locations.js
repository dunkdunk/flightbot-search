const request = require('request');

const apiKey = process.env.SKYSCANNER_KEY;

var findPlace = (query, callback) => {
  request(`http://partners.api.skyscanner.net/apiservices/autosuggest/v1.0/US/usd/en-US/?query=${query}&apikey=${apiKey}`, function (err, res, body) {
    if (err) {
      callback('error:', err);
    }

    // Parse the response and return the first result's place id. We can then use
    // this to make a search request.
    const bodyParsed = JSON.parse(body);
    callback(null, bodyParsed.Places[0].PlaceId);
  });
};

module.exports = {
  findPlace
};

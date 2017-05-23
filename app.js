// Do boot up stuff
console.log('...booting up');
require('dotenv').config()

const request = require('request');

const apiKey = process.env.SKYSCANNER_KEY;

const url='us/anywhere/anytime/anytime';
request(`http://partners.api.skyscanner.net/apiservices/browseroutes/v1.0/US/usd/en-US/${url}?apikey=${apiKey}`, function (err, res, body) {
  if (err) {
    console.error('error:', err);
  }
  console.log(body);
});

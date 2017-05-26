require('dotenv').config();

const request = require('request');
const yargs = require('yargs');

const dates = require('./lib/dates.js');
const locations = require('./lib/locations.js');

const apiKey = process.env.SKYSCANNER_KEY;

const argv = yargs.argv;
var command = argv._[0];

if (command === 'search') {
  locations.findPlace(argv.home, (err, place) => {
    var formattedDates = dates.formatDates(argv.depart, argv.return);
    const url=`${place}/anywhere/${formattedDates.dep}/${formattedDates.ret}`;
    request(`http://partners.api.skyscanner.net/apiservices/browseroutes/v1.0/US/usd/en-US/${url}?apikey=${apiKey}`, function (err, res, body) {
      if (err) {
        console.error('error:', err);
      }
      console.log(body);
    });
  });
} else {
  console.log('You need to provide a command!');
}

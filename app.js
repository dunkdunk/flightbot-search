require('dotenv').config();

const yargs = require('yargs');

const dates = require('./lib/dates.js');
const flights = require('./lib/flights.js');
const locations = require('./lib/locations.js');

const argv = yargs.argv;
var command = argv._[0];

if (command === 'search') {
  locations.findPlace(argv.home, (err, place) => {
    if (err) {
      console.log('There was an error: ', err);
    } else {
      var formattedDates = dates.formatDates(argv.depart, argv.return);
      const url=`${place}/anywhere/${formattedDates.dep}/${formattedDates.ret}`;
      flights.browseRoutes(url, (err, results) => {
        if (err) {
          console.log('There was an error: ', err);
        } else {
          console.log(JSON.stringify(results, null, 2));
        }
      });
    }
  });
} else {
  console.log('You need to provide a command!');
}

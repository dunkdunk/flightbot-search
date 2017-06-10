require('dotenv').config();

const yargs = require('yargs');
const _ = require('lodash');

const dates = require('./lib/dates');
const flights = require('./lib/flights');
const locations = require('./lib/locations');

const argv = yargs
  .command('search', 'Search for flights', {
    home: {
      describe: 'Where you are flying from',
      demand: true,
      alias: 'h'
    },
    depart: {
      describe: 'When do you want to depart? If left blank, will default to anytime.',
      alias: 'd'
    },
    return: {
      describe: 'When would you like to return? If left blank, will default to anytime.',
      alias: 'r'
    },
    budget: {
      describe: 'What is your budget? (in US dollars)',
      alias: 'b'
    }
  })
  .help()
  .argv;
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
          if (argv.budget) {
            const flights =
              _.filter(results['Quotes'], function(f) {
                return f['MinPrice'] < argv.budget;
              });
            console.log(flights);
          } else {
            console.log(JSON.stringify(results['Quotes'], null, 2));
          }
        }
      });
    }
  });
} else {
  console.log('You need to provide a command!');
}

const moment = require('moment');

// Dates should be passed in the ISO 8601 format. This is the only way Moment will
// reliably convert dates.
// https://momentjs.com/docs/#/parsing/string/
//
// In the case a departure or return date is not passed in, we want to default to
// 'anytime' instead of throwing an error. The API will perform a perfectly valid
// flight search without knowing the dates. This adds flexibility for the user.

var formatDates = (dep, ret) => {
  const dates = {
    dep: dep ? moment(dep).format('YYYY-MM-DD') : 'anytime',
    ret: ret ? moment(ret).format('YYYY-MM-DD') : 'anytime'
  };
  return dates;
};

module.exports = {
  formatDates
};

const mongoose = require('mongoose');

const USERSSchema = mongoose.Schema({
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    country_code: {
      type: String,
    },
    number: {
      type: String,
    }
  }
});

const USERS = mongoose.model('users', USERSSchema);

module.exports = USERS;

// database name finalPractical
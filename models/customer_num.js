const mongoose = require('mongoose');
const config = require('../config/database');


// User Schema
const CusNumSchema = mongoose.Schema({
    name: {
      type: String
    },
    birth : {
      type: String
    },
    username: {
      type: String
    },
    time : {
      type: Number
    },
    no : {
      type: Number
    }
  });

  const cus = mongoose.model('Cus_num', CusNumSchema);

  module.exports = cus;
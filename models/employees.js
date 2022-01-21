const mongoose = require('mongoose');
const config = require('../config/database');

const EmployeeSchema= mongoose.Schema({
  first_name: {
    type: String,
    required: true 
  },
  last_name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true 
  },
  avatar: { 
    type: String, 
    required: true 
  },
});

module.exports = mongoose.model("Employee", EmployeeSchema);
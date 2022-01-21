const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const Business = require('../models/business');
const config = require('../config/database');

module.exports = function(passport){
  let opts = {};
  opts.jwtFromRequest =
    ExtractJwt.fromAuthHeaderWithScheme('jwt');
  opts.secretOrKey = config.secret;
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    User.getUserById(jwt_payload.data._id, (err, user) => {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);

      } 
    });
    Business.getUserById(jwt_payload.data._id, (err,business1) => {

        if (err) {
          return done(err, false);
        }
        if (business1) {
        return done(null, business1);
    }})
  }));
}
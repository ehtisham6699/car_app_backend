require("dotenv").config();
const passport = require("passport");

const passportJwt = require("passport-jwt");
const ExtractJwt = passportJwt.ExtractJwt;
const StrategyJwt = passportJwt.Strategy;
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

passport.use(
  new StrategyJwt(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.KEY,
    },
    function (jwtPayload, done) {
      return User.findById(jwtPayload.id)

        .then((user) => {
          user;
          return done(null, user);
        })
        .catch((Error) => {
          return done(new Error("uncaught error! try again later"), null);
        });
    }
  )
);

function initialize() {
  return passport.initialize();
}

module.exports = { passport };

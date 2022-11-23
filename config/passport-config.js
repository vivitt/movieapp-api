const LocalStrategy = require('passport-local').Strategy
const passport = require('passport')
const bcrypt = require('bcrypt')
const userModel = require('../models/User')

function initialize(passport) {
    const customFields = {
      usernameField: "email",
      passwordField: "password"
    }
  const authenticateUser = async (email, password, done) => {
    const user = await userModel.findOne({email: email});
    if (user == null) {
      return done(null, false, { message: 'No user with that email' })
    }
    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user)
      } else {
        return done(null, false, { message: 'Incorrect password' })
      }
    } catch (e) {
      return done(e)
    }
  }

  passport.use(new LocalStrategy(customFields, authenticateUser))
  
  passport.serializeUser((user, done) => {
    return done(null, user.id)
  })
  
  passport.deserializeUser(async (id, done) => {
    const user = await userModel.findOne({_id: id});
  return done(null, user)
  })
}

module.exports = initialize

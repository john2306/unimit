const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;


const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = require('../models/User'); 

passport.use(new LocalStrategy({usernameField: 'email'}, async (email, password, done) => {
  // Match Email's User
  const user = await User.findOne({email: email});
  if (!user) {
    return done(null, false, { message: 'Usuario no encontrado.' });
  } else {
    // Match Password's User
    const match = await user.matchPassword(password);
    if(match) {
      return done(null, user);
    } else {
      return done(null, false, { message: 'Contraseña Incorrecta.' });
    }
  }

}));

passport.use(new GoogleStrategy({
  clientID: '1092466041302-77lgsq1guf1g8lfoodbo8if70pj8b47t.apps.googleusercontent.com',
  clientSecret: 'z7y2i6c0l7P1tkQGeGOjK3pA',
  callbackURL: "http://localhost:4000/auth/google/callback"
},
function(accessToken, refreshToken, profile, cb){
  User.findOne({googleId: profile.id}, function(err, user){
      if(err){
          return cb(err, false, {message: err});
      } else {
          if(user != '' && user != null){
              return cb(null, user, {message: "User"});
          } else {
              var username = profile.displayName.split(' ');
              var userData = new User({
                  name: profile.displayName,
                  email: username[0],
                  password: username[0],
              });
              userData.save(function (err, newuser){
                  if(err){
                      return cb(null, false, {message: err + "!!! Please try again"});
                  } else {
                      return cb(null, newuser);
                  }
              });
          }
      }
  });
}
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});


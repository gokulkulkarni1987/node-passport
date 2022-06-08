const express = require('express');
const passport = require('passport');
const GithubStrategy = require('passport-github').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const app = express();

passport.use(new GithubStrategy({
  clientID: '381ed770771aef81ff35',
  clientSecret: '5c1c36c959a20f66f22fd9438fae4c324718d715',
  callbackURL: '/auth/github/callback'
}, (accessToken, refreshToken, profile, cb) => {
  return cb(null, profile);
}));

passport.use(new FacebookStrategy({
  clientID: '2089852061340891',
  clientSecret: '189986c6368be7e92b15a96d5176871a',
  callbackURL: "http://localhost:5000/auth/facebook/callback"
},
function(accessToken, refreshToken, profile, cb) {
  return cb(null, profile);
}
));


app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.get('/auth/github', passport.authenticate('github'));

app.get('/auth/github/callback',
  passport.authenticate('github', {failureRedirect: '/login'}),
  (req, res) => {
    res.redirect('/');
  });

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {failureRedirect: '/login'}), (req, res) => {
    res.redirect('/');
  });
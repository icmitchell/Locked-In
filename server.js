var express = require('express');
var morgan = require('morgan'); // JUST FOR LOGS
var session = require('express-session') // for sessions
var bodyParser = require('body-parser') // for req.body
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');
var path = require("path");
var app = express();
var PORT = process.env.PORT || 8080;

app.use(session({ 
  secret: 'secretKey',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 100 * 60 * 60 * 24 * 30}
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('combined'));
app.use(express.static(__dirname + '/public/assets'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


var db = require("./models");

function loggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.status(403).send("Unauthorized")
  }
}

passport.use(new LocalStrategy(function(username, password, done) {
  db.User.findOne(
  {
    where:
    {'name': username}
  }).then(function(user) {
   bcrypt.compare(password, user.password, function(err, res) {
    if (user == null) {
      return done(null, false)
    }
    else if (res) {
      return done(null, user)
    }
    return done(null, false)
  })
 })
}))

passport.serializeUser(function(user, done) { // Standered Serialize for session
  done(null, user.id)
})

passport.deserializeUser(function(id, done) {
  db.User.findOne({ 
    where: {
      'id': id
    }
  }).then(function (user) {
    if (user == null) {
      done(new Error('Wrong user id.'))
    }
    done(null, user) 
  })
})

require("./routes/apiRoutes.js")(app);
require("./routes/htmlRoutes.js")(app);
require("./routes/passportRoutes.js")(app);

db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  })
});

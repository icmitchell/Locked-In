var express = require('express');
var morgan = require('morgan'); // JUST FOR LOGS
var session = require('express-session') // for sessions
var bodyParser = require('body-parser') // for req.body
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var app = express();
var PORT = process.env.PORT || 8080;

app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.use(session({ 
  secret: 'secretKey', 
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 100 * 60 * 60 * 24 * 30}
}));

var db = require("./models");

function loggedIn(req, res, next) {
    if (req.user) { // if request contains the user
        next(); // call next
    } else {
        res.status(403).send("Unauthorized")
    }
}



passport.use(new LocalStrategy(
  function(username, password, done) {
        db.User.findOne({  // Using sequelize model function
            where: { // Take an object with options where self explanatory
              'name': username
          }
        }).then(function (user) { // Sequelize return a promise with user in callback
            if (user == null) { // Checking if user exsists
              return done(null, false) 
          }

            if (password == user.password) { // use your password hash comparing logic here for security
              return done(null, user) 
          }
          return done(null, false) 
      })
    }
))

passport.serializeUser(function(user, done) { // Standered Serialize for session
  done(null, user.id)
})

passport.deserializeUser(function(id, done) {
    db.User.findOne({ // Using sequelize model functoin
      where: {
        'id': id
    }
}).then(function (user) {
  if (user == null) {
    done(new Error('Wrong user id.'))
}

        done(null, user) // Standerd deserailize callback
    })
})


require("./routes/apiRoutes.js")(app);
require("./routes/htmlRoutes.js")(app);
require("./routes/passportRoutes.js")(app);


db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
    });
});

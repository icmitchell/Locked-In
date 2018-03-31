var db = require("../models");

function loggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect("/")
  }
}

module.exports = function(app) {

  app.post("/api/website", loggedIn, function(req, res) {
    db.Pass.create({
      website: req.body.website,
      password: req.body.password,
      UserId: req.user.dataValues.id
    }).then(function(dbPass) {
      res.redirect("/dashboard")
    });
  }); 

  app.put("/api/passwords/:id", loggedIn, function(req, res) {
    db.Pass.update({
      password: req.body.password
    }, {
      where: {id: req.params.id}
    }).then(function(result) {
      res.send("success")
    })
  });

  app.get("/api/users", loggedIn, function(req, res) {
    db.User.findOne({
      where: {
        id: req.user.dataValues.id
      }
    }).then(function(result) {
      res.json(result);
    });
  });

  app.post("/api/user", function(req, res) {
    db.User.create({
      name: req.body.name,
      password: req.body.password
    }).then(function(dbUser) {
      res.redirect("/")
    }).catch(function(err){
      res.send(err)
    });
  });

};

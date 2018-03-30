var db = require("../models");

function loggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect("/")
  }
}

module.exports = function(app) {

  app.post("/api/website", function(req, res) {
    console.log(req.session)
    // db.Pass.create({
    //   website: req.body.website,
    //   password: req.body.password,
    //   UserId: req.body.id
    // }).then(function(dbPass) {
    //   res.json(dbPass);
    // });
  }); 




  app.put("/api/passwords/:id", function(req, res) {
    db.Pass.update({
      password: req.body.password
    }, {
      where: {id: req.params.id}
    }).then(function(result) {
      console.log("Updated!")
      res.json(result);
    })
  });

  app.get("/api/users", function(req, res) {
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
      res.json(dbUser);
    }).catch(function(err){
      res.send(err)
    });
  });

  // app.post()

};

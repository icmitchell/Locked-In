var db = require("../models");

module.exports = function(app) {

  app.post("/api/website", function(req, res) {
    db.Pass.create({
      website: req.body.website,
      password: req.body.password,
      UserId: req.body.UserId
    }).then(function(dbPass) {
      res.json(dbPass);
    });
  }); 

  app.put("/api/passwords", function(req, res) {
    db.Pass.update({
      website: req.body.website,
      password: req.body.password
    },{
      where: {id: req.body.id}
    }).then(function(result) {
      console.log("Updated!")
      res.json(result);
    })
  });

  app.get("/api/users/:id", function(req, res) {
    db.User.findOne({
      where: {
        id: req.params.id
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

};

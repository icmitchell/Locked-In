var path = require("path");

module.exports = function(app) {
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./assets/index.html"));
  });

  app.get("/haha", function(req, res) {
    res.sendFile(path.join(__dirname, "../test/test.html"));
  });


};

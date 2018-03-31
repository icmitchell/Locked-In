var path = require("path");
var db = require("../models");

function loggedIn(req, res, next) {
	if (req.user) {
		next();
	} else {
		res.redirect("/")
	}
}

module.exports = function(app) {
	app.get("/", function(req, res) {
		res.sendFile(path.join(__dirname, "../assets/index.html"));
	});

	app.get("/newUser", function(req, res) {
		res.sendFile(path.join(__dirname, "../public/assets/newAccount.html"));
	});

	app.get("/dashboard", loggedIn, function(req, res) {
		var username = req.user.dataValues.name
		db.Pass.findAll({
			where: {
				userId: req.user.dataValues.id
			}
		}).then(function(result) {
			var websites = []
			for (var i = 0; i < result.length; i++) {
				var siteHolder = {
					id: result[i].dataValues.id,
					website: result[i].dataValues.website,
					password: result[i].dataValues.password
				}
				websites.push(siteHolder)
			}
			var hbsObject = {
				websites: websites,
				username: username
			};
			res.render("sites", hbsObject);
		})
	})


};

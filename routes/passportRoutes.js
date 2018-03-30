var db = require("../models");
var passport = require('passport'); 
var express = require("express");
var app = express();
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

module.exports = function(app) {


	app.post('/login', passport.authenticate('local', {failureRedirect: '/failed'}), function(req, res) {
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

//////////////////////////////////////////////////////////////////////////////////
			//have it render the handlebars based on the data//
//////////////////////////////////////////////////////////////////////////////////

})
	})

	app.get('/logout',(req,res)=>{
		req.logout();
		res.send("YOU ARE NOW LOGGED OUT")
	})
}

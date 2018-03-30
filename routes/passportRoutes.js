var db = require("../models");
var passport = require('passport'); 
var express = require("express");
var app = express();
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

module.exports = function(app) {


	app.post('/login', passport.authenticate('local', {failureRedirect: '/', successRedirect: '/dashboard'}))

	app.get('/logout',(req,res)=>{
		req.logout();
		res.redirect('/');
	})
}

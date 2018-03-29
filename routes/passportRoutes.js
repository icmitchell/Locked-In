var db = require("../models");
var passport = require('passport'); 

module.exports = function(app) {

	app.post('/login', passport.authenticate('local', {failureRedirect: '/failed'}), function(req, res) {

		db.Pass.findAll({
			where: {
				userId: req.user.dataValues.id
			}
		}
		).then(function(result){
			console.log(result)
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

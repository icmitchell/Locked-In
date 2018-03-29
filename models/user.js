var bcrypt = require('bcrypt');
module.exports = function(sequelize, DataTypes) {
	var User = sequelize.define("User", {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1]
			}
		},
		password: {
			type: DataTypes.TEXT,
			allowNull: false,
			validate: {
				len: [8,20]
			}
		}
	});

	User.beforeCreate(function(user, options) {
		return cryptPassword(user.password)
		.then(success => {
			user.password = success;
		})
		.catch(err => {
			if (err) console.log(err);
		});
	});

	function cryptPassword(password) {
		console.log("cryptPassword " + password);
		return new Promise(function(resolve, reject) {
			bcrypt.genSalt(10, function(err, salt) {
				console.log("salting")

				if (err) return reject(err);
				console.log("salted")
				bcrypt.hash(password, salt, function(err, hash) {
					console.log(err)
					if (err) return reject(err);
					console.log("hashed")
					return resolve(hash);
				});
			});
		});
	}

	User.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    User.hasMany(models.Pass, {
    	onDelete: "cascade"
    });
};
return User;
};  


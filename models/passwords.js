module.exports = function(sequelize, DataTypes) {
	var Pass = sequelize.define("Pass", {
		website: {
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
				len: [8-20]
			}
		}
	});
	Pass.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Pass.belongsTo(models.User, {
    	foreignKey: {
    		allowNull: false
    	}
    });
};
return Pass;
};

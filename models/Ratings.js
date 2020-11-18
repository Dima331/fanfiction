const Sequelize = require("sequelize");
const Users = require("./Users");
const Fanfictions = require("./Fanfictions");

const Ratings = sequelize.define('ratings', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    mark: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
},
    {
        sequelize: sequelize,
        name: {
            singular: 'Ratings'
        }
    },
    {
        timestamps: false
    });

Fanfictions.hasMany(Ratings, { onDelete: "cascade" });

Users.hasMany(Ratings, { foreignKey: 'userId', onDelete: "cascade" });
Ratings.belongsTo(Users, { foreignKey: 'userId', onDelete: "cascade" })

module.exports = Ratings
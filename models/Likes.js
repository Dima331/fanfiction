const Sequelize = require("sequelize");
const Users = require("./Users");
const Chapters = require("./Chapters");

const Likes = sequelize.define('likes', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    value: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
},
    {
        sequelize: sequelize,
        name: {
            singular: 'Likes'
        }
    },
    {
        timestamps: false
    });

Chapters.hasMany(Likes, { onDelete: "cascade" });

Users.hasMany(Likes, { foreignKey: 'userId', onDelete: "cascade" });
Likes.belongsTo(Users, { foreignKey: 'userId', onDelete: "cascade" })

module.exports = Likes
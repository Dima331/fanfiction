const Sequelize = require("sequelize");
const Users = require("./Users");
const Fanfictions = require("./Fanfictions");

const Comments = sequelize.define('comments', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    comment: {
        type: Sequelize.STRING,
        allowNull: true
    },
},
    {
        sequelize: sequelize,
        name: {
            singular: 'Comments'
        }
    },
    {
        timestamps: false
    });

Fanfictions.hasMany(Comments, { onDelete: "cascade" });
Users.hasMany(Comments, { foreignKey: 'userId', onDelete: "cascade" });
Comments.belongsTo(Users, { foreignKey: 'userId', onDelete: "cascade" })

module.exports = Comments
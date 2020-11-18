const Sequelize = require("sequelize");

const Tokens = sequelize.define('Tokens', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    token: {
        type: Sequelize.STRING,
        allowNull: false
    },
}, {
    timestamps: false
});

module.exports = Tokens
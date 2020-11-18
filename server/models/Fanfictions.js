const Sequelize = require("sequelize");

const Fanfictions = sequelize.define('fanfictions', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    tags: {
        type: Sequelize.STRING,
        allowNull: true
    },
    overall_rating: {
        type: Sequelize.FLOAT,
        allowNull: true,
        defaultValue: 0
    },
}, {
    timestamps: true
});

module.exports = Fanfictions
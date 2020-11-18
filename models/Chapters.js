const Sequelize = require("sequelize");

const Chapters = sequelize.define('chapters', {
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
    text: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    image: {
        type: Sequelize.STRING,
        allowNull: false
    },
    order: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    overall_likes: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
}, {
    timestamps: false
});

module.exports = Chapters
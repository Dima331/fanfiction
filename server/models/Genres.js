const Sequelize = require("sequelize");
const Fanfictions = require("./Fanfictions");

const Genres = sequelize.define('genres', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
}, {
    timestamps: false
});

Genres.hasMany(Fanfictions);
Fanfictions.belongsTo(Genres, { foreignKey: 'genreId' })

module.exports = Genres
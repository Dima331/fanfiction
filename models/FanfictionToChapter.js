const Sequelize = require("sequelize");
const Chapters = require("./Chapters");
const Fanfictions = require("./Fanfictions");

const FanfictionToChapter = sequelize.define('fanfiction_to_chapters', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
},
    {
        sequelize: sequelize,
        name: {
            singular: 'FanfictionToChapter'
        }
    },
    {
        timestamps: false
    });

Fanfictions.hasMany(FanfictionToChapter, { onDelete: "cascade" });
Chapters.hasMany(FanfictionToChapter, { foreignKey: 'chaptersId', onDelete: "cascade" });
FanfictionToChapter.belongsTo(Chapters, { foreignKey: 'chaptersId', onDelete: "cascade" })

module.exports = FanfictionToChapter
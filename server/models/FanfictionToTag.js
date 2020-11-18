const Sequelize = require("sequelize");
const Tags = require("./Tags");
const Fanfictions = require("./Fanfictions");

const FanfictionToTag = sequelize.define('fanfiction_to_tags', {
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
            singular: 'FanfictionToTag'
        }
    },
    {
        timestamps: false
    });

Fanfictions.hasMany(FanfictionToTag, { onDelete: "cascade" });
Tags.hasMany(FanfictionToTag, { foreignKey: 'tagId' });
FanfictionToTag.belongsTo(Tags, { foreignKey: 'tagId' })

module.exports = FanfictionToTag
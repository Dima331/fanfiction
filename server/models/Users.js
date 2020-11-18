const Sequelize = require("sequelize");
const Tokens = require("./Tokens");
const Fanfictions = require("./Fanfictions");

const Users = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: true
    },
    login: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    city: {
        type: Sequelize.STRING,
        allowNull: false
    },

    status: {
        type: Sequelize.STRING,
        allowNull: true
    },
    role: {
        type: Sequelize.STRING,
        allowNull: true
    },
    isVerified: {
        type: Sequelize.BOOLEAN,
        allowNull: false, 
        defaultValue: true
    }
}, {
    timestamps: true
});

Users.hasMany(Tokens);
Tokens.belongsTo(Users, { foreignKey: 'userId',  onDelete: "cascade"  })

Users.hasMany(Fanfictions);
Fanfictions.belongsTo(Users, { foreignKey: 'userId',  onDelete: "cascade"  })


module.exports = Users
const Sequelize = require("sequelize");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(express.json());

const sequelize = new Sequelize("manager", "root", "root", {
    dialect: "mysql",
    host: "localhost",
    define: {
        timestamps: false
    }
});
global.sequelize = sequelize;


const fanfiction = require('./routes/fanfictions.routes');
const genres = require('./routes/genres.routes');
const tags = require('./routes/tags.routes');

app.use('/api/fanfictions', fanfiction);
app.use('/api/genres', genres);
app.use('/api/tags', tags);

sequelize.sync().then(() => {
    app.listen(3000, function () {
        console.log("Сервер ожидает подключения...");
    });
}).catch(err => console.log(err));

const Sequelize = require("sequelize");
const bodyParser = require("body-parser");
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const path = require('path');
app.use(express.json());

const sequelize = new Sequelize("heroku_834f816ce945ec4", "b7d5fcc0dab453", "fc773d3c", {
    dialect: "mysql",
    host: "eu-cdbr-west-03.cleardb.net",
    dialectOptions: {
        dateStrings: true,
        typeCast: true,
    },
    define: {
        timestamps: true
    },
    timezone: "+03:00",
});
global.sequelize = sequelize;

const fanfiction = require('./routes/fanfictions.routes');
const chapters = require('./routes/chapters.routes');
const genres = require('./routes/genres.routes');
const user = require('./routes/users.routes');
const tags = require('./routes/tags.routes');
const auth = require('./routes/auth.routes');
const Comments = require('./models/Comments');

app.use('/api/fanfictions', fanfiction);
app.use('/api/chapters', chapters);
app.use('/api/genres', genres);
app.use('/api/users', user);
app.use('/api/tags', tags);
app.use('/api/auth', auth);

io.on("connection", (socket) => {
    socket.on('ROOM:JOIN', (roomId) => {
        socket.join(roomId);
    });
  
    socket.on('ROOM:ADD', ( room ) => {
      socket.join(room.fanfictionId);

      Comments.create({
        comment: room.comment,
        fanfictionId: room.fanfictionId,
        userId: room.user.id,
      });
      io.in(room.fanfictionId).emit('ROOM:GET_COMMENT', room);
     })
  });


const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));
app.use(bodyParser.json({ 'type': 'application/json' }));
app.use(bodyParser.urlencoded({ 'extended': true }));
const PORT = process.env.PORT || 3000;

app.get('*', function (request, response){
    response.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'))
})

sequelize.sync().then(() => {
    server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
}).catch(err => console.log(err));
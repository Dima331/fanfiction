const Sequelize = require("sequelize");
// const bodyParser = require("body-parser");
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
app.use(express.json());

const sequelize = new Sequelize("manager", "root", "root", {
    dialect: "mysql",
    host: "localhost",
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

const Comments = require('./models/Comments');

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

const fanfiction = require('./routes/fanfictions.routes');
const chapters = require('./routes/chapters.routes');
const genres = require('./routes/genres.routes');
const user = require('./routes/users.routes');
const tags = require('./routes/tags.routes');
const auth = require('./routes/auth.routes');

app.use('/api/fanfictions', fanfiction);
app.use('/api/chapters', chapters);
app.use('/api/genres', genres);
app.use('/api/users', user);
app.use('/api/tags', tags);
app.use('/api/auth', auth);

sequelize.sync().then(() => {
    server.listen(3000, () => console.log(`Listening on port ${3000}`));
}).catch(err => console.log(err));